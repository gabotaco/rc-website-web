import React, {useState, useEffect} from 'react';
import { Form, Row, Col, FormGroup, Label, Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress, Dropdown, DropdownToggle } from 'reactstrap';
import * as Api from "../../../../library/Api/api"
import LoadingIcon from '../../../_presentational/LoadingIcon';
import FormattedNumber from '../../../_common/FormattedNumber';

const UserPayoutContainer = (props) => {
    const [modal, setModal] = useState(false)
    const [company, setCompany] = useState('')
    const [pigsVouchers, setPigsVouchers] = useState(undefined)
    const [rtsHeavyVouchers, setRtsHeavyVouchers] = useState(undefined)
    const [rtsVouchers, setRtsVouchers] = useState(undefined)
    const [rtsAviatorVouchers, setRtsAviatorVouchers] = useState(undefined)
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)

    const toggle = () => setModal(!modal)

    function getTotalRtsVouchers() {
        return parseInt(rtsHeavyVouchers) + parseInt(rtsVouchers) + parseInt(rtsAviatorVouchers);
    }
    
    useEffect(() => {
        Api.getTycoonData().then((res) => {
            if (res.data.inventory.rts_voucher_air && rtsAviatorVouchers === undefined) {
                setRtsAviatorVouchers(res.data.inventory.rts_voucher_air.amount)
            }
            if (res.data.inventory.rts_voucher && rtsVouchers === undefined) {
                setRtsVouchers(res.data.inventory.rts_voucher.amount)
            }
            if (res.data.inventory.rts_voucher_heavy && rtsHeavyVouchers === undefined) {
                setRtsHeavyVouchers(res.data.inventory.rts_voucher_heavy.amount)
            }
            if (res.data.inventory.pigs_voucher && pigsVouchers === undefined) {
                setPigsVouchers(res.data.inventory.pigs_voucher.amount)
            }
        }).catch((err) => {
            console.error(err)
        })
    }, [])

    function getTotalRtsVouchers() {
        return parseInt(rtsHeavyVouchers) + parseInt(rtsVouchers) + parseInt(rtsAviatorVouchers);
    }

    function validForm() {
        if (!company) return false;
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

        Api.getPayoutDetails(voucherNum, company).then((response) => {
            setLoading(false);
            setResponse(response)
            toggle();
        }).catch(err => {
            console.error(err);
            setLoading(false)
            alert("There was an error calculating this payout")
        })
    }

    return (
        <Form noValidate autoComplete="off">
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
                        <Dropdown toggle={() => {}}>
                            <DropdownToggle color={'primary'} className="form-control" disabled>
                                You
                            </DropdownToggle>
                        </Dropdown>
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
            {response && <Modal fade isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Payout Summary</ModalHeader>
                <ModalBody>
                    <b>Progress</b>: <Progress multi>
                        <Progress bar striped animated color="info" min={0} max={100} value={response.oldProgress} />
                        <Progress bar striped animated color="success" min={0} max={100} value={response.do_rank ? 100 : response.newProgress - response.oldProgress} />
                    </Progress>
                    <b>Money</b>: $<FormattedNumber num={response.money} />
                    <br />
                    <b>Rank up</b>? {response.do_rank ? <span className="text-success">{response.do_rank}</span> : <span className="text-danger">No</span>}
                    <br />
                    <b>New Deadline</b>: {new Date(response.deadline).toDateString()}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>}
        </Form>
    )
}

export default UserPayoutContainer
