import { Progress, Table } from 'reactstrap';

import FormattedNumber from '../../../_common/FormattedNumber';
import React from 'react';
import Tooltip from '../../../_common/Tooltip';

const RtsProgress = props => {
	let NextRank,
		RankVouchers,
		CurrentVouchers,
		CompanyProgress,
		Rank,
		RequiredVouchers;
	if (props.rts.vouchers < 9600) {
		NextRank = 'Lead Foot';
		RankVouchers = 9600;
		CurrentVouchers = props.rts.vouchers;
		CompanyProgress = Math.floor((CurrentVouchers / RankVouchers) * 100);

		Rank = 'Initiate';
		RequiredVouchers = 9600 - props.rts.vouchers;
	} else if (props.rts.vouchers < 24000) {
		NextRank = 'Wheelman';
		RankVouchers = 14400;
		CurrentVouchers = props.rts.vouchers - 9600;
		CompanyProgress = Math.floor((CurrentVouchers / RankVouchers) * 100);

		Rank = 'Lead Foot';
		RequiredVouchers = 24000 - props.rts.vouchers;
	} else if (props.rts.vouchers < 52800) {
		NextRank = 'Legendary Wheelman';
		RankVouchers = 28800;
		CurrentVouchers = props.rts.vouchers - 24000;
		CompanyProgress = Math.floor((CurrentVouchers / RankVouchers) * 100);

		Rank = 'Wheelman';
		RequiredVouchers = 52800 - props.rts.vouchers;
	} else if (props.rts.vouchers < 117600) {
		NextRank = 'Speed Demon';
		RankVouchers = 64800;
		CurrentVouchers = props.rts.vouchers - 52800;
		CompanyProgress = Math.floor((CurrentVouchers / RankVouchers) * 100);

		Rank = 'Legendary Wheelman';
		RequiredVouchers = 117600 - props.rts.vouchers;
	} else {
		CurrentVouchers = props.rts.vouchers - 117600;
		CompanyProgress = 100;
		RequiredVouchers = CurrentVouchers;

		Rank = 'Speed Demon';
		RequiredVouchers = 'Max';
		NextRank = 'Max';
	}

	const Styles = {
		ProgressBar: {
			width: `${CompanyProgress}%`,
			backgroundColor: '#ff8600',
		},
	};

	return (
		<div className="mt-2">
			<h4>
				RTS{' '}
				{props.member.company === 'rts' && (
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
						<th scope="col">Next Rank</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{Rank}</td>
						<td>
							{props.company.rts_rank}/{props.company.total_members}
						</td>
						<td>
							<FormattedNumber num={props.rts.vouchers} />
						</td>
						<td>
							$<FormattedNumber num={props.rts.worth} />
						</td>
						<td>
							<FormattedNumber num={RequiredVouchers} />
						</td>
						<td>{NextRank}</td>
					</tr>
				</tbody>
			</Table>

			<Progress id="rts-progress-bar" multi>
				<Progress
					animated
					bar
					striped
					value={CurrentVouchers}
					min={0}
					max={RankVouchers}
					style={Styles.ProgressBar}
				/>
			</Progress>
			<Tooltip placement="top" target={'rts-progress-bar'}>
				<FormattedNumber num={CurrentVouchers} />/
				<FormattedNumber num={RankVouchers} />
			</Tooltip>
		</div>
	);
};

export default RtsProgress;
