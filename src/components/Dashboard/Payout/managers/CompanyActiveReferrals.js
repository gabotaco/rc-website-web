import React from 'react';
import * as queries from '../../../../apollo/queries';
import LoadingIcon from '../../../_presentational/LoadingIcon';
import CustomTable from '../../../_common/CustomTable';
import ChangeInGameIDButton from './ChangeInGameIDButton';
import { useQuery } from '@apollo/client';

const CompanyActiveReferrals = props => {
	const { loading, error, data, refetch } = useQuery(
		queries.GET_ACTIVE_REFERRALS
	);
	if (loading) return <LoadingIcon />;
	if (error) {
		console.error(error);
		return 'There was an error getting active referrals';
	}

	const applicants = data.getActiveReferrals;

	const formatter = (applicant, key) => {
		return (
			<tr key={key}>
				<td>{applicant.employee_name}</td>
				<td>{applicant.employee_id}</td>
				<td>{applicant.total_vouchers}</td>
				<td>{applicant.re_name}</td>
				<td>
					{applicant.re_in_game_id}{' '}
					{props.owner && (
						<ChangeInGameIDButton
							refetch={refetch}
							employee_name={applicant.employee_name}
							game_id={applicant.re_in_game_id}
							app_id={applicant.app_id}
						/>
					)}
				</td>
				<td>{applicant.re_discord_id}</td>
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
};

export default CompanyActiveReferrals;

const config = {
	id: 'active-referrals-table',
};

const headers = [
	'Applicant In-Game Name',
	'Applicant In-Game ID',
	'Applicant Vouchers',
	'Employee In-Game Name',
	'Employee In-Game ID',
	'Employee Discord ID',
];
