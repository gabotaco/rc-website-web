import React, { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import SmoothScroll from '../_presentational/SmoothScroll';
const Images = {
	PigsHeist: require('../../assets/img/bg/pigsheist.png'),
};

const PIGSScreen = () => {
	const [showVideo, setShowVideo] = useState(false);
	const PIGSDiscord = () => window.open('https://discord.gg/FXNyJfQ');
	const Handbook = () =>
		window.open(
			'https://docs.google.com/document/d/1NTAP7AkkNBiQehwCn8A-OTAExUVsIUbpXjNXAYmGmsk/edit'
		);

	const videoId = '6Zqu8q7p9hc';

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowVideo(true);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<NavigationBar />
			<SmoothScroll>
				<div>
					<div
						className="jumbotron jumbotron-fluid p-0 m-0"
						style={{
							height: '100vh',
							display: 'contents',
						}}>
						<iframe
							title="PIGS Video"
							id="ytplayer"
							type="text/html"
							src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`}
							width={window.innerWidth}
							height={window.innerHeight}
							frameBorder="0"
							style={{
								position: 'absolute',
							}}
						/>
						<div
							className="jumbotron jumbotron-fluid d-flex align-items-center m-0"
							style={{
								backgroundImage: showVideo
									? 'none'
									: `url("https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg")`,
								backgroundSize: 'cover',
								backgroundColor: 'rgba(0, 0, 0, 0.05)',
								position: 'relative',
								height: '100vh',
							}}
						/>
					</div>
				</div>

				<div
					className="jumbotron jumbotron-fluid p-4 m-0"
					style={{
						backgroundColor: '#000000',
					}}>
					<div
						className="row d-flex justify-content-center"
						style={{
							justifyContent: 'space-around',
						}}>
						<div className="col-6 col-lg-3 p-4">
							<img
								src={require('../../assets/img/pigs/heist-deadguards.jpg')}
								className="img-fluid"
								alt="Pool of dead guards"
							/>
						</div>
						<div className="col-6 col-lg-3 p-4">
							<img
								src={require('../../assets/img/pigs/heist-ammunation-dead.jpg')}
								className="img-fluid"
								alt="Amuniation store"
							/>
						</div>
						<div className="col-6 col-lg-3 p-4">
							<img
								src={require('../../assets/img/pigs/heist-ammunation-explodingcars.jpg')}
								className="img-fluid"
								alt="Two exploding cars"
							/>
						</div>
						<div className="col-6 col-lg-3 p-4">
							<img
								src={require('../../assets/img/pigs/heist-ammunation-ambulance.jpg')}
								className="img-fluid"
								alt="Ambulance at Ammuniation store"
							/>
						</div>
						<div className="col-6 col-lg-3 p-4">
							<img
								src={require('../../assets/img/pigs/heist-pacificstandard.png')}
								className="img-fluid"
								alt="Pafcic Standard Bank"
							/>
						</div>
						<div className="col-6 col-lg-3 p-4">
							<img
								src={require('../../assets/img/pigs/heist-slaughterhouse.png')}
								className="img-fluid"
								alt="Shooting from Slaughterhouse"
							/>
						</div>
						<div className="col-6 col-lg-3 p-4">
							<img
								src={require('../../assets/img/pigs/heist-ammunation.png')}
								className="img-fluid"
								alt="Ready to rob the ammuniation store"
							/>
						</div>
						<div className="col-6 col-lg-3 p-4">
							<img
								src={require('../../assets/img/pigs/heist-humane.png')}
								className="img-fluid"
								alt="Shooting from Humane Labs"
							/>
						</div>
					</div>
				</div>
				<div>
					<div
						className="jumbotron jumbotron-fluid m-0 p-5"
						style={{
							backgroundColor: '#000000',
						}}>
						<div className="container d-flex align-items-center">
							<div className="row">
								<div className="col-12 col-md-6 col-lg-8">
									<img
										src={require('../../assets/img/pigs/humvee.png')}
										className="img-fluid"
										alt="PIGS Humvee"
									/>
								</div>
								<div className="col-12 col-md-6 col-lg-4">
									<h2
										class="text-lg-center pt-2 display-6"
										style={{
											color: '#ff7f9f',
										}}>
										The city is yours to take
									</h2>
									<p className="text-lg-center display-7">
										From convenience stores to the Pacific Standard Bank, our
										combat & robbery specialists take anything and everything.
									</p>
									<h4
										class="text-lg-left display-7"
										style={{
											color: '#ff3366',
										}}>
										Hundreds of cops
									</h4>
									<p class="text-lg-left display-7">
										Once you ready up, there's no turning back. You'll defend
										the area from incumbent police until the loot is secure.
										Afterwards you must exfiltrate through waves of cops that
										are shooting to kill.
									</p>
									<h4
										class="text-lg-left display-7"
										style={{
											color: '#ff3366',
										}}>
										Defend the Party Leader
									</h4>
									<p class="text-lg-left display-7">
										Critical to success is defending the party leader. This
										individual has secured the loot and if they're captured or
										killed, the party's loot is diminished.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div
						className="jumbotron p-0 m-0"
						style={{
							backgroundImage: `url(${Images.PigsHeist})`,
							backgroundSize: 'cover',
						}}>
						<div
							className="jumbotron jumbotron-fluid d-flex align-items-center"
							style={{
								backgroundColor: 'rgba(0, 0, 0, 0.25)',
								padding: '5rem',
							}}>
							<div className="container p-5">
								<div className="row">
									<div
										className="col-12 col-md-6 col-lg-4 d-flex flex-column"
										style={{
											justifyContent: 'space-around',
										}}>
										<button
											className="btn btn-lg mb-2"
											onClick={PIGSDiscord}
											style={{
												backgroundColor: '#ff7f9f',
												borderRadius: '100px',
												fontFamily: "'Rubik', sans-serif",
											}}>
											<span className="socicon-discord"></span>
											<span className="ml-2">Discord</span>
										</button>
										<button
											className="btn btn-lg mb-2"
											onClick={Handbook}
											style={{
												backgroundColor: '#ff7f9f',
												borderRadius: '100px',
												fontFamily: "'Rubik', sans-serif",
											}}>
											<span className="mbrib-info"></span>
											<span className="ml-2">Handbook</span>
										</button>
									</div>
									<div className="col-12 col-md-6 col-lg-8">
										<div className="d-flex flex-column">
											<h2
												className="text-center text-md-left text-lg-center display-4"
												style={{
													color: '#ff7f9f',
													fontFamily: "'Orbitron', sans-serif",
												}}>
												PIGS - Combat &amp; Robbery
											</h2>
											<h3
												className="text-center text-md-left text-lg-center lead"
												style={{
													fontFamily: "'Krona One', sans-serif",
												}}>
												If you're interested in joining us, click the Discord
												button and Apply Now at the top of the page!
												<br />
												Check out our Handbook for details of our company.
											</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</SmoothScroll>
		</div>
	);
};

export default PIGSScreen;
