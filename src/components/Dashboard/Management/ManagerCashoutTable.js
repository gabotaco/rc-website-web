import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoadingIcon from '../../_presentational/LoadingIcon';
import CompanyTables from '../../_common/CompanyTables';
import FormattedNumber from '../../_common/FormattedNumber';
import * as Api from "../../../library/Api/api"

const ManagerCashoutTable = (props) => {
    const [payMember, setPayMember] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showActive, setActive] = useState(false)
    const [tables, setTables] = useState({
        'RTS': null,
        'PIGS': null,
        'BOTH': null
    })

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleActive = () => {
        if (!showActive) {
            if (tables['RTS']) tables['RTS'].column(7).search("active").draw('full-hold')
            if (tables['PIGS']) tables['PIGS'].column(7).search("active").draw('full-hold')
            if (tables['BOTH']) tables['BOTH'].column(7).search("active").draw('full-hold')
        } else {
            if (tables['RTS']) tables['RTS'].column(7).search("").draw('full-hold')
            if (tables['PIGS']) tables['PIGS'].column(7).search("").draw('full-hold')
            if (tables['BOTH']) tables['BOTH'].column(7).search("").draw('full-hold')
        }

        setActive(!showActive)
    }

    const Formatters = {
        rts: (cashout, i) => {
            const paid = cashout.rts_cashout === 0;
            return (
                <tr key={i}>
                    <th scope="row">{cashout.member.in_game_id} {cashout.member.in_game_name}</th>
                    <td><FormattedNumber num={cashout.rts_cashout} /></td>
                    <td>$<FormattedNumber num={cashout.rts_cashout_worth} /></td>
                    <td>$<FormattedNumber num={cashout.rts_cashout * 10000} /></td>
                    <td>$<FormattedNumber num={Math.floor(((cashout.rts_cashout * 10000) - cashout.rts_cashout_worth) * 0.5)} /></td>
                    <td>$<FormattedNumber num={Math.floor(((cashout.rts_cashout * 10000) - cashout.rts_cashout_worth) * 0.5) + cashout.rts_cashout_worth} /></td>
                    <td>$<FormattedNumber num={cashout.total_money} /></td>
                    <td data-search={cashout.active ? "active" : ""}>
                        <Button color={paid ? "success" : "secondary"} disabled={paid} onClick={() => {
                            setPayMember({
                                id: cashout.id,
                                in_game_id: cashout.member.in_game_id,
                                in_game_name: cashout.member.in_game_name,
                                company: 'rts'
                            });
                            toggle();
                        }}>{paid ? 'Paid.' : "Pay"}</Button>
                    </td>
                </tr>
            )
        },
        pigs: (cashout, i) => {
            const paid = cashout.pigs_cashout === 0;
            return (
                <tr key={i}>
                    <th scope="row">{cashout.member.in_game_id} {cashout.member.in_game_name}</th>
                    <td><FormattedNumber num={cashout.pigs_cashout} /></td>
                    <td>$<FormattedNumber num={cashout.pigs_cashout_worth} /></td>
                    <td>$<FormattedNumber num={cashout.pigs_cashout * 10000} /></td>
                    <td>$<FormattedNumber num={Math.floor(((cashout.pigs_cashout * 10000) - cashout.pigs_cashout_worth) * 0.5)} /></td>
                    <td>$<FormattedNumber num={Math.floor(((cashout.pigs_cashout * 10000) - cashout.pigs_cashout_worth) * 0.5) + cashout.pigs_cashout_worth} /></td>
                    <td>$<FormattedNumber num={cashout.total_money} /></td>
                    <td data-search={cashout.active ? "active" : ""}>
                        <Button color={paid ? "success" : "secondary"} disabled={paid} onClick={() => {
                            setPayMember({
                                id: cashout.id,
                                in_game_id: cashout.member.in_game_id,
                                in_game_name: cashout.member.in_game_name,
                                company: 'pigs'
                            });
                            toggle();
                        }}>{paid ? 'Paid.' : "Pay"}</Button>
                    </td>
                </tr>
            )
        },
        both: (cashout, i) => {
            const paid = cashout.rts_cashout + cashout.pigs_cashout === 0
            return (
                <tr key={i}>
                    <th scope="row">{cashout.member.in_game_id} {cashout.member.in_game_name}</th>
                    <td><FormattedNumber num={cashout.rts_cashout + cashout.pigs_cashout} /></td>
                    <td>$<FormattedNumber num={cashout.rts_cashout_worth + cashout.pigs_cashout_worth} /></td>
                    <td>$<FormattedNumber num={(cashout.rts_cashout * 10000) + (cashout.pigs_cashout * 10000)} /></td>
                    <td>$<FormattedNumber num={(Math.floor(((cashout.rts_cashout * 10000) - cashout.rts_cashout_worth) * 0.5)) + (Math.floor(((cashout.pigs_cashout * 10000) - cashout.pigs_cashout_worth) * 0.5))} /></td>
                    <td>$<FormattedNumber num={(Math.floor(((cashout.rts_cashout * 10000) - cashout.rts_cashout_worth) * 0.5) + cashout.rts_cashout_worth) + (Math.floor(((cashout.pigs_cashout * 10000) - cashout.pigs_cashout_worth) * 0.5) + cashout.pigs_cashout_worth)} /></td>
                    <td>$<FormattedNumber num={cashout.total_money} /></td>
                    <td data-search={cashout.active ? "active" : ""}>
                        <Button color={paid ? "success" : "secondary"} disabled={paid} onClick={() => {
                            setPayMember({
                                id: cashout.id,
                                in_game_id: cashout.member.in_game_id,
                                in_game_name: cashout.member.in_game_name,
                                company: 'both'
                            });
                            toggle();
                        }}>{paid ? 'Paid.' : "Pay"}</Button>
                    </td>
                </tr>
            )
        }
    }

    function pay() {
        if (!payMember) return;
        setLoading(true)
        Api.payManager(payMember.id, payMember.company).then(() => {
            props.refetch();
        }).catch((err) => {
            console.error(err);
            alert("There was an error paying this manager.")
        }).finally(() => {
            setLoading(false)
            toggle();
            setPayMember(null);
        })
    }

    function setTable(filter, table) {
        tables[filter] = table;
        setTables(tables)
    }

    return (
        <React.Fragment>
            <Button color="primary" className="mr-1" onClick={toggleActive} active={showActive}>Active</Button>
            <CompanyTables onCreated={setTable} config={config} headers={Headers} data={{rts: props.managers, pigs: props.managers, both: props.managers}} formatters={Formatters} />
            {payMember && <Modal isOpen={modal} toggle={toggle} fade scrollable>
                <ModalHeader toggle={toggle}>Pay {payMember.in_game_id} {payMember.in_game_name}</ModalHeader>
                <ModalBody>
                    Are you sure you want to pay them for {payMember.company === 'both' ? 'BOTH companys' : payMember.company.toUpperCase()}?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={pay}>{loading ? <LoadingIcon /> : 'Confirm'}</Button>
                </ModalFooter>
            </Modal>}
        </React.Fragment>
    )
}

export default ManagerCashoutTable

const config = {
    rts: {
        id: 'ceo-rts-cashout-table',
        jquery: {
            "columns": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                {
                  "orderable": false
                }
            ]
        }
    },
    pigs: {
        id: 'ceo-pigs-cashout-table',
        jquery: {
            "columns": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                {
                "orderable": false
                }
            ]
        }
    },
    both: {
        id: 'ceo-both-cashout-table',
        jquery: {
            "columns": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                {
                  "orderable": false
                }
            ]
        }
    }
}

const Headers = {
    rts: [
        'Manager',
        'Total Vouchers',
        'Cashout Value',
        'Total Value',
        'Manager Pay',
        'Expected Full Pay',
        'Career Earnings',
        'Pay'
    ],
    pigs: [
        'Manager',
        'Total Vouchers',
        'Cashout Value',
        'Total Value',
        'Manager Pay',
        'Expected Full Pay',
        'Career Earnings',
        'Pay'
    ],
    both: [
        'Manager',
        'Total Vouchers',
        'Cashout Value',
        'Total Value',
        'Manager Pay',
        'Expected Full Pay',
        'Career Earnings',
        'Pay'
    ],
}