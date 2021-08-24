import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoadingIcon from '../../../_presentational/LoadingIcon';
import { useMutation } from 'react-apollo-hooks';
import * as queries from "../../../../apollo/queries"

const PayReferralButton = (props) => {
    const [modal, setModal] = useState(false)
    const [done, setDone] = useState(false)
    const [loading, setLoading] = useState(false)
    const PAY_REF = useMutation(queries.SET_REF_PAID)

    const toggle = () => setModal(!modal)

    function handlePay() {
        setLoading(true)
        PAY_REF({
            variables: {
                id: props.referred_id
            }
        }).then(() => {
            setLoading(false)
            setDone(true)
            toggle();
        }).catch((err) => {
            console.error(err);
            setLoading(false)
            alert("There was an error marking their referral as paid")
        })
    }

    return (
        <React.Fragment>
            <Button color="success" onClick={toggle} disabled={modal || done}>{modal ? <LoadingIcon sizeClass={'glimpsicon-32'} /> : (done ? 'Paid.' : 'Pay')}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Pay {props.name}</ModalHeader>
                <ModalBody>
                    Are you sure you want to pay them?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={handlePay} disabled={loading}>{loading ? <LoadingIcon sizeClass={'glimpsicon-32'} /> : 'Confirm'}</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

export default PayReferralButton
