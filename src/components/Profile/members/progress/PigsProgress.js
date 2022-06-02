import React from 'react';
import { Table, Progress } from 'reactstrap';
import FormattedNumber from '../../../_common/FormattedNumber';
import Tooltip from '../../../_common/Tooltip';

const PigsProgress = props => {
	let Rank,
		RequiredVouchers,
		NextRank,
		RankVouchers,
		CurrentVouchers,
		CompanyProgress;
	if (props.pigs.vouchers < 6000) {
		Rank = 'Hustler';
		RequiredVouchers = 6000 - props.pigs.vouchers;
		NextRank = 'Pickpocket';
		RankVouchers = 6000;
		CurrentVouchers = props.pigs.vouchers;

		CompanyProgress = Math.floor((CurrentVouchers / RankVouchers) * 100);
	} else if (props.pigs.vouchers < 18000) {
		Rank = 'PickPocket';
		RequiredVouchers = 18000 - props.pigs.vouchers;

		NextRank = 'Thief';
		RankVouchers = 12000;
		CurrentVouchers = props.pigs.vouchers - 6000;

		CompanyProgress = Math.floor((CurrentVouchers / RankVouchers) * 100);
	} else if (props.pigs.vouchers < 38000) {
		Rank = 'Thief';
		RequiredVouchers = 38000 - props.pigs.vouchers;

		NextRank = 'Lawless';
		RankVouchers = 20000;
		CurrentVouchers = props.pigs.vouchers - 18000;

		CompanyProgress = Math.floor((CurrentVouchers / RankVouchers) * 100);
	} else if (props.pigs.vouchers < 68000) {
		Rank = 'Lawless';
		RequiredVouchers = 68000 - props.pigs.vouchers;
		NextRank = 'Criminal Mastermind';
		RankVouchers = 30000;
		CurrentVouchers = props.pigs.vouchers - 38000;

		CompanyProgress = Math.floor((CurrentVouchers / RankVouchers) * 100);
	} else if (props.pigs.vouchers < 150000) {
		Rank = 'Mastermind';
		RequiredVouchers = 150000 - props.pigs.vouchers;
		NextRank = 'Overlord';
		RankVouchers = 82000;
		CurrentVouchers = props.pigs.vouchers - 68000;

		CompanyProgress = Math.floor((CurrentVouchers / RankVouchers) * 100);
	} else if (props.pigs.vouchers < 1500000) {
		Rank = 'Overlord';
		RequiredVouchers = 1500000 - props.pigs.vouchers;
		NextRank = 'Swine';
		RankVouchers = 1350000;
		CurrentVouchers = props.pigs.vouchers - 150000;

		CompanyProgress = Math.floor((CurrentVouchers / RankVouchers) * 100);
	} else {
		Rank = 'Swine';
		CurrentVouchers = props.pigs.vouchers - 1500000;
		RequiredVouchers = CurrentVouchers;
		CompanyProgress = 100;
		NextRank = 'Max';
	}

	const stolenMoney = (RequiredVouchers / 75) * 10000;
	const Styles = {
		ProgressBar: {
			width: `${CompanyProgress}%`,
			backgroundColor: '#E91E63',
		},
	};
	return (
		<div>
			<h4>
				PIGS{' '}
				{props.member.company === 'pigs' && (
					<small className="text-muted">(current company)</small>
				)}
			</h4>
			<Table>
				<thead>
					<tr>
						<th scope="col">Current Rank</th>
						<th scope="col">Company Rank</th>
						<th scope="col">Total Vouchers Turned In</th>
						<th scope="col">Total Money Made</th>
						<th scope="col">Vouchers to Next Rank</th>
						<th scope="col">Stolen Money to Next Rank</th>
						<th scope="col">Next Rank</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{Rank}</td>
						<td>
							{props.company.pigs_rank}/{props.company.total_members}
						</td>
						<td>
							<FormattedNumber num={props.pigs.vouchers} />
						</td>
						<td>
							$<FormattedNumber num={props.pigs.worth} />
						</td>
						<td>
							<FormattedNumber num={RequiredVouchers} />
						</td>
						{NextRank === 'Max' && <td>Max Rank</td>}
						{NextRank !== 'Max' && (
							<td>
								$
								<FormattedNumber num={Math.ceil(stolenMoney / 10000) * 10000} />
							</td>
						)}
						<td>{NextRank}</td>
					</tr>
				</tbody>
			</Table>

			<Progress id="pigs-progress-bar" multi>
				<Progress
					animated
					bar
					striped
					value={CurrentVouchers}
					min={0}
					max={RankVouchers}
					Style={Styles.ProgressBar}
				/>
			</Progress>
			<Tooltip placement="top" target={'pigs-progress-bar'}>
				<FormattedNumber num={CurrentVouchers} />/
				<FormattedNumber num={RankVouchers} />
			</Tooltip>
		</div>
	);
};

export default PigsProgress;
