import React from 'react';
import { Table } from 'reactstrap';

const ServerPlayersTable = props => {
	return (
		<Table hover>
			<thead>
				<tr>
					<th scope="col">In Game Name</th>
					<th scope="col">In Game ID</th>
					<th scope="col">Job</th>
				</tr>
			</thead>
			<tbody>
				{props.members.map(player => {
					return (
						<tr>
							<td>{player[0]}</td>
							<td>{player[2]}</td>
							<td>{player[5]}</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default ServerPlayersTable;
