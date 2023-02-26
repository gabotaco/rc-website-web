import React from 'react';
import CompanyTables from '../../_common/CompanyTables';
import * as queries from '../../../apollo/queries';
import LoadingIcon from '../../_presentational/LoadingIcon';
import FormattedNumber from '../../_common/FormattedNumber';
import PersonalVouchers from './cashout/PersonalVouchers';
import { useQuery } from '@apollo/client';

const MangagerCashout = () => {
	const {loading, error, data} = useQuery(queries.GET_AUTH_USER_CASHOUT);
	if (loading) return <LoadingIcon />;
	if (error) {
		console.error(error);
		return 'There was an error getting your cashout';
	}

	const cashout = data.getAuthUserCashout;

	const tableData = {
		rts: [cashout],
		pigs: [cashout],
		both: [cashout],
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

export default MangagerCashout;

const config = {
	rts: {
		disabled: true,
	},
	pigs: {
		disabled: true,
	},
	both: {
		disabled: true,
	},
};

const Headers = {
	rts: [
		'Total Vouchers',
		'Personal Vouchers',
		'Cashout Value',
		'Total Value',
		'Manager Pay',
		'Expected Full Pay',
		'Career Earnings',
	],
	pigs: [
		'Total Vouchers',
		'Personal Vouchers',
		'Cashout Value',
		'Total Value',
		'Manager Pay',
		'Expected Full Pay',
		'Career Earnings',
	],
	both: [
		'Total Vouchers',
		'Personal Vouchers',
		'Cashout Value',
		'Total Value',
		'Manager Pay',
		'Expected Full Pay',
		'Career Earnings',
	],
};

const Formatters = {
	rts: cashout => {
		return (
			<tr key={Math.random()}>
				<td>
					<FormattedNumber num={cashout.rts_cashout} />
				</td>
				<td>
					<PersonalVouchers company="rts" workVouchers={cashout.rts_cashout} />
				</td>
				<td>
					$<FormattedNumber num={cashout.rts_cashout_worth} />
				</td>
				<td>
					$<FormattedNumber num={cashout.rts_cashout * 10000} />
				</td>
				<td>
					$
					<FormattedNumber
						num={Math.floor(
							(cashout.rts_cashout * 10000 - cashout.rts_cashout_worth) * 0.5
						)}
					/>
				</td>
				<td>
					$
					<FormattedNumber
						num={
							Math.floor(
								(cashout.rts_cashout * 10000 - cashout.rts_cashout_worth) * 0.5
							) + cashout.rts_cashout_worth
						}
					/>
				</td>
				<td>
					$<FormattedNumber num={cashout.total_money} />
				</td>
			</tr>
		);
	},
	pigs: cashout => {
		return (
			<tr key={Math.random()}>
				<td>
					<FormattedNumber num={cashout.pigs_cashout} />
				</td>
				<td>
					<PersonalVouchers
						company="pigs"
						workVouchers={cashout.pigs_cashout}
					/>
				</td>
				<td>
					$<FormattedNumber num={cashout.pigs_cashout_worth} />
				</td>
				<td>
					$<FormattedNumber num={cashout.pigs_cashout * 10000} />
				</td>
				<td>
					$
					<FormattedNumber
						num={Math.floor(
							(cashout.pigs_cashout * 10000 - cashout.pigs_cashout_worth) * 0.5
						)}
					/>
				</td>
				<td>
					$
					<FormattedNumber
						num={
							Math.floor(
								(cashout.pigs_cashout * 10000 - cashout.pigs_cashout_worth) *
									0.5
							) + cashout.pigs_cashout_worth
						}
					/>
				</td>
				<td>
					$<FormattedNumber num={cashout.total_money} />
				</td>
			</tr>
		);
	},
	both: cashout => {
		return (
			<tr key={Math.random()}>
				<td>
					<FormattedNumber num={cashout.pigs_cashout + cashout.rts_cashout} />
				</td>
				<td>
					<PersonalVouchers
						company="both"
						workVouchers={cashout.rts_cashout + cashout.pigs_cashout}
					/>
				</td>
				<td>
					$
					<FormattedNumber
						num={cashout.pigs_cashout_worth + cashout.rts_cashout_worth}
					/>
				</td>
				<td>
					$
					<FormattedNumber
						num={(cashout.pigs_cashout + cashout.rts_cashout) * 10000}
					/>
				</td>
				<td>
					$
					<FormattedNumber
						num={Math.floor(
							((cashout.pigs_cashout + cashout.rts_cashout) * 10000 -
								(cashout.pigs_cashout_worth + cashout.rts_cashout_worth)) *
								0.5
						)}
					/>
				</td>
				<td>
					$
					<FormattedNumber
						num={
							Math.floor(
								((cashout.pigs_cashout + cashout.rts_cashout) * 10000 -
									(cashout.pigs_cashout_worth + cashout.rts_cashout_worth)) *
									0.5
							) +
							(cashout.pigs_cashout_worth + cashout.rts_cashout_worth)
						}
					/>
				</td>
				<td>
					$<FormattedNumber num={cashout.total_money} />
				</td>
			</tr>
		);
	},
};
