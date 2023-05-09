import * as queries from '../../../apollo/queries';

import {
	Button,
	Col,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Row,
} from 'reactstrap';
import React, { useState } from 'react';

import CustomTable from '../../_common/CustomTable';
import FormattedNumber from '../../_common/FormattedNumber';
import LoadingIcon from '../../_presentational/LoadingIcon';
import { useLazyQuery } from '@apollo/client';

const TopTurninForm = () => {
	const [getTopTurnins, { loading, error, data }] = useLazyQuery(
		queries.GET_TOP_TURNINS
	);
	if (error) {
		console.error(error);
		alert('There was an error getting top turnins');
	}
	const [company, setCompany] = useState('rts');
	const [players, setPlayers] = useState(5);
	const weekAgo = new Date();
	weekAgo.setDate(weekAgo.getDate() - 7);
	const [fromDate, setFromDate] = useState(weekAgo.toISOString().split('T')[0]);
	const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);

	function validFromDate() {
		if (!fromDate || !new Date(fromDate)) return false;
		if (!toDate) return true;
		if (new Date(fromDate) > new Date(toDate)) return false;
		return true;
	}
	function validToDate() {
		if (!toDate || !new Date(toDate)) return false;
		if (!fromDate) return true;
		if (new Date(fromDate) > new Date(toDate)) return false;
		return true;
	}

	function handleClick() {
		if (!parseInt(players) || !validFromDate() || !validToDate()) return;
		getTopTurnins({
			variables: {
				num_players: parseInt(players),
				from: fromDate,
				to: toDate,
				company: company,
			},
		});
	}

	return (
		<React.Fragment>
			<Form className="mb-2">
				<Row>
					<Col md={'3'}>
						<FormGroup>
							<Label>Company</Label>
							<Input
								type="select"
								className="form-control"
								required
								value={company}
								onChange={ev => setCompany(ev.target.value)}>
								<option value="rts">RTS</option>
								<option value="pigs">PIGS</option>
							</Input>
						</FormGroup>
					</Col>
					<Col md={'3'}>
						<FormGroup>
							<Label>Number of Players</Label>
							<Input
								invalid={!players || players < 1}
								type="number"
								value={players.toString()}
								onChange={ev => setPlayers(parseInt(ev.target.value))}
							/>
							<FormFeedback>Please specify a number of players.</FormFeedback>
						</FormGroup>
					</Col>
					<Col md={'3'}>
						<FormGroup>
							<Label>From</Label>
							<Input
								min={'2018-07-30'}
								max={toDate || new Date().toISOString().split('T')[0]}
								value={fromDate}
								invalid={!validFromDate()}
								type="date"
								onChange={ev => setFromDate(ev.target.value)}
							/>
							<FormFeedback>Please specify a valid from date.</FormFeedback>
						</FormGroup>
					</Col>
					<Col md={'3'}>
						<FormGroup>
							<Label>To</Label>
							<Input
								min={fromDate || '2018-07-30'}
								max={new Date().toISOString().split('T')[0]}
								value={toDate}
								type="date"
								invalid={!validToDate()}
								onChange={ev => setToDate(ev.target.value)}
							/>
							<FormFeedback>Please specify a valid to date.</FormFeedback>
						</FormGroup>
					</Col>
				</Row>
				<Button color="primary" onClick={handleClick}>
					{loading ? <LoadingIcon /> : 'Submit'}
				</Button>
			</Form>
			{data && (
				<CustomTable
					config={config}
					headers={headers}
					data={data.getTopTurnins}
					format={formatter}
				/>
			)}
		</React.Fragment>
	);
};

export default TopTurninForm;

const config = {
	id: 'top-table',
};

const headers = ['#', 'Player', 'Vouchers', 'Money'];

const formatter = (player, key) => {
	return (
		<tr key={key}>
			<th scope="row">{player.place}</th>
			<td>
				{player.in_game_id} {player.in_game_name}
			</td>
			<td>
				<FormattedNumber num={player.vouchers} />
			</td>
			<td>
				$<FormattedNumber num={player.money} />
			</td>
		</tr>
	);
};
