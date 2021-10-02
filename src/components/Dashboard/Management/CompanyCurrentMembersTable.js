import React from 'react';
import CustomTable from '../../_common/CustomTable';

const CompanyCurrentMembersTable = (props) => {
    let rank = 0;

    for (let i = 0; i < props.members.length; i++) {
        if (props.members[i].last_turnin) rank = i + 1;
    }

    const formatter = (member, key) => {
        return <tr key={key} className={member.last_turnin ? 'table-info' : null}>
            <th scope="row">{key + 1}</th>
            <td>{member.in_game_id} {member.in_game_name}</td>
            <td>{member.rts.vouchers}</td>
            <td>{member.pigs.vouchers}</td>
            <td>{member.company === 'fired' ? "Yeeted" : member.company.toUpperCase()}</td>
            {member.last_turnin ? 
            <td data-order={new Date(member.last_turnin).toISOString()}>{new Date(member.last_turnin).toDateString()}</td>
            :
            <td></td>
            }
        </tr>
    }
    
    function onCreated(table) {
        table.page(Math.floor(rank / 10)).draw('page')
    }

    return (
        <CustomTable onCreated={onCreated} config={config} headers={headers} data={props.members} format={formatter} />
    )
}

export default CompanyCurrentMembersTable

const config = {
    id: 'member-list-table',
    jquery: {
        "order": [
            [0, 'asc']
        ]
    }
}

const headers = [
    'Rank',
    'In Game',
    'RTS Total Vouchers',
    'PIGS Total Vouchers',
    'Company',
    'Last Turnin Date'
]
