import React, { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import SmoothScroll from '../_presentational/SmoothScroll';

const RTSScreen = () => {
	const [showVideo, setShowVideo] = useState(false);

	const RTSDiscord = () => window.open('https://discord.gg/9WRV87P');
	const Handbook = () =>
		window.open(
			'https://docs.google.com/document/d/1FWgrc_7kowBbWLx2Ce0WHOIXy-vAcUCROe6UTMOszjM/edit'
		);

	const videoId = 'Mv0SdAn4Yi0';

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
				<div
					className="jumbotron jumbotron-fluid p-0 m-0"
					style={{
						height: '100vh',
						display: 'contents',
					}}>
					<iframe
						title="RTS Video"
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
						}}>
						<div className="container p-5">
							<div className="row">
								<h1
									className="text-center text-lg-center display-4 w-100 mb-4"
									style={{
										color: '#ff8600',
										fontFamily: "'Rubik', sans-serif",
										fontWeight: 'bold',
									}}>
									<em>LAND YOUR DREAM JOB</em>
								</h1>

								<h3
									className="text-center text-lg-center lead mt-4 w-100"
									style={{
										fontFamily: "'Orbitron', sans-serif",
										fontWeight: 'bold',
										fontSize: '1.5rem',
									}}>
									You can drive a random selection of over <b>600</b> vehicles
									from three categories: Performance, Heavy, and Aviation.
								</h3>
							</div>
						</div>
					</div>
				</div>
				<div
					style={{
						background: 'black',
						fontFamily: "'Rubik', sans-serif",
					}}>
					<div className="container d-flex flex-wrap justify-content-centert p-5">
						<div
							style={{
								...Styles.card,
							}}
							className="align-items-center p-4 m-3">
							<h4 style={Styles.cardHeader} className="pb-2">
								Transporter Runs
							</h4>
							<p>
								Transporters will spawn a variety of vehicles, including muscle,
								sports, and super cars. There are even a few surprises in the
								ultra-rare&nbsp;<em>Amazing</em>&nbsp;class of vehicles.
							</p>
						</div>
						<div
							style={{
								...Styles.card,
							}}
							className="align-items-center p-4 m-3">
							<h4 style={Styles.cardHeader} className="pb-2">
								Heavy Transport
							</h4>
							<p>
								Trucking enthusiasts will love our Heavy Transport runs. These
								include everything from box trucks to randomized semi-cab &amp;
								trailer combinations.
							</p>
						</div>
						<div
							style={{
								...Styles.card,
							}}
							className="align-items-center p-4 m-3">
							<h4 style={Styles.cardHeader} className="pb-2">
								Aviator
							</h4>
							<p>
								If you enjoy flying, you'll need to check out Aviator. This
								profession has a chance to spawn nearly every non-heavy aircraft
								in Grand Theft Auto, including helicopters.
							</p>
						</div>
					</div>
				</div>

				<div>
					<div
						className="jumbotron p-0 m-0"
						style={{
							backgroundImage: 'url("assets/images/unknown-2-2000x664.png")',
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
											onClick={RTSDiscord}
											style={{
												backgroundColor: '#ff8600',
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
												backgroundColor: '#ff8600',
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
												If you're interested in joining us, join the Discord at
												the link here and Apply Now at the top of the page!
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

export default RTSScreen;

const Styles = {
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
