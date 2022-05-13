import React, {useState} from 'react';
import { Form, Row, Col, FormGroup, Label, Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress, Alert } from 'reactstrap';
import MemberDropdown from './MemberDropdown';
import * as Api from "../../../../library/Api/api"
import LoadingIcon from '../../../_presentational/LoadingIcon';
import FormattedNumber from '../../../_common/FormattedNumber';
import CopyTextButton from "../../../_common/CopyTextButton"

const PayoutContainer = (props) => {
    const [modal, setModal] = useState(false)
    const [member, setMember] = useState(null)
    const [company, setCompany] = useState('')
    const [pigsVouchers, setPigsVouchers] = useState()
    const [rtsHeavyVouchers, setRtsHeavyVouchers] = useState()
    const [rtsVouchers, setRtsVouchers] = useState()
    const [rtsAviatorVouchers, setRtsAviatorVouchers] = useState()
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [bootAlert, setAlert] = useState(false)

    const toggleAlert = () => setAlert(!bootAlert)
    const toggle = () => setModal(!modal)

    function getTotalRtsVouchers() {
        return parseInt(rtsHeavyVouchers) + parseInt(rtsVouchers) + parseInt(rtsAviatorVouchers);
    }

    function validForm() {
        if (!member || !company) return false;
        let voucherNum = 0
        if (company === 'pigs') {
            voucherNum = pigsVouchers
        } else if (company === 'rts') {
            voucherNum = getTotalRtsVouchers();
        }
        if (!voucherNum || voucherNum === 0) return false;

        return true;
    }

    function handleSubmit() {
        if (!validForm()) return;
        setLoading(true)

        let voucherNum = 0
        if (company === 'pigs') {
            voucherNum = pigsVouchers
        } else if (company === 'rts') {
            voucherNum = getTotalRtsVouchers();
        }

        Api.calculatePayout(member.id, voucherNum, company).then((response) => {
            setLoading(false);
            setResponse(response)
            toggle();
        }).catch(err => {
            console.error(err);
            setLoading(false)
            alert("There was an error calculating this payout")
        })
    }

    function handleConfirm() {
        setLoading(true);

        Api.confirmPayout(response.pin).then(() => {
            setLoading(false);
            setAlert(true);
            toggle();
        }).catch((err) => {
            console.error(err);
            setLoading(false);
            alert("There was an error confirming this payout")
        })
    }

    function formatNumber(num) {
        if (!num) return "0"
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //fancy regex
    }

    return (
        <Form noValidate autoComplete="off">
            <Alert color="success" fade isOpen={bootAlert} toggle={toggleAlert}>
                <strong>Payout Success!</strong> You can now do another payout.
            </Alert>
            <Row form>
                <Col>
                    <FormGroup>
                        <Label>Company</Label>
                        <Input valid={!!company} invalid={!company} type="select" required value={company} onChange={(ev) => setCompany(ev.target.value)} >
                            <option disabled value="">Select</option>
                            <option value="rts">RTS</option>
                            <option value="pigs">PIGS</option>
                        </Input>
                        <FormFeedback valid>
                            Looks good!
                        </FormFeedback>
                        <FormFeedback>
                            Please select a company.
                        </FormFeedback>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Member</Label>
                        <MemberDropdown onSelected={(member) => setMember(member)} />
                    </FormGroup>
                </Col>
            </Row>
            {company === 'pigs' && <FormGroup>
                <Label>Number of Vouchers</Label>
                <Input valid={!!pigsVouchers && pigsVouchers !== 0} invalid={!pigsVouchers || pigsVouchers === 0} type="number" placeholder="Voucher Number" value={pigsVouchers} onChange={(ev) => setPigsVouchers(ev.target.value)} required></Input>
                <FormFeedback valid>
                    Looks good!
                </FormFeedback>
                <FormFeedback>
                    Please specify a voucher amount.
                </FormFeedback>
            </FormGroup>}
            {company === 'rts' && <div>
                <FormGroup>
                    <Label>Number of Heavy Vouchers</Label>
                    <Input valid={!!rtsHeavyVouchers && rtsHeavyVouchers !== 0} invalid={(!rtsHeavyVouchers || rtsHeavyVouchers === 0) && getTotalRtsVouchers() === 0} type="number" placeholder="Voucher Number" value={rtsHeavyVouchers} onChange={(ev) => setRtsHeavyVouchers(ev.target.value)} required />
                    <FormFeedback valid>
                        Looks good!
                    </FormFeedback>
                    <FormFeedback>
                        Please specify a voucher amount.
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Number of RTS Vouchers</Label>
                    <Input valid={!!rtsVouchers && rtsVouchers !== 0} invalid={(!rtsVouchers || rtsVouchers === 0) && getTotalRtsVouchers() === 0} type="number" placeholder="Voucher Number" value={rtsVouchers} onChange={(ev) => setRtsVouchers(ev.target.value)} required />
                    <FormFeedback valid>
                        Looks good!
                    </FormFeedback>
                    <FormFeedback>
                        Please specify a voucher amount.
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Number of Aviator Vouchers</Label>
                    <Input valid={!!rtsAviatorVouchers && rtsAviatorVouchers !== 0} invalid={(!rtsAviatorVouchers || rtsAviatorVouchers === 0) && getTotalRtsVouchers() === 0} type="number" placeholder="Voucher Number" value={rtsAviatorVouchers} onChange={(ev) => setRtsAviatorVouchers(ev.target.value)} required />
                    <FormFeedback valid>
                        Looks good!
                    </FormFeedback>
                    <FormFeedback>
                        Please specify a voucher amount.
                    </FormFeedback>
                </FormGroup>
            </div>}
            <Button color="primary" disabled={!validForm() || modal || loading} onClick={handleSubmit}>{modal || loading ? <LoadingIcon /> : 'Submit'}</Button>
            {member && response && <Modal fade isOpen={modal} toggle={toggle} backdrop={"static"}>
                <ModalHeader toggle={toggle}>Payout Summary for {member.in_game_name} ({member.in_game_id})</ModalHeader>
                <ModalBody>
                    <b>Progress</b>: <Progress multi>
                        <Progress bar striped animated color="info" min={0} max={100} value={response.oldProgress} />
                        <Progress bar striped animated color="success" min={0} max={100} value={response.do_rank ? 100 : response.newProgress - response.oldProgress} />
                    </Progress>
                    <b>Money</b>: $<FormattedNumber num={response.money} /> <CopyTextButton className="mt-2" id="copy-money-button" text={response.money} color="info" />
                    <br />
                    <b>Rank up</b>? {response.do_rank ? <span className="text-success">{response.do_rank}</span> : <span className="text-danger">No</span>}
                    <br />
                    <CopyTextButton id="copy-message-button" color="info" className="mt-2" text={`Your payout will be $${formatNumber(response.money)}.`} label="Copy message" />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={handleConfirm} disabled={loading}>{loading ? <LoadingIcon /> : 'Confirm'}</Button>
                </ModalFooter>
            </Modal>}
        </Form>
    )
}

export default PayoutContainer
