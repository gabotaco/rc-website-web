import React from 'react';
import { Table } from 'reactstrap';

const MemberDetailsTable = props => {
	return (
		<Table>
			<thead>
				<tr>
					<th scope="col">In Game Name</th>
					<th scope="col">In Game ID</th>
					<th scope="col">Current Company</th>
					{props.member.company === 'fired' && <th scope="col">Fire Reason</th>}
					{props.member.company === 'fired' && <th scope="col">Fire Date</th>}
					{props.member.company !== 'fired' && <th scope="col">Deadline</th>}
					{props.member.company !== 'fired' && <th scope="col">Last Turnin</th>}
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{props.member.in_game_name}</td>
					<td>{props.member.in_game_id}</td>
					<td>{props.member.company.toUpperCase()}</td>
					<td>
						{props.member.company !== 'fired'
							? new Date(props.member.deadline).toDateString()
							: props.member.fire_reason}
					</td>
					<td>
						{props.member.company !== 'fired'
							? new Date(props.member.last_turnin).toDateString()
							: new Date(props.member.deadline).toDateString()}
					</td>
				</tr>
			</tbody>
		</Table>
	);
};

export default MemberDetailsTable;
