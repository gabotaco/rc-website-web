import React from 'react';
import { Query } from 'react-apollo';
import * as queries from '../../../../apollo/queries';
import LoadingIcon from '../../../_presentational/LoadingIcon';
import CustomTable from '../../../_common/CustomTable';

const UserActiveReferrals = props => {
	return (
		<Query query={queries.GET_AUTH_USER_ACTIVE_REFERRALS}>
			{({ loading, error, data }) => {
				if (loading) return <LoadingIcon />;
				if (error) {
					console.error(error);
					return 'There was an error getting your referrals';
				}

				const applicants = data.getAuthUserActiveReferrals;

				const formatter = (applicant, key) => {
					return (
						<tr key={key}>
							<td>{applicant.employee_name}</td>
							<td>{applicant.employee_id}</td>
							<td>{applicant.total_vouchers}</td>
						</tr>
					);
				};

				return (
					<CustomTable
						config={config}
						headers={headers}
						data={applicants}
						format={formatter}
					/>
				);
			}}
		</Query>
	);
};

export default UserActiveReferrals;

const config = {
	id: 'active-referrals-table',
	jquery: {
		language: {
			emptyTable:
				'Refer players to Rockwell Corporation to receive $10,000,000 when that person grinds 10k vouchers!',
		},
	},
};

const headers = [
	'Applicant In-Game Name',
	'Applicant In-Game ID',
	'Applicant Vouchers',
];
