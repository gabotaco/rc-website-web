import * as Api from '../../../../library/Api/api';
import * as queries from '../../../../apollo/queries';

import {
	Col,
	Form,
	Input,
	InputGroup,
	InputGroupText,
	Label,
	Row,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';

import FormattedNumber from '../../../_common/FormattedNumber';
import { useQuery } from '@apollo/client';

const StolenMoneyCalculator = () => {
	const [stolenMoney, setStolenMoney] = useState(undefined);
	const [inventoryStolenMoney, setInventoryStolenMoney] = useState(null);

	const { data, error } = useQuery(queries.GET_AUTH_USER_PIGS_VOUCHERS);
	if (error) {
		console.error(error);
		alert('Unable to get your voucher count');
	}

	useEffect(() => {
		Api.getTycoonData()
			.then(response => {
				if (response.data.inventory.stolen_money) {
					if (stolenMoney === undefined) {
						setStolenMoney(response.data.inventory.stolen_money.amount);
					}
					setInventoryStolenMoney(response.data.inventory.stolen_money.amount);
				} else {
					setInventoryStolenMoney(0);
				}
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	function voucherWorth(playerTotalVouchers, voucherAmount) {
		var RankVouchers = Infinity;
		var rankWorth = 9000;
		// get how much to pay the person
		if (playerTotalVouchers < 6000) {
			// Hustler
			RankVouchers = 6000;
			rankWorth = 3500;
		} else if (playerTotalVouchers < 18000) {
			// Pickpocket
			RankVouchers = 18000;
			rankWorth = 4000;
		} else if (playerTotalVouchers < 38000) {
			// Thief
			RankVouchers = 38000;
			rankWorth = 5000;
		} else if (playerTotalVouchers < 68000) {
			// Lawless
			RankVouchers = 68000;
			rankWorth = 6000;
		} else if (playerTotalVouchers < 150000) {
			// Mastermind
			RankVouchers = 150000;
			rankWorth = 7000;
		} else if (playerTotalVouchers < 1500000) {
			// Overlord
			RankVouchers = 1500000;
			rankWorth = 8500;
		}

		if (playerTotalVouchers + voucherAmount >= RankVouchers) {
			// Rank up
			const NextRankVouchers = voucherWorth(
				playerTotalVouchers + RankVouchers - playerTotalVouchers,
				voucherAmount - (RankVouchers - playerTotalVouchers)
			);
			const CurrentRankVouchers =
				(RankVouchers - playerTotalVouchers) * rankWorth;
			return NextRankVouchers + CurrentRankVouchers;
		} else {
			// Don't rank up
			return voucherAmount * rankWorth;
		}
	}

	return (
		<Form>
			<Row>
				<Col>
					<Label>Vouchers</Label>
					<InputGroup>
						<Input
							type="number"
							placeholder="Vouchers"
							value={Math.ceil((3 * parseInt(stolenMoney)) / 400) || ''}
							onChange={ev =>
								setStolenMoney(
									Math.ceil((parseInt(ev.target.value) / 75) * 10000)
								)
							}
						/>
						<InputGroupText>
							<FormattedNumber
								num={Math.ceil((3 * parseInt(stolenMoney)) / 400)}
							/>
						</InputGroupText>
					</InputGroup>
				</Col>
				<Col>
					<Label>
						Stolen Money{' '}
						{inventoryStolenMoney && (
							<React.Fragment>
								(<FormattedNumber num={inventoryStolenMoney} /> detected)
							</React.Fragment>
						)}
					</Label>
					<InputGroup>
						<Input
							type="number"
							placeholder="Stolen Money"
							value={stolenMoney || ''}
							onChange={ev => setStolenMoney(parseInt(ev.target.value))}
						/>
						<InputGroupText>
							<FormattedNumber num={stolenMoney} />
						</InputGroupText>
					</InputGroup>
				</Col>
				<Col>
					<Label>Money</Label>
					<fieldset disabled>
						<InputGroup>
							<Input
								type="number"
								placeholder="Money"
								value={
									voucherWorth(
										data ? data.getAuthUserPigsVouchers.vouchers : 0,
										Math.ceil((3 * parseInt(stolenMoney)) / 400)
									) || ''
								}
								readOnly
							/>
							<InputGroupText>
								$
								<FormattedNumber
									num={voucherWorth(
										data ? data.getAuthUserPigsVouchers.vouchers : 0,
										Math.ceil((3 * parseInt(stolenMoney)) / 400)
									)}
								/>
							</InputGroupText>
						</InputGroup>
					</fieldset>
				</Col>
			</Row>
		</Form>
	);
};

export default StolenMoneyCalculator;
