import * as queries from '../../../../apollo/queries';

import FilterableTables from '../../../_common/FilterableTables';
import FormattedNumber from '../../../../components/_common/FormattedNumber';
import GetDetailsButton from './GetDetailsButton';
import LoadingIcon from '../../../_presentational/LoadingIcon';
import PayReferralButton from './PayReferralButton';
import React from 'react';
import { useQuery } from '@apollo/client';

const CompletedReferrals = () => {
	const { loading, error, data } = useQuery(queries.GET_COMPLETED_REFERRALS);
	if (loading) return <LoadingIcon />;
	if (error) {
		console.error(error);
		return 'There was an error getting completed referrals';
	}

	const referralData = data.getCompletedReferrals;

	const formatters = {
		unpaid: (unpaid, i) => {
			return (
				<tr key={i}>
					<td>{unpaid.in_game_name}</td>
					<td>{unpaid.in_game_id}</td>
					<td>{unpaid.discord_id}</td>
					<td>
						$
						<FormattedNumber
							num={referralData.moneyOwned[unpaid.in_game_id].unpaid}
						/>
					</td>
					<td>
						<GetDetailsButton
							referred_id={unpaid.in_game_id}
							paid={'0'}
							data={unpaid}
						/>
					</td>
					<td>
						<PayReferralButton
							referred_id={unpaid.in_game_id}
							name={unpaid.in_game_name}
						/>
					</td>
				</tr>
			);
		},
		paid: (paid, i) => {
			return (
				<tr key={i}>
					<td>{paid.in_game_name}</td>
					<td>{paid.in_game_id}</td>
					<td>{paid.discord_id}</td>
					<td>
						$
						<FormattedNumber
							num={referralData.moneyOwned[paid.in_game_id].paid}
						/>
					</td>
					<td>
						<GetDetailsButton
							referred_id={paid.in_game_id}
							paid={'1'}
							data={paid}
						/>
					</td>
				</tr>
			);
		},
		both: (both, i) => {
			return (
				<tr key={i}>
					<td>{both.in_game_name}</td>
					<td>{both.in_game_id}</td>
					<td>{both.discord_id}</td>
					<td>
						$
						<FormattedNumber
							num={
								referralData.moneyOwned[both.in_game_id].unpaid +
								referralData.moneyOwned[both.in_game_id].paid
							}
						/>
					</td>
					<td>
						<GetDetailsButton
							referred_id={both.in_game_id}
							paid={'both'}
							data={both}
						/>
					</td>
				</tr>
			);
		},
	};

	return (
		<FilterableTables
			filters={['Unpaid', 'Paid', 'Both']}
			tables={[
				{
					filter: 'Unpaid',
					headers: headers.unpaid,
					data: referralData.unpaid,
					formatter: formatters.unpaid,
					config: config.unpaid,
				},
				{
					filter: 'Paid',
					headers: headers.paid,
					data: referralData.paid,
					formatter: formatters.paid,
					config: config.paid,
				},
				{
					filter: 'Both',
					headers: headers.both,
					data: referralData.both,
					formatter: formatters.both,
					config: config.both,
				},
			]}
		/>
	);
};

export default CompletedReferrals;

const config = {
	unpaid: {
		id: 'unpaid-completed-table',
		jquery: {
			columns: [
				null,
				null,
				null,
				null,
				{
					orderable: false,
				},
				{
					orderable: false,
				},
			],
		},
	},
	paid: {
		id: 'paid-completed-table',
		jquery: {
			columns: [
				null,
				null,
				null,
				null,
				{
					orderable: false,
				},
			],
		},
	},
	both: {
		id: 'both-completed-table',
		jquery: {
			columns: [
				null,
				null,
				null,
				null,
				{
					orderable: false,
				},
			],
		},
	},
};

const headers = {
	unpaid: [
		'Employee In Game Name',
		'Employee In Game ID',
		'Employee Discord ID',
		'Total amount of money owed',
		'Details',
		'Pay',
	],
	paid: [
		'Employee In Game Name',
		'Employee In Game ID',
		'Employee Discord ID',
		'Total amount of money owed',
		'Details',
	],
	both: [
		'Employee In Game Name',
		'Employee In Game ID',
		'Employee Discord ID',
		'Total Money',
		'Details',
	],
};
