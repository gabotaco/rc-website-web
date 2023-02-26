import React from 'react';
import CompanyTables from '../../_common/CompanyTables';
import * as queries from '../../../apollo/queries';
import LoadingIcon from '../../_presentational/LoadingIcon';
import FormattedNumber from '../../_common/FormattedNumber';
import { useQuery } from '@apollo/client';

const ManagerPayouts = () => {
	const {loading, error, data} = useQuery(queries.GET_AUTH_USER_PAYOUTS);
	if (loading) return <LoadingIcon />;
	if (error) {
		console.error(error);
		return 'There was an error getting your payouts';
	}

	const payouts = data.getAuthUserPayouts;

	const rtsPayouts = payouts.filter(payout => payout.company === 'rts');
	const pigsPayouts = payouts.filter(payout => payout.company === 'pigs');

	const tableData = {
		rts: rtsPayouts,
		pigs: pigsPayouts,
		both: payouts,
	};

	return (
		<CompanyTables
			config={config}
			headers={Headers}
			data={tableData}
			formatters={Formatters}
		/>
	);
};

export default ManagerPayouts;

const config = {
	rts: {
		id: 'rts-manager-table',
		jquery: {
			order: [[3, 'desc']],
		},
	},
	pigs: {
		id: 'pigs-manager-table',
		jquery: {
			order: [[3, 'desc']],
		},
	},
	both: {
		id: 'both-manager-table',
		jquery: {
			order: [[3, 'desc']],
		},
	},
};

const Headers = {
	rts: ['Employee', 'Vouchers Turned In', 'Money Paid', 'Date'],
	pigs: ['Employee', 'Vouchers Turned In', 'Money Paid', 'Date'],
	both: ['Employee', 'Vouchers Turned In', 'Money Paid', 'Date', 'Company'],
};

const Formatters = {
	rts: payout => {
		return (
			<tr key={payout.createdAt}>
				<td>
					{payout.member.in_game_name} ({payout.member.in_game_id})
				</td>
				<td>
					<FormattedNumber num={payout.amount} />
				</td>
				<td>
					$<FormattedNumber num={payout.worth} />
				</td>
				<td data-order={new Date(payout.createdAt).toISOString()}>
					{new Date(payout.createdAt).toDateString()}
				</td>
			</tr>
		);
	},
	pigs: payout => {
		return (
			<tr key={payout.createdAt}>
				<td>
					{payout.member.in_game_name} ({payout.member.in_game_id})
				</td>
				<td>
					<FormattedNumber num={payout.amount} />
				</td>
				<td>
					$<FormattedNumber num={payout.worth} />
				</td>
				<td data-order={new Date(payout.createdAt).toISOString()}>
					{new Date(payout.createdAt).toDateString()}
				</td>
			</tr>
		);
	},
	both: payout => {
		return (
			<tr key={payout.createdAt}>
				<td>
					{payout.member.in_game_name} ({payout.member.in_game_id})
				</td>
				<td>
					<FormattedNumber num={payout.amount} />
				</td>
				<td>
					$<FormattedNumber num={payout.worth} />
				</td>
				<td data-order={new Date(payout.createdAt).toISOString()}>
					{new Date(payout.createdAt).toDateString()}
				</td>
				<td>{payout.company.toUpperCase()}</td>
			</tr>
		);
	},
};
