import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoadingIcon from '../../../_presentational/LoadingIcon';
import { useMutation } from 'react-apollo-hooks';
import * as queries from "../../../../apollo/queries"
import { useLazyQuery } from '@apollo/client'
import CustomTable from '../../../_common/CustomTable';
import FormattedNumber from '../../../_common/FormattedNumber';

const DetailsButton = (props) => {
    const [getMemberPayouts, {payoutsLoading, error, data}] = useLazyQuery(queries.GET_MEMBER_PAYOUTS)
    if (error) console.error(error)
    const {member} = props
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const SET_WELCOME = useMutation(queries.SET_MEMBER_WELCOME)

    const toggle = () => setModal(!modal);

    function toggleRehire() {
        setLoading(true)
        SET_WELCOME({
            variables: {
                uid: member.id,
                welcome: !member.welcome
            }
        }).then(() => {
            setLoading(false)
        }).catch((err) => {
            console.error(err);
            setLoading(false)
            alert("There was an error changing their welcome status")
        })
    }

    function openDetails() {
        toggle();
        if (!data && !loading && !error) getMemberPayouts({variables: { member_id: member.id }})
    }

    return (
        <React.Fragment>
            <Button color="info" onClick={openDetails} disabled={modal}>Details</Button>
            <Modal isOpen={modal} toggle={toggle} fade size="xl" >
                <ModalHeader toggle={toggle}>{member.in_game_name}'s Details</ModalHeader>
                <ModalBody>
                    <b>Discord ID</b>: {member.discord_id}<br />
                    <b>RTS Rank</b>: {member.rts_rank}<br />
                    <b>PIGS Rank</b>: {member.pigs_rank}<br />
                    {member.fire_reason && <React.Fragment><b>Fire Reason</b>: {member.fire_reason}<br /></React.Fragment>}
                    {member.company === 'fired' && <Button disabled={loading} onClick={toggleRehire} color={member.welcome ? 'success' : 'danger'}>{loading ? <LoadingIcon /> : (member.welcome ? "Currently Rehireable" : "Currently NOT Rehireable")}</Button>}
                    {payoutsLoading && <LoadingIcon />}
                    {error && <p>There was an error loading their payouts</p>}
                    {data && <CustomTable config={config} headers={headers} data={data.getMemberPayouts} format={formatter} />}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Done</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

export default DetailsButton


const config = {
    id: 'both-table-user',
    jquery: {
        "order": [
            [3, 'desc']
        ]
    }
}

const headers = [
    'Manager',
    'Vouchers Turned In',
    'Money Paid',
    'Date',
    'Company'
]

const formatter = (payout, key) => {
    return <tr key={key}>
        <td>({payout.manager.member.in_game_id}) {payout.manager.member.in_game_name}</td>
        <td><FormattedNumber num={payout.amount} /></td>
        <td>$<FormattedNumber num={payout.worth} /></td>
        <td data-order={new Date(payout.createdAt).toISOString()}>{new Date(payout.createdAt).toDateString()}</td>
        <td>{payout.company.toUpperCase()}</td>
    </tr>
}