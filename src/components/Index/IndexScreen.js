import '../../assets/fonts/Rubik/style.css';
import '../../assets/fonts/Orbitron/style.css';
import '../../assets/fonts/Krona One/style.css';
import '../../assets/css/jarallax.css';

import Jarallax from '../_presentational/JarallaxImage';
import NavigationBar from './NavigationBar';
import React from 'react';
import SmoothScroll from '../_presentational/SmoothScroll';

const IndexScreen = ({ history }) => {
	const RTSPage = () => history.push('/rts');
	const PIGSPage = () => history.push('/pigs');
	const RTSDiscord = () => window.open('https://discord.gg/9WRV87P');
	const PIGSDiscord = () => window.open('https://discord.gg/FXNyJfQ');

	return (
		<div>
			<NavigationBar />
			<SmoothScroll>
				<Jarallax
					{...{
						uid: 1,
						options: {
							src: require('../../assets/img/bg/rock-corp-perfect.png'),
							...Styles.jarallax,
						},
						style: {
							minHeight: '100vh',
						},
					}}
				/>
				<div
					style={{
						background: 'black',
						fontFamily: "'Rubik', sans-serif",
					}}>
					<div className="container d-flex flex-wrap justify-content-centert">
						<div
							style={{
								...Styles.card,
							}}
							className="align-items-center p-4 m-3">
							<h4 style={Styles.cardHeader} className="pb-2">
								Dynamic Gameplay
							</h4>
							<p>
								Whether you're in the mood for solo play or want to team up in
								epic combat, the Rockwell Corporation has you covered.
								<br /> <br />
								More details can be found at the pages linked below.
							</p>
						</div>
						<div
							style={{
								...Styles.card,
							}}
							className="align-items-center p-4 m-3">
							<h4 style={Styles.cardHeader} className="pb-2">
								Dual Enrollment
							</h4>
							<p>
								Due to the unique structure of the Rockwell Corporation, you
								have unfettered access to both PIGS and RTS. All you need is a
								manager from the opposing company to switch you over and your
								progress is saved in both companies!
							</p>
						</div>
						<div
							style={{
								...Styles.card,
							}}
							className="align-items-center p-4 m-3">
							<h4 style={Styles.cardHeader} className="pb-2">
								Unique Features
							</h4>
							<p>
								With our PIGS Tracker, you can see how many of your fellow
								members are online and even see their locations.
								<br />
								<br />
								With RTS, every perfect delivery of a performance vehicle grants
								you a one-time use spawn card for that vehicle. Collect them
								all!
							</p>
						</div>
						<div
							style={{
								...Styles.card,
							}}
							className="align-items-center p-4 m-3">
							<h4 style={Styles.cardHeader} className="pb-2">
								Alfred the Drunk Butler
							</h4>
							<p>
								When he's not passed out from a wild night, he can update your
								roles, show your progress to the next level-up, your total
								donations, and your rank within the company.
								<br />
								<br />
								You just have to see him to understand.
							</p>
						</div>
					</div>
				</div>
				<div
					style={{
						width: '100%',
						background: 'linear-gradient(0deg, #232323, #000000)',
					}}>
					<div className="container p-5">
						<iframe
							title="RC Trailer"
							className="mbr-embedded-video"
							src="https://www.youtube.com/embed/k9M-XiMgTlc?rel=0&amp;amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;playlist=k9M-XiMgTlc"
							width="1280"
							height="720"
							frameBorder="0"
							allowFullScreen
							style={{
								height: '499.5px',
								width: '80%',
								display: 'block',
								margin: 'auto',
							}}></iframe>
					</div>
				</div>
				<div>
					<Jarallax
						{...{
							uid: 2,
							options: {
								src: require('../../assets/img/bg/pigsheist.png'),
								...Styles.jarallax,
							},
							style: {
								height: '25%',
							},
						}}>
						<div
							className="jumbotron jumbotron-fluid d-flex align-items-center m-0"
							style={{
								backgroundColor: 'rgba(0, 0, 0, 0.25)',
							}}>
							<div className="container">
								<div className="row p-5">
									<div className="col-12 col-md-6 col-lg-8">
										<h2
											className="text-center text-md-left text-lg-center display-4"
											style={{
												color: '#ff7f9f',
												fontFamily: "'Orbitron', sans-serif",
											}}>
											PIGS - Combat & Robbery
										</h2>
										<h3
											className="text-center text-md-left text-lg-center lead"
											style={{
												fontFamily: "'Krona One', sans-serif",
											}}>
											The only criminal enterprise in Tycoon. Take it all. Leave
											no witnesses.
										</h3>
									</div>
									<div
										className="col-12 col-md-6 col-lg-4 d-flex flex-column"
										style={{
											justifyContent: 'space-around',
										}}>
										<button
											className="btn btn-lg mb-2"
											onClick={PIGSPage}
											style={{
												backgroundColor: '#ff7f9f',
												borderRadius: '100px',
												fontFamily: "'Rubik', sans-serif",
											}}>
											<span className="mbri-preview"></span>
											<span className="ml-2">See More</span>
										</button>
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
									</div>
								</div>
							</div>
						</div>
					</Jarallax>
					<div>
						<div
							className="jumbotron p-0 m-0"
							style={{
								backgroundImage:
									'url("../../../assets/images/unknown-2-2000x664.png")',
								backgroundSize: 'cover',
							}}>
							<div
								className="jumbotron jumbotron-fluid d-flex align-items-center"
								style={{
									backgroundColor: 'rgba(0, 0, 0, 0.25)',
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
												onClick={RTSPage}
												style={{
													backgroundColor: '#ff8600',
													borderRadius: '100px',
													fontFamily: "'Rubik', sans-serif",
												}}>
												<span className="mbri-preview"></span>
												<span className="ml-2">See More</span>
											</button>
											<button
												className="btn btn-lg mb-2"
												onClick={RTSDiscord}
												style={{
													backgroundColor: '#ff8600',
													borderRadius: '100px',
													fontFamily: "'Rubik', sans-serif",
												}}>
												<span className="socicon-discord"></span>
												<span className="ml-2">Discord</span>
											</button>
										</div>
										<div className="col-12 col-md-6 col-lg-8">
											<div className="d-flex flex-column">
												<h2
													className="text-center text-md-left text-lg-center display-4"
													style={{
														color: '#ff8600',
														fontFamily: "'Orbitron', sans-serif",
													}}>
													Rockwell Transport Solutions
												</h2>
												<h3
													className="text-center text-md-left text-lg-center lead"
													style={{
														fontFamily: "'Krona One', sans-serif",
													}}>
													Get your dream job; drive performance vehicles, pilot
													exciting aircraft, and deliver randomized heavy
													vehicles.
												</h3>
											</div>
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

export default IndexScreen;

const Styles = {
	jarallax: {
		speed: -0.8,
		imgSize: 'cover',
		imgPosition: '50% 50%',
		imgRepeat: 'no-repeat',
		keepImg: false,
	},
	card: {
		color: '#767676',
		backgroundColor: '#232323',
		flex: '1',
		lineHeight: '1.6',
		minWidth: '225px',
	},
	cardHeader: {
		fontSize: '1rem',
		color: '#fff',
	},
};
