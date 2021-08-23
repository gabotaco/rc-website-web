import React from 'react';
import {Query} from "react-apollo";
import * as queries from "../../../../apollo/queries"
import LoadingIcon from '../../../_presentational/LoadingIcon';
import CompanyTables from '../../../_common/CompanyTables';
import FormattedNumber from '../../../_common/FormattedNumber';

const ManagerPayoutTable = (props) => {
    return (
        <Query query={queries.GET_MANAGER_PAYOUTS} variables={
            {
                manager_id: props.manager_id
            }
        }>
        {
            ({loading, error, data}) => {
                if (loading) return <LoadingIcon sizeClass={'glimpsicon-32'} />
                if (error) {
                    alert("There was an error getting that managers payouts")
                    return null
                }
                
                const payouts = data.getManagerPayouts;

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
    )
}

export default ManagerPayoutTable

const config = {
    rts: {
        id: 'rts-manager-table',
        jquery: {
            "order": [
                [3, 'desc']
            ]
        }
    },
    pigs: {
        id: 'pigs-manager-table',
        jquery: {
            "order": [
                [3, 'desc']
            ]
        }
    },
    both: {
        id: 'both-manager-table',
        jquery: {
            "order": [
                [3, 'desc']
            ]
        }
    }
}

const Headers = {
    rts: [
        'Employee',
        'Vouchers Turned In',
        'Money Paid',
        'Date'
    ],
    pigs: [
        'Employee',
        'Vouchers Turned In',
        'Money Paid',
        'Date'
    ],
    both: [
        'Employee',
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
                <td>{payout.member.in_game_name} ({payout.member.in_game_id})</td>
                <td><FormattedNumber num={payout.amount} /></td>
                <td>$<FormattedNumber num={payout.worth} /></td>
                <td>{new Date(payout.createdAt).toDateString()}</td>
            </tr>
        )
    },
    pigs: (payout) => {
        return (
            <tr key={payout.createdAt}>
                <td>{payout.member.in_game_name} ({payout.member.in_game_id})</td>
                <td><FormattedNumber num={payout.amount} /></td>
                <td>$<FormattedNumber num={payout.worth} /></td>
                <td>{new Date(payout.createdAt).toDateString()}</td>
            </tr>
        )
    },
    both: (payout) => {
        return (
            <tr key={payout.createdAt}>
                <td>{payout.member.in_game_name} ({payout.member.in_game_id})</td>
                <td><FormattedNumber num={payout.amount} /></td>
                <td>$<FormattedNumber num={payout.worth} /></td>
                <td>{new Date(payout.createdAt).toDateString()}</td>
                <td>{payout.company.toUpperCase()}</td>
            </tr>
        )
    }
}