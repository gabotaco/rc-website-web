import * as Api from '../../../library/Api/api';

import {
	Col,
	Collapse,
	Container,
	Form,
	Input,
	InputGroup,
	InputGroupText,
	Nav,
	NavItem,
	Navbar,
	NavbarToggler,
	Row,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';

import CustomTable from '../../_common/CustomTable';
import FormattedNumber from '../../_common/FormattedNumber';
import LoadingIcon from '../../_presentational/LoadingIcon';
import $ from 'jquery';
const businesses = require('./businesses.json');

const BizHomeScreen = props => {
	const [collapsed, setCollapsed] = useState(false);
	const toggleNavbar = () => setCollapsed(!collapsed);

	const [bizLevel, setBizLevel] = useState(
		<LoadingIcon inline sizeClass={'glimpsicon-16'} />
	);
	const [factionTax, setFactionTax] = useState(null);
	const [totalBonus, setSumTotalBonus] = useState('LOADING');
	const [totalInvestment, setSumTotalInvestment] = useState('LOADING');
	const [businessTable, setBusinessTable] = useState(<LoadingIcon />);

	function getVisible() {
		if (window.innerWidth <= 1199.98) {
			document.getElementById('left-nav').style.top = '0px';
			return;
		}
		if (!document.getElementById('navbar')) {
			return setTimeout(() => {
				getVisible();
			}, 1);
		}
		const $el = $('#navbar');
		const scrollTop = $(this).scrollTop();
		const scrollBot = scrollTop + $(this).height();
		const elTop = $el.offset().top;
		const elBottom = elTop + $el.outerHeight();
		const visibleTop = elTop < scrollTop ? scrollTop : elTop;
		const visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;

		if (visibleBottom - visibleTop < 0) {
			document.getElementById('left-nav').style.top = '0px';
		} else {
			document.getElementById('left-nav').style.top =
				visibleBottom - visibleTop + 'px';
		}
	}

	function calculateLevel(currentLevelExp) {
		return Math.floor((Math.sqrt(1 + (8 * currentLevelExp) / 5) - 1) / 2);
	}

	useEffect(() => {
		Api.getTycoonData(props.game_id)
			.then(response => {
				if (response.error) {
					setBizLevel('None');
					return;
				}

				if (!response.data.gaptitudes_v)
					response.data.gaptitudes_v = response.data.gaptitudes;

				setBizLevel(
					calculateLevel(response.data.gaptitudes_v.business.business)
				);
			})
			.catch(err => {
				console.error(err);
			});

		Api.getTycoonBiz(props.game_id)
			.then(response => {
				if (response.error) {
					setSumTotalBonus('ERROR');
					setSumTotalInvestment('ERROR');
					setBusinessTable(null);
					return;
				}

				let sumTotalBonus = 0;
				let sumTotalInvestment = 0;

				businesses.forEach(business => {
					const businessTier = response.businesses[business.id] || 0;
					const totalBonus =
						businessTier > 0
							? Math.floor(
									business.bonus + business.bonus * (businessTier - 1) * 0.25
							  )
							: 0;

					sumTotalBonus += totalBonus;

					sumTotalInvestment += businessTier * business.cost;
				});
				setSumTotalBonus(sumTotalBonus);
				setSumTotalInvestment(sumTotalInvestment);

				const formatter = (business, i) => {
					const businessTier = response.businesses[business.id] || 0;
					const totalBonus =
						businessTier > 0
							? Math.floor(
									business.bonus + business.bonus * (businessTier - 1) * 0.25
							  )
							: 0;

					return (
						<tr key={i}>
							<td>{business.visuallvl}</td>
							<td>{business.name}</td>
							<td>{businessTier}</td>
							<td>
								$<FormattedNumber num={business.cost} />
							</td>
							<td>
								$<FormattedNumber num={business.bonus} />
							</td>
							<td>
								$<FormattedNumber num={totalBonus} />
							</td>
							<td>
								$<FormattedNumber num={businessTier * business.cost} />
							</td>
							<td>
								$<FormattedNumber num={(100 - businessTier) * business.cost} />
							</td>
							<td>
								<a
									className="btn btn-info"
									href={`/home/ttools/biz/map/?biz=${business.id}`}
									target="_blank"
									rel="noopener noreferrer">
									Go
								</a>
							</td>
						</tr>
					);
				};
				setBusinessTable(
					<CustomTable
						config={config}
						headers={headers}
						data={businesses}
						format={formatter}
					/>
				);
			})
			.catch(err => {
				console.error(err);
				if (err.error === 'Tycoon Servers Offline') {
					alert(
						'Unable to get your data because the Tycoon servers are offline. Please try again later.'
					);
				} else {
					alert('There was an error getting their tycoon businesses');
				}
			});

		getVisible();
		$(window).on('scroll resize', getVisible);
		document.onresize = function () {
			getVisible();
		};
	}, []);

	return (
		<Container fluid style={Style.container}>
			<Row>
				<Col md="2" style={Style.leftColumn}>
					<Navbar
						expand="xl"
						dark
						fixed="left"
						className="overflow-auto"
						style={Style.navbar}
						id="left-nav">
						<NavbarToggler onClick={toggleNavbar} />
						<Collapse navbar isOpen={!collapsed}>
							<Nav navbar vertical>
								<h3>Business Info</h3>
								<NavItem>
									<p>
										Business Level:{' '}
										<span className="font-weight-bold">{bizLevel}</span>
									</p>
								</NavItem>
								<NavItem>
									{props.ttperm >= 1 && (
										<Form inline className="my-2 my-lg-0">
											<Input
												className="mr-sm-2"
												type="search"
												placeholder="In Game ID"
												name="id"
												data-do-enter
											/>
										</Form>
									)}
								</NavItem>
								<NavItem>
									<h4 className="my-4">Player ID: {props.game_id}</h4>
								</NavItem>
								<NavItem>
									<InputGroup className="mb-2">
										<Input
											type="number"
											min="0"
											max="100"
											placeholder="Faction tax"
											value={factionTax || ''}
											onChange={ev => setFactionTax(parseInt(ev.target.value))}
										/>
										<InputGroupText>%</InputGroupText>
									</InputGroup>
								</NavItem>
								<NavItem>
									<p className="small">Total Bonus per 24h:</p>
									<p>
										Manually:{' '}
										{totalBonus === 'LOADING' ? (
											<LoadingIcon inline sizeClass={'glimpsicon-16'} />
										) : totalBonus === 'ERROR' ? (
											'None'
										) : (
											<React.Fragment>
												$
												<FormattedNumber
													num={(
														totalBonus *
														((100 - (factionTax || 0)) / 100)
													).toFixed(2)}
												/>
											</React.Fragment>
										)}
									</p>
								</NavItem>
								<NavItem>
									<p>
										Business Collector:{' '}
										{totalBonus === 'LOADING' ? (
											<LoadingIcon inline sizeClass={'glimpsicon-16'} />
										) : totalBonus === 'ERROR' ? (
											'None'
										) : (
											<React.Fragment>
												$
												<FormattedNumber
													num={(
														Math.floor(totalBonus * 0.8) *
														((100 - (factionTax || 0)) / 100)
													).toFixed(2)}
												/>
											</React.Fragment>
										)}
									</p>
								</NavItem>
								<NavItem>
									<p>
										Total Investment:{' '}
										{totalInvestment === 'LOADING' ? (
											<LoadingIcon inline sizeClass={'glimpsicon-16'} />
										) : totalInvestment === 'ERROR' ? (
											'None'
										) : (
											<React.Fragment>
												$<FormattedNumber num={totalInvestment} />
											</React.Fragment>
										)}
									</p>
								</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</Col>
				<Col xl="10" style={Style.rightColumn}>
					<h1 className="text-center">Businesses</h1>
					{businessTable}
					<small>
						Auto-populated values will only refresh once per every 2 minutes
					</small>
				</Col>
			</Row>
		</Container>
	);
};

export default BizHomeScreen;

const Style = {
	container: {
		marginLeft: '0px',
		paddingLeft: '0px',
	},
	leftColumn: {
		paddingLeft: '0px',
	},
	rightColumn: {
		paddingLeft: '35px',
	},
	navbar: {
		backgroundColor: '#2e2e2e',
		maxHeight: '100vh',
	},
};

const config = {
	id: 'business-table',
	jquery: {
		order: [[3, 'asc']],
	},
};

const headers = [
	'Required Level',
	'Business Name',
	'Tier',
	'Cost',
	'Bonus (per 24h)',
	'Total Bonus',
	'Total Spent',
	'Remaining cost for T100',
	'Location',
];
