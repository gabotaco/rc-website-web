import React from 'react';
import CompanyTables from '../../_common/CompanyTables';
import {Query} from "react-apollo";
import * as queries from "../../../apollo/queries";
import LoadingIcon from "../../_presentational/LoadingIcon";
import FormattedNumber from "../../_common/FormattedNumber"

const MemberTurnins = () => {

    return (
        <Query query={queries.GET_AUTH_USER_TURNINS}>
        {
            ({loading, error, data}) => {
                if (loading) return <LoadingIcon />
                if (error) {
                    console.error(error)
                    return "There was an error getting your tunins"
                }

                const payouts = data.getAuthUserTurnins;

                const rtsPayouts = payouts.filter(payout => payout.company === 'rts')
                const pigsPayouts = payouts.filter(payout => payout.company === 'pigs')

                const tableData = {
                    rts: rtsPayouts,
                    pigs: pigsPayouts,
                    both: payouts
                }

                return (
                    <CompanyTables config={config} headers={Headers} data={tableData} formatters={Formatters} />
                )
            }
        }
        </Query>
    );
}

export default MemberTurnins

const config = {
    rts: {
        id: 'rts-table',
        jquery: {
            "order": [
                [3, 'desc']
            ]
        }
    },
    pigs: {
        id: 'pigs-table',
        jquery: {
            "order": [
                [3, 'desc']
            ]
        }
    },
    both: {
        id: 'both-table',
        jquery: {
            "order": [
                [3, 'desc']
            ]
        }
    }
}

const Headers = {
    rts: [
        'Manager',
        'Vouchers Turned In',
        'Money Paid',
        'Date'
    ],
    pigs: [
        'Manager',
        'Vouchers Turned In',
        'Money Paid',
        'Date'
    ],
    both: [
        'Manager',
        'Vouchers Turned In',
        'Money Paid',
        'Date',
        'Company'
    ],
}

const Formatters = {
    rts: (payout) => {
        return (
            <tr key={payout.createdAt}>
                <td>{payout.manager.member.in_game_name} ({payout.manager.member.in_game_id})</td>
                <td><FormattedNumber num={payout.amount} /></td>
                <td>$<FormattedNumber num={payout.worth} /></td>
                <td data-order={new Date(payout.createdAt).toISOString()}>{new Date(payout.createdAt).toDateString()}</td>
            </tr>
        )
    },
    pigs: (payout) => {
        return (
            <tr key={payout.createdAt}>
                <td>{payout.manager.member.in_game_name} ({payout.manager.member.in_game_id})</td>
                <td><FormattedNumber num={payout.amount} /></td>
                <td>$<FormattedNumber num={payout.worth} /></td>
                <td data-order={new Date(payout.createdAt).toISOString()}>{new Date(payout.createdAt).toDateString()}</td>
            </tr>
        )
    },
    both: (payout) => {
        return (
            <tr key={payout.createdAt}>
                <td>{payout.manager.member.in_game_name} ({payout.manager.member.in_game_id})</td>
                <td><FormattedNumber num={payout.amount} /></td>
                <td>$<FormattedNumber num={payout.worth} /></td>
                <td data-order={new Date(payout.createdAt).toISOString()}>{new Date(payout.createdAt).toDateString()}</td>
                <td>{payout.company.toUpperCase()}</td>
            </tr>
        )
    }
}