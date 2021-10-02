import React, {useState} from 'react';
import {Query} from "react-apollo";
import * as queries from "../../../../apollo/queries"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import CustomTable from '../../../_common/CustomTable';

const ReferralDetails = (props) => {
    const [modal, setModal] = useState(true)

    const toggle = () => setModal(!modal)

    return (
        <Query query={queries.GET_REFERRAL_DETAILS} variables={{
            referred_id: props.referred_id,
            paid: props.paid
        }}>
            {
                ({loading, error, data}) => {
                    if (loading) return null
                    props.setLoading(loading)
                    if (error) {
                        console.error(error)
                        alert("There was an error getting their details")
                        return null
                    }
                    const details = data.getReferralDetails

                    return <Modal isOpen={modal} toggle={toggle} size={"xl"} fade>
                        <ModalHeader toggle={toggle}>{props.name}'s Refferals</ModalHeader>
                        <ModalBody>
                            <CustomTable config={config} headers={headers} data={details} format={formatter} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggle}>Close</Button>
                        </ModalFooter>
                    </Modal>
                }
            }
        </Query>
    )
}

export default ReferralDetails

const config = {
    id: 'refferal-table'
}

const headers = [
    'Applicant In-Game Name',
    'Applicant In-Game ID',
    'Applicant Vouchers'
]

const formatter = (refferal, i) => {
    return <tr key={i}>
        <td>{refferal.in_game_name}</td>
        <td>{refferal.in_game_id}</td>
        <td>{refferal.total_vouchers}</td>
    </tr>
}