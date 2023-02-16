import CustomPaginatedTable from '../../_common/CustomPaginatedTable';
import { GET_AUTH_USER_RANK } from '../../../apollo/queries';
import { GET_PAGINATED_MEMBER_RANKINGS } from '../../../apollo/paginatedQueries';
import LoadingIcon from '../../_presentational/LoadingIcon';
import { Query } from 'react-apollo';
import React from 'react';

const CompanyCurrentMembersTable = props => {
	const formatter = (member, key) => {
		return (
			<tr key={key} className={member.last_turnin ? 'table-info' : null}>
				<th scope="row">{member.rank}</th>
				<td>
					{member.in_game_id} {member.in_game_name}
				</td>
				<td>{member.rts.vouchers}</td>
				<td>{member.pigs.vouchers}</td>
				<td>
					{member.company === 'fired' ? 'Yeeted' : member.company.toUpperCase()}
				</td>
				{member.last_turnin ? (
					<td data-order={new Date(member.last_turnin).toISOString()}>
						{new Date(member.last_turnin).toDateString()}
					</td>
				) : (
					<td></td>
				)}
			</tr>
		);
	};

	return (
		<Query query={GET_AUTH_USER_RANK}>
			{({ loading, error, data }) => {
				if (loading) return <LoadingIcon />;
				if (error) {
					console.error(error);
					return 'There was an error loading active managers';
				}

				const userRank = data.authorizedUserRank;
				const userPage = Math.ceil(userRank / 10);

				return (
					<CustomPaginatedTable
						config={config}
						headers={headers}
						query={GET_PAGINATED_MEMBER_RANKINGS}
						page={userPage}
						format={formatter}
					/>
				);
			}}
		</Query>
	);
};

export default CompanyCurrentMembersTable;

const config = {
	id: 'member-list-table',
};

const headers = [
	'Rank',
	'In Game',
	'RTS Total Vouchers',
	'PIGS Total Vouchers',
	'Company',
	'Last Turnin Date',
];
