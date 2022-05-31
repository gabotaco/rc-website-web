import * as Api from "../../../library/Api/api";

import {
	Col,
	Collapse,
	Container,
	Form,
	Input,
	Nav,
	NavItem,
	Navbar,
	NavbarToggler,
	Progress,
	Row
} from "reactstrap";
import React, { useEffect, useState } from "react";

import FilterableTables from "../../_common/FilterableTables";
import FormattedNumber from "../../_common/FormattedNumber";
import LoadingIcon from "../../_presentational/LoadingIcon";

const $ = require("jquery");

const HomeScreen = props => {
	const [collapsed, setCollapsed] = useState(false);
	const toggleNavbar = () => setCollapsed(!collapsed);

	const [company, setCompany] = useState(<LoadingIcon inline />);
	const [playerListLevel, setPlayerListLevel] = useState(
		<LoadingIcon inline />
	);
	const [job, setJob] = useState(<LoadingIcon inline />);
	const [health, setHealth] = useState(0);
	const [hunger, setHunger] = useState(0);
	const [thirst, setThirst] = useState(0);
	const [capacity, setCapacity] = useState(0);
	const [playerID, setPlayerID] = useState(props.game_id);
	const [premium, setPremium] = useState("LOADING");
	const [dxp, setDxp] = useState("LOADING");
	const [boost, setBoost] = useState("LOADING");
	const [bonus, setBonus] = useState("LOADING");
	const [linked, setLinked] = useState("LOADING");
	const [voice, setVoice] = useState("LOADING");

	const loadingSkill = skillName => (
		<Progress multi style={Style.skillBarContainer} className="my-1">
			<Progress
				bar
				value={0}
				min={0}
				max={100}
				style={{ backgroundColor: "#0063ca" }}
			>
				<span className="text-white font-weight-bold" style={Style.skillText}>
					{skillName} | Level <LoadingIcon inline sizeClass={"glimpsicon-16"} />{" "}
					/ <LoadingIcon inline sizeClass={"glimpsicon-16"} />{" "}
					<i>
						(<LoadingIcon inline sizeClass={"glimpsicon-16"} /> EXP)
					</i>
				</span>
			</Progress>
		</Progress>
	);
	const [business, setBusiness] = useState(loadingSkill("Business"));
	const [gambling, setGambling] = useState(loadingSkill("Gambling"));
	const [ems, setEms] = useState(loadingSkill("EMS"));
	const [fire, setFire] = useState(loadingSkill("Fire"));
	const [farming, setFarming] = useState(loadingSkill("Farming"));
	const [fishing, setFishing] = useState(loadingSkill("Fishing"));
	const [mining, setMining] = useState(loadingSkill("Mining"));
	const [hunting, setHunting] = useState(loadingSkill("Hunting"));
	const [strength, setStrength] = useState(loadingSkill("Strength"));
	const [cargo, setCargo] = useState(loadingSkill("Cargo Pilot"));
	const [heli, setHeli] = useState(loadingSkill("Helicopter Pilot"));
	const [airline, setAirline] = useState(loadingSkill("Airline Pilot"));
	const [player, setPlayer] = useState(loadingSkill("Player"));
	const [racing, setRacing] = useState(loadingSkill("Racing"));
	const [bus, setBus] = useState(loadingSkill("Bus Driver"));
	const [conductor, setConductor] = useState(loadingSkill("Conductor"));
	const [garbage, setGarbage] = useState(loadingSkill("Garbage Collections"));
	const [mechanic, setMechanic] = useState(loadingSkill("Mechanic"));
	const [postOp, setPostOp] = useState(loadingSkill("PostOP"));
	const [trucking, setTrucking] = useState(loadingSkill("Trucking"));
	const [completionist, setCompletionist] = useState(
		loadingSkill("Completionist")
	);

	const [inventory, setInventory] = useState(<LoadingIcon />);

	function getVisible() {
		if (window.innerWidth <= 1199.98) {
			document.getElementById("left-nav").style.top = "0px";
			return;
		}
		var $el = $("#navbar"),
			scrollTop = $(this).scrollTop(),
			scrollBot = scrollTop + $(this).height(),
			elTop = $el.offset().top,
			elBottom = elTop + $el.outerHeight(),
			visibleTop = elTop < scrollTop ? scrollTop : elTop,
			visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;

		if (visibleBottom - visibleTop < 0) {
			document.getElementById("left-nav").style.top = "0px";
		} else {
			document.getElementById("left-nav").style.top =
				visibleBottom - visibleTop + "px";
		}
	}

	function timeConverter(UNIX_timestamp) {
		var a = new Date(UNIX_timestamp * 1000);
		var months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		if (sec.length == 1) sec = "0" + sec;
		var time =
			date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
		return time;
	}

	function hasCooldown(val) {
		if (val >= 1) {
			if (val > Math.round(new Date().getTime() / 1000)) {
				return timeConverter(val);
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function calculateLevel(currentLevelExp) {
		return Math.floor((Math.sqrt(1 + (8 * currentLevelExp) / 5) - 1) / 2);
	}

	function getJob(data) {
		if (data.trucker_commercial && data.trucker) {
			return "Trucker Commercial";
		} else if (data.trucker_military && data.trucker) {
			return "Trucker Military";
		} else if (data.trucker_refridgerated && data.trucker) {
			return "Trucker Refridgerated";
		} else if (data.beachcleanup) {
			return "Beach Clean Up";
		} else if (data.trucker_liberty && data.trucker) {
			return "Trucker Liberty";
		} else if (data.busdriver) {
			return "Bus Driver";
		} else if (data.helicopterpilot) {
			return "Helicopter Pilot";
		} else if (data.cargopilot) {
			return "Cargo Pilot";
		} else if (data.pilot) {
			return "Airline Pilot";
		} else if (data.leasurepilot) {
			return "Leisure Pilot";
		} else if (data.hunter) {
			return "Wildlife Hunter";
		} else if (data.mechanic) {
			return "Mechanic";
		} else if (data.conductor) {
			return "Train Conductor";
		} else if (data.emergency) {
			return "EMS / Paramedic";
		} else if (data.miner) {
			return "Miner";
		} else if (data.garbage) {
			return "Garbage Collector";
		} else if (data.farmer) {
			return "Farmer";
		} else if (data.fisher) {
			return "Fisherman";
		} else if (data.delivery_ups) {
			return "UPS Delivery";
		} else if (data.postop) {
			return "PostOP Emplyee";
		} else if (data.racer) {
			return "Street Racer";
		} else if (data.dockhandler) {
			return "Dock Handler";
		} else if (data.delivery_transformer) {
			return "Transformer Repair";
		} else if (data.delivery_server) {
			return "Server Repair";
		} else if (data.firefighter) {
			return "Firefighter";
		} else if (data.citizen) {
			return "Unemployed";
		} else if (data.rts_professional) {
			return "R.T.S. Professional";
		} else if (data.rts_aviator) {
			return "R.T.S. Aviator";
		} else if (data.rts_job) {
			return "R.T.S. Employee";
		} else if (data.pigs_job) {
			return "Pigs Employee";
		} else if (data.frllc_paramedic) {
			return "F.R.LLC Paramedic";
		} else if (data.collinsco_cabbie_job) {
			return "CollinsCo Cabbies";
		} else if (data.collinsco_train_job) {
			return "CollinsCo Trainy Boi";
		} else if (data.collinsco_metro_job) {
			return "CollinsCo Metro";
		} else if (data.bat_trucker) {
			return "BAT Trucker";
		} else {
			return "None";
		}
	}

	let data = [];
	for (let i = 0; i <= 2000; i++) {
		if (i > 0) {
			data.push(data[i - 1] + i * 5);
		} else {
			data.push(0);
		}
	}
	function levelPercentage(g_Exp) {
		for (var i = 0; i < data.length; i++) {
			if (parseInt(data[i]) > g_Exp) {
				return ((g_Exp - data[i - 1]) / (data[i] - data[i - 1])) * 100;
			}
		}
	}

	useStyles(Style.raw);

	function getData(gameId) {
		setPlayerID(gameId);
		Api.getTycoonData(gameId)
			.then(response => {
				let hasPremium = false;
				if (
					response.data.groups.license_premium || // Brought in-game
					response.data.groups.license_patreon_premium || // Brought via Patreon
					response.data.groups.license_premium_p2w // Brought via Tebex
				) {
					hasPremium = true;
				}

				if (!response.data.gaptitudes)
					response.data.gaptitudes = {
						trucking: {
							garbage: 10,
							postop: 10,
							mechanic: 10,
							trucking: 10
						},
						ems: {
							fire: 10,
							ems: 10
						},
						casino: {
							casino: 10
						},
						hunting: {
							skill: 10
						},
						train: {
							bus: 10,
							train: 10
						},
						piloting: {
							cargo: 10,
							cargos: 10,
							heli: 10,
							piloting: 10
						},
						physical: {
							strength: 10
						},
						farming: {
							fishing: 10,
							farming: 10,
							mining: 10
						},
						police: {
							police: 10
						},
						business: {
							business: 10,
							faction: 10
						},
						player: {
							racing: 10,
							player: 10
						}
					};
				if (!response.data.gaptitudes_v)
					response.data.gaptitudes_v = response.data.gaptitudes;

				const companys = {
					corp11: "PIGS",
					corp2: "CoCo",
					corp6: "IA",
					corp9: "RTS"
				};
				const groups = JSON.stringify(response.data.groups);
				let company = false;
				for (let i = 0; i < Object.keys(companys).length; i++) {
					if (groups.includes(Object.keys(companys)[i])) {
						company = companys[Object.keys(companys)[i]];
						break;
					}
				}

				if (company) {
					setCompany(company);
				} else {
					if (
						response.data.licenses &&
						hasCooldown(response.data.licenses.corp_cooldown)
					) {
						setCompany(hasCooldown(response.data.licenses.corp_cooldown));
					} else {
						setCompany("None");
					}
				}

				const overallXp =
					parseFloat(response.data.gaptitudes.physical.strength || 10) +
					parseFloat(response.data.gaptitudes.piloting.piloting || 10) +
					parseFloat(response.data.gaptitudes.train.bus || 10) +
					parseFloat(response.data.gaptitudes.business.business || 10) +
					parseFloat(response.data.gaptitudes.piloting.cargos || 10) +
					parseFloat(response.data.gaptitudes.train.train || 10) +
					parseFloat(response.data.gaptitudes.ems.ems || 10) +
					parseFloat(response.data.gaptitudes.ems.fire || 10) +
					parseFloat(response.data.gaptitudes.farming.farming || 10) +
					parseFloat(response.data.gaptitudes.farming.fishing || 10) +
					parseFloat(response.data.gaptitudes.casino.casino || 10) +
					parseFloat(response.data.gaptitudes.trucking.garbage || 10) +
					parseFloat(response.data.gaptitudes.piloting.heli || 10) +
					parseFloat(response.data.gaptitudes.hunting.skill || 10) +
					parseFloat(response.data.gaptitudes.trucking.mechanic || 10) +
					parseFloat(response.data.gaptitudes.farming.mining || 10) +
					parseFloat(response.data.gaptitudes.player.player || 10) +
					parseFloat(response.data.gaptitudes.trucking.postop || 10) +
					parseFloat(response.data.gaptitudes.player.racing || 10) +
					parseFloat(response.data.gaptitudes.trucking.trucking || 10);
				const playerLevel = calculateLevel(overallXp);
				setPlayerListLevel(<FormattedNumber num={playerLevel} />);

				setJob(getJob(response.data.groups));

				setHealth(parseFloat(response.data.health - 100).toFixed(2));
				setHunger(parseFloat(response.data.hunger).toFixed(2));
				setThirst(parseFloat(response.data.thirst).toFixed(2));

				let storageUsed = 0;
				let capacity =
					calculateLevel(response.data.gaptitudes.physical.strength) * 10;
				if (hasPremium) {
					capacity *= 1.15;
				}
				capacity = Math.ceil(capacity);

				Object.keys(response.data.inventory).forEach(key => {
					const item = response.data.inventory[key];
					storageUsed += Math.floor(item.weight * item.amount * 100) / 100;
				});

				setCapacity(storageUsed / capacity || 0);
				setPremium(hasPremium);
				setDxp(response.data.licenses && !!response.data.licenses.exp_week);
				setBoost(response.data.licenses && !!response.data.licenses.exp_15);
				setBonus(
					response.data.licenses && !!response.data.licenses.faq_bonus_exp_5
				);
				setLinked(
					response.data.licenses && !!response.data.groups.discord_linked
				);
				setVoice(
					response.data.licenses && !!response.data.licenses.discord_voice
				);

				setBusiness(
					addSkill(
						response.data.gaptitudes_v.business.business,
						100,
						"Business"
					)
				);
				setGambling(
					addSkill(response.data.gaptitudes_v.casino.casino, 100, "Gambling")
				);
				setEms(addSkill(response.data.gaptitudes_v.ems.ems, 100, "EMS"));
				setFire(addSkill(response.data.gaptitudes_v.ems.fire, 100, "Fire"));
				setFarming(
					addSkill(response.data.gaptitudes_v.farming.farming, 100, "Farming")
				);
				setFishing(
					addSkill(response.data.gaptitudes_v.farming.fishing, 100, "Fishing")
				);
				setMining(
					addSkill(response.data.gaptitudes_v.farming.mining, 100, "Mining")
				);
				setHunting(
					addSkill(response.data.gaptitudes_v.hunting.skill, 100, "Hunting")
				);
				setStrength(
					addSkill(response.data.gaptitudes_v.physical.strength, 30, "Strength")
				);
				setCargo(
					addSkill(
						response.data.gaptitudes_v.piloting.cargos,
						100,
						"Cargo Pilot"
					)
				);
				setHeli(
					addSkill(
						response.data.gaptitudes_v.piloting.heli,
						100,
						"Helicopter Pilot"
					)
				);
				setAirline(
					addSkill(
						response.data.gaptitudes_v.piloting.piloting,
						100,
						"Airline Pilot"
					)
				);
				setPlayer(
					addSkill(response.data.gaptitudes_v.player.player, 100, "Player")
				);
				setRacing(
					addSkill(response.data.gaptitudes_v.player.racing, 100, "Racing")
				);
				setBus(
					addSkill(response.data.gaptitudes_v.train.bus, 100, "Bus Driver")
				);
				setConductor(
					addSkill(response.data.gaptitudes_v.train.train, 100, "Conductor")
				);
				setGarbage(
					addSkill(
						response.data.gaptitudes_v.trucking.garbage,
						100,
						"Garbage Collections"
					)
				);
				setMechanic(
					addSkill(
						response.data.gaptitudes_v.trucking.mechanic,
						100,
						"Mechanic"
					)
				);
				setPostOp(
					addSkill(response.data.gaptitudes_v.trucking.postop, 100, "PostOP")
				);
				setTrucking(
					addSkill(
						response.data.gaptitudes_v.trucking.trucking,
						100,
						"Trucking"
					)
				);
				const totalLevels =
					calculateLevel(response.data.gaptitudes.physical.strength || 10) +
					calculateLevel(response.data.gaptitudes.piloting.piloting || 10) +
					calculateLevel(response.data.gaptitudes.train.bus || 10) +
					calculateLevel(response.data.gaptitudes.business.business || 10) +
					calculateLevel(response.data.gaptitudes.piloting.cargos || 10) +
					calculateLevel(response.data.gaptitudes.train.train || 10) +
					calculateLevel(response.data.gaptitudes.ems.ems || 10) +
					calculateLevel(response.data.gaptitudes.ems.fire || 10) +
					calculateLevel(response.data.gaptitudes.farming.farming || 10) +
					calculateLevel(response.data.gaptitudes.farming.fishing || 10) +
					calculateLevel(response.data.gaptitudes.casino.casino || 10) +
					calculateLevel(response.data.gaptitudes.trucking.garbage || 10) +
					calculateLevel(response.data.gaptitudes.piloting.heli || 10) +
					calculateLevel(response.data.gaptitudes.hunting.skill || 10) +
					calculateLevel(response.data.gaptitudes.trucking.mechanic || 10) +
					calculateLevel(response.data.gaptitudes.farming.mining || 10) +
					calculateLevel(response.data.gaptitudes.player.player || 10) +
					calculateLevel(response.data.gaptitudes.trucking.postop || 10) +
					calculateLevel(response.data.gaptitudes.player.racing || 10) +
					calculateLevel(response.data.gaptitudes.trucking.trucking || 10);
				setCompletionist(addSkill(totalLevels, 1930, "Completionist"));

				Api.getBackpack(gameId)
					.then(res => {
						if (!res.data) res.data = {};

						const both = $.extend(true, {}, response.data.inventory);

						Object.keys(res.data).forEach(key => {
							if (both[key]) both[key].amount += res.data[key].amount;
							else both[key] = res.data[key];
						});

						const formatters = {
							inventory: (key, i) => {
								const item = response.data.inventory[key];
								return (
									<tr key={i}>
										<td dangerouslySetInnerHTML={{ __html: item.name }}></td>
										<td>
											<FormattedNumber num={item.amount} />
										</td>
										<td>
											<FormattedNumber
												num={Math.floor(item.weight * item.amount * 100) / 100}
											/>
										</td>
									</tr>
								);
							},
							backpack: (key, i) => {
								const item = res.data[key];
								return (
									<tr key={i}>
										<td dangerouslySetInnerHTML={{ __html: key }}></td>
										<td>
											<FormattedNumber num={item.amount} />
										</td>
										<td>
											<FormattedNumber
												num={Math.floor(item.weight * item.amount * 100) / 100}
											/>
										</td>
									</tr>
								);
							},
							both: (key, i) => {
								const item = both[key];
								return (
									<tr key={i}>
										<td
											dangerouslySetInnerHTML={{ __html: item.name || key }}
										></td>
										<td>
											<FormattedNumber num={item.amount} />
										</td>
										<td>
											<FormattedNumber
												num={Math.floor(item.weight * item.amount * 100) / 100}
											/>
										</td>
									</tr>
								);
							}
						};

						setInventory(
							<FilterableTables
								filters={["Inventory", "Backpack", "Both"]}
								tables={[
									{
										filter: "Inventory",
										headers: headers.inventory,
										data: Object.keys(response.data.inventory),
										formatter: formatters.inventory,
										config: config.inventory
									},
									{
										filter: "Backpack",
										headers: headers.backpack,
										data: Object.keys(res.data),
										formatter: formatters.backpack,
										config: config.backpack
									},
									{
										filter: "Both",
										headers: headers.both,
										data: Object.keys(both),
										formatter: formatters.both,
										config: config.both
									}
								]}
							/>
						);
					})
					.catch(err => {
						console.error(err);
						if (err.error === "Tycoon Servers Offline") {
							alert(
								"Unable to get your backpack because the Tycoon servers are offline. Please try again later."
							);
						} else {
							alert("There was an error getting your backpack");
						}
					});
			})
			.catch(err => {
				console.error(err);
				if (err.error === "Tycoon Servers Offline") {
					alert(
						"Unable to get your data because the Tycoon servers are offline. Please try again later."
					);
				} else {
					alert("There was an error getting their tycoon data");
				}
			});
	}

	useEffect(() => {
		if (props.game_id.length > 11) {
			Api.getInGameId(props.game_id)
				.then(response => {
					getData(response.user_id);
				})
				.catch(err => {
					console.error(err);
					if (err.error === "Tycoon Servers Offline") {
						alert(
							"Unable to get their in game ID because the Tycoon servers are offline. Please try again later."
						);
					} else {
						alert("Unable to get their in game ID");
					}
				});
		} else {
			getData(props.game_id);
		}

		getVisible();
		$(window).on("scroll resize", getVisible);
		document.onresize = function () {
			getVisible();
		};
	}, []);

	function addSkill(xp, maxLevel, skillName) {
		if (!xp) xp = 10;
		xp = Math.round(xp);
		if (skillName != "Completionist") {
			var currentLevel = calculateLevel(xp);
			var lvlPercent = levelPercentage(xp);
		} else {
			var currentLevel = xp;
			var lvlPercent = (currentLevel / maxLevel) * 100;
		}

		return (
			<Progress multi style={Style.skillBarContainer} className="my-1">
				<Progress
					bar
					value={currentLevel >= maxLevel ? 100 : lvlPercent}
					min={0}
					max={100}
					style={{
						backgroundColor: currentLevel >= maxLevel ? "#b39700" : "#0063ca"
					}}
				>
					<span className="text-white font-weight-bold" style={Style.skillText}>
						{skillName} | Level <FormattedNumber num={currentLevel} /> /{" "}
						<FormattedNumber num={maxLevel} />{" "}
						<i>
							(<FormattedNumber num={xp} /> EXP)
						</i>
					</span>
				</Progress>
			</Progress>
		);
	}

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
						id="left-nav"
					>
						<NavbarToggler onClick={toggleNavbar} />
						<Collapse navbar isOpen={!collapsed}>
							<Nav navbar>
								<NavItem>
									<Form inline className="my-2 my-lg-0">
										<Input
											className="mr-sm-2"
											type="search"
											placeholder="In Game ID or Discord ID"
											name="id"
											data-do-enter
										/>
									</Form>
								</NavItem>
								<NavItem>
									<h4 className="my-4">Player ID: {playerID}</h4>
								</NavItem>
								<NavItem>
									<p>Company: {company}</p>
								</NavItem>
								<NavItem>
									<p>Playerlist Level: {playerListLevel}</p>
								</NavItem>
								<NavItem>
									<p>Job: {job}</p>
									<hr className="my-2" />
								</NavItem>
								<NavItem>
									<p style={Style.statHeader}>Health:</p>
									<Progress multi style={Style.healthBarContainer}>
										<Progress
											bar
											value={health}
											min={0}
											max={100}
											style={Style.healthBar}
										/>
									</Progress>
									<hr className="my-2" />
								</NavItem>
								{/* <NavItem>
                                    <p style={Style.statHeader}>Hunger:</p>
                                    <Progress multi style={Style.hungerBarContainer}>
                                        <Progress bar value={hunger} min={0} max={100} style={Style.hungerBar} />
                                    </Progress>
                                </NavItem>
                                <NavItem>
                                    <p style={Style.statHeader}>Thirst:</p>
                                    <Progress multi style={Style.thirstBarContainer}>
                                        <Progress bar value={thirst} min={0} max={100} style={Style.thirstBar} />
                                    </Progress>
                                    <hr className="my-2" />
                                </NavItem> */}
								<NavItem>
									<p style={Style.statHeader}>Player Inventory Capacity:</p>
									<Progress multi style={Style.capacityBarContainer}>
										<Progress
											bar
											value={capacity}
											min={0}
											max={100}
											style={Style.capacityBar}
										/>
									</Progress>
									<hr className="my-2" />
								</NavItem>
								<NavItem>
									<h5 className="text-center">XP Bonuses</h5>
								</NavItem>
								<NavItem>
									<p>
										Premium:{" "}
										<span
											className={
												premium === "LOADING"
													? null
													: premium
													? "text-success"
													: "text-danger"
											}
										>
											{premium === "LOADING" ? (
												<LoadingIcon inline />
											) : premium ? (
												"Yes"
											) : (
												"No"
											)}
										</span>
									</p>
								</NavItem>
								<NavItem>
									<p>
										Double XP:{" "}
										<span
											className={
												dxp === "LOADING"
													? null
													: dxp
													? "text-success"
													: "text-danger"
											}
										>
											{dxp === "LOADING" ? (
												<LoadingIcon inline />
											) : dxp ? (
												"Yes"
											) : (
												"No"
											)}
										</span>
									</p>
								</NavItem>
								<NavItem>
									<p>
										15% Boost:{" "}
										<span
											className={
												boost === "LOADING"
													? null
													: boost
													? "text-success"
													: "text-danger"
											}
										>
											{boost === "LOADING" ? (
												<LoadingIcon inline />
											) : boost ? (
												"Yes"
											) : (
												"No"
											)}
										</span>
									</p>
								</NavItem>
								<NavItem>
									<p>
										Faction Bonus:{" "}
										<span
											className={
												bonus === "LOADING"
													? null
													: bonus
													? "text-success"
													: "text-danger"
											}
										>
											{bonus === "LOADING" ? (
												<LoadingIcon inline />
											) : bonus ? (
												"Yes"
											) : (
												"No"
											)}
										</span>
									</p>
								</NavItem>
								<NavItem>
									<p>
										Discord Linked:{" "}
										<span
											className={
												linked === "LOADING"
													? null
													: linked
													? "text-success"
													: "text-danger"
											}
										>
											{linked === "LOADING" ? (
												<LoadingIcon inline />
											) : linked ? (
												"Yes"
											) : (
												"No"
											)}
										</span>
									</p>
								</NavItem>
								<NavItem>
									<p>
										Discord Voice:{" "}
										<span
											className={
												voice === "LOADING"
													? null
													: voice
													? "text-success"
													: "text-danger"
											}
										>
											{voice === "LOADING" ? (
												<LoadingIcon inline />
											) : voice ? (
												"Yes"
											) : (
												"No"
											)}
										</span>
									</p>
								</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</Col>
				<Col xl="10" style={Style.rightColumn}>
					<h1 className="text-center">Skills</h1>

					<h4>Business Level:</h4>
					{business}
					<h4>Casino:</h4>
					{gambling}
					<h4>Emergency Levels:</h4>
					{ems}
					{fire}
					<h4>Gathering Industries:</h4>
					{farming}
					{fishing}
					{mining}
					<h4>Hunting:</h4>
					{hunting}
					<h4>Physical:</h4>
					{strength}
					<h4>Piloting:</h4>
					{cargo}
					{heli}
					{airline}
					<h4>Player Level:</h4>
					{player}
					{racing}
					<h4>Public Transportation:</h4>
					{bus}
					{conductor}
					<h4>Trucking:</h4>
					{garbage}
					{mechanic}
					{postOp}
					{trucking}
					<h4>Path to Completionist:</h4>
					{completionist}

					<h1 className="text-center">Inventory</h1>
					{inventory}
					<small>
						Auto-populated values will only refresh once per every 2 minutes
					</small>
				</Col>
			</Row>
		</Container>
	);
};

export default HomeScreen;

const Style = {
	raw: `
    .progress {
        position: relative;
    }

    .progress span {
        position: absolute;
        display: block;
        width: 100%;
        color: black;
    }
    `,
	container: {
		marginLeft: "0px",
		paddingLeft: "0px"
	},
	leftColumn: {
		paddingLeft: "0px"
	},
	rightColumn: {
		paddingLeft: "35px"
	},
	navbar: {
		backgroundColor: "#2e2e2e",
		maxHeight: "100vh"
	},
	statHeader: {
		marginBottom: "2px"
	},
	healthBarContainer: {
		backgroundColor: "#265325",
		marginBottom: "1rem"
	},
	healthBar: {
		backgroundColor: "#4d904d"
	},
	hungerBarContainer: {
		backgroundColor: "#64370a",
		marginBottom: "1rem"
	},
	hungerBar: {
		backgroundColor: "#a15d1a"
	},
	thirstBarContainer: {
		backgroundColor: "#302c91",
		marginBottom: "1rem"
	},
	thirstBar: {
		backgroundColor: "#4848e1"
	},
	capacityBarContainer: {
		backgroundColor: "#9c600c",
		marginBottom: "1rem"
	},
	capacityBar: {
		backgroundColor: "#fca503"
	},
	skillBarContainer: {
		height: "1.5rem",
		backgroundColor: "#00264d"
	},
	skillText: {
		fontSize: "1.2rem",
		fontWeight: 900
	}
};

function useStyles(body) {
	useEffect(() => {
		const style = document.createElement("style");
		style.innerHTML = body;

		document.body.appendChild(style);

		return () => {
			document.body.removeChild(style);
		};
	}, [body]);
}

const config = {
	inventory: {
		id: "inventory-item-table",
		jquery: {
			language: {
				emptyTable: "There are no items in inventory."
			},
			order: [[1, "desc"]]
		}
	},
	backpack: {
		id: "backpack-item-table",
		jquery: {
			language: {
				emptyTable: "There are no items in backpack."
			},
			order: [[1, "desc"]]
		}
	},
	both: {
		id: "both-item-table",
		jquery: {
			language: {
				emptyTable: "There are no items in inventory."
			},
			order: [[1, "desc"]]
		}
	}
};

const headers = {
	inventory: ["Item Name", "Item Quantity", "Item Total Weight (in kg)"],
	backpack: ["Item Name", "Item Quantity", "Item Total Weight (in kg)"],
	both: ["Item Name", "Item Quantity", "Item Total Weight (in kg)"]
};
