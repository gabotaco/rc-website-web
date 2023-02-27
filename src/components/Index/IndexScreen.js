import '../../assets/fonts/Rubik/style.css';
import '../../assets/fonts/Orbitron/style.css';
import '../../assets/fonts/Krona One/style.css';
import '../../assets/css/jarallax.css';

import Jarallax from '../_presentational/JarallaxImage';
import NavigationBar from './NavigationBar';
import React from 'react';
import SmoothScroll from '../_presentational/SmoothScroll';

const IndexScreen = () => {
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
						minWidth: '100vw',
					}}>
					<div
						style={{
							display: 'flex',
							flexFlow: 'row wrap',
							placeContent: 'center',
							alignItems: 'start',
							margin: '0 auto',
							maxWidth: '1110px',
						}}>
						<div style={Styles.card}>
							<h4 style={Styles.cardHeader}>Dynamic Gameplay</h4>
							<p>
								Whether you're in the mood for solo play or want to team up in
								epic combat, the Rockwell Corporation has you covered.
								<br /> <br />
								More details can be found at the pages linked below.
							</p>
						</div>
						<div style={Styles.card}>
							<h4 style={Styles.cardHeader}>Dual Enrollment</h4>
							<p>
								Due to the unique structure of the Rockwell Corporation, you
								have unfettered access to both PIGS and RTS. All you need is a
								manager from the opposing company to switch you over and your
								progress is saved in both companies!
							</p>
						</div>
						<div style={Styles.card}>
							<h4 style={Styles.cardHeader}>Unique Features</h4>
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
						<div style={Styles.card}>
							<h4 style={Styles.cardHeader}>Alfred the Drunk Butler</h4>
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
					<div className="container" style={Styles.rcTrailer}>
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
								Height: '25%',
							},
						}}>
						<div style={{ ...Styles.company, zIndex: '1' }}>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '1fr 1fr 1fr',
									padding: '90px 0',
									placeItems: 'center',
									margin: 'auto',
									marginLeft: '20%',
									marginRight: '20%',
								}}>
								<h2
									style={{
										textAlign: 'center',
										gridRow: '1',
										gridColumn: '1 / span 2',
										color: '#ff7f9f',

										fontSize: '2rem',
										fontWeight: '700',
									}}>
									PIGS - Combat & Robbery
								</h2>
								<h3
									style={{
										textAlign: 'center',
										gridRow: '2',
										gridColumn: '1 / span 2',
										fontFamily: "'Krona One', sans-serif",
										fontSize: '1rem',
									}}>
									The only criminal enterprise in Tycoon. Take it all. Leave no
									witnesses.
								</h3>
								<button
									style={{
										...Styles.companyButton,
										gridRow: '1',
										gridColumn: '3',
										backgroundColor: '#ff7f9f',
										justifySelf: 'right',
									}}>
									<span className="mbri-preview"></span>
									<span
										style={{
											fontFamily: "'Rubik', sans-serif",
											fontWeight: '500',
											fontSize: '16px',
											paddingLeft: '0.5rem',
										}}>
										See More
									</span>
								</button>
								<button
									style={{
										...Styles.companyButton,
										gridRow: '2',
										gridColumn: '3',
										backgroundColor: '#ff7f9f',
										justifySelf: 'right',
									}}>
									<span className="socicon-discord"></span>
									<span
										style={{
											fontFamily: "'Rubik', sans-serif",
											fontWeight: '500',
											fontSize: '16px',
											paddingLeft: '0.5rem',
										}}>
										Discord
									</span>
								</button>
							</div>
						</div>
					</Jarallax>
					<div>
						<div
							style={{
								backgroundImage:
									'url("../../../assets/images/unknown-2-2000x664.png',
								...Styles.company,

								backgroundPosition: '50% 50%',
								backgroundPositionX: '50%',
								backgroundPositionY: '50%',
								backgroundRepeat: 'no-repeat',
								backgroundRepeatX: 'no-repeat',
								backgroundRepeatY: 'no-repeat',
								backgroundSize: 'cover',
							}}>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '1fr 1fr 1fr',
									padding: '90px 0',
									placeItems: 'center',
									margin: 'auto',
									marginLeft: '20%',
									marginRight: '20%',
								}}>
								<h2
									style={{
										textAlign: 'center',
										gridRow: '1',
										gridColumn: '2 / span 3',
										color: '#ff8600',
										fontFamily: "'Orbitron', sans-serif",

										fontSize: '2rem',
										fontWeight: '700',
									}}>
									Rockwell Transport Solutions
								</h2>
								<h3
									style={{
										textAlign: 'center',
										gridRow: '2',
										gridColumn: '2 / span 3',
										fontFamily: "'Krona One', sans-serif",
										fontSize: '1rem',
										fontWeight: '300',
									}}>
									Get your dream job; drive performance vehicles, pilot exciting
									aircraft, and deliver randomized heavy vehicles.
								</h3>
								<button
									style={{
										...Styles.companyButton,
										gridRow: '1',
										gridColumn: '1',
										backgroundColor: '#ff8600',
										justifySelf: 'left',
									}}>
									<span className="mbri-preview"></span>
									<span
										style={{
											fontFamily: "'Rubik', sans-serif",
											fontWeight: '500',
											fontSize: '16px',
											paddingLeft: '0.5rem',
										}}>
										See More
									</span>
								</button>
								<button
									style={{
										...Styles.companyButton,
										gridRow: '2',
										gridColumn: '1',
										backgroundColor: '#ff8600',
										justifySelf: 'left',
									}}>
									<span className="socicon-discord"></span>
									<span
										style={{
											fontFamily: "'Rubik', sans-serif",
											fontWeight: '500',
											fontSize: '16px',
											paddingLeft: '0.5rem',
										}}>
										Discord
									</span>
								</button>
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
		fontFamily: "'Rubik', sans-serif",
		fontSize: '1rem',
		fontStyle: 'normal',
		color: '#767676',
		backgroundColor: '#232323',
		padding: '2rem',

		flex: '1',
		margin: '1rem',
		lineHeight: '1.6',
		minWidth: '225px',
	},
	cardHeader: {
		fontSize: '1rem',
		color: '#fff',
		paddingBottom: '1rem',
	},
	company: {
		fontFamily: "'Orbitron', sans-serif",
		fontSize: '2rem',
		fontDisplay: 'swap',

		padding: '27.5px 0',
	},
	companyButton: {
		borderRadius: '100px',
		fontFamily: "'Rubik', sans-serif",
		fontSize: '1.6rem',
		padding: '1rem 3rem',
		margin: '0 0 0.5rem 0',
		border: 'none',
		color: '#fff',
		display: 'flex',
	},
	rcTrailer: {
		maxWidth: '1140px',
		paddingTop: '30px',
		paddingRight: '15px',
		paddingLeft: '15px',
		paddingBottom: '60px',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
};
