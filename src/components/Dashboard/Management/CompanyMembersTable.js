import React, {useState} from 'react';
import CustomTable from '../../_common/CustomTable';
import FormattedNumber from "../../_common/FormattedNumber"
import EditInGameButton from './CompanyMemberButtons/EditInGameButton';
import CompanySelector from './CompanyMemberButtons/CompanySelector';
import CompanyMembersFilter from './CompanyMembersFilter';
import EditDeadlineButton from './CompanyMemberButtons/EditDeadlineButton';
import DetailsButton from './CompanyMemberButtons/DetailsButton';

const CompanyMembersTable = (props) => {
    const [table, setTable] = useState(null)

    const formatter = (member, key) => {
        const turninString = new Date(member.last_turnin).toDateString().split(" ")
        turninString.shift()

        const dateString = new Date(member.deadline).toDateString().split(" ")
        dateString.shift()

        const D2 = new Date() //curent date
        const D3 = D2 - new Date(member.deadline) //difference between deadline and today

        return <tr key={key} className={D3 >= 0 ? 'table-secondary' : null}>
            <th scope="row">{key + 1}</th>
            <td data-search={`${member.in_game_id} ${member.in_game_name} ${member.discord_id}`}>
                ({member.in_game_id}) {member.in_game_name}
                
                <EditInGameButton member={member} refetch={props.refetch} />
            </td>
            <td><FormattedNumber num={member.rts.vouchers} /></td>
            <td><FormattedNumber num={member.pigs.vouchers} /></td>
            <td data-order={member.company} data-search={`${member.company} ${member.manager ? "manager" : ""}`}>
                <CompanySelector member={member} perms={props.perms} refetch={props.refetch} />
            </td>
            <td data-order={new Date(member.last_turnin).toISOString()}>{turninString.join(" ")}</td>
            <td className="mx-auto text-center" data-order={new Date(member.deadline).toISOString()}>
                {dateString.join(" ")}
                
                <EditDeadlineButton member={member} />
            </td>
            <td>
                <DetailsButton member={member} />
            </td>
        </tr>
    }
    
    function onCreated(table) {
        setTable(table);
    }

    function onFilterChange(filter) {
        if (table) {
            table.column(4).search(filter, true).draw('full-hold')
        }
    }

    return (
        <React.Fragment>
            <CompanyMembersFilter onFilterChange={onFilterChange} perms={props.perms} />
            <CustomTable onCreated={onCreated} config={config} headers={Headers} data={props.members} format={formatter} />
        </React.Fragment>
    )
}

export default CompanyMembersTable

const config = {
    id: 'member-list-table',
    jquery: {
        "order": [
            [0, 'asc']
        ],
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

const Headers = [
    'Rank',
    'In Game',
    'RTS Total Vouchers',
    'PIGS Total Vouchers',
    'Company',
    'Last Turnin Date',
    'Deadline',
    'Details'
]