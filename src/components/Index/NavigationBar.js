import '../../assets/css/mobirise-icons.css';
import '../../assets/css/social-icons.css';

import React from 'react';

const NavigationBar = () => {
	return (
		<>
			<nav
				className="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm transparent bg-color"
				style={{ position: 'fixed', top: '0px', width: '100%', zIndex: 1 }}>
				<button
					className="navbar-toggler navbar-toggler-right"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<div className="hamburger">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</button>
				<div className="menu-logo">
					<div className="navbar-brand">
						<span className="navbar-logo">
							<a href="home.html">
								<img
									src="assets/images/logo-rc-376x226.png"
									alt="RC"
									title=""
									style={{ height: '4.9rem' }}
								/>
							</a>
						</span>
					</div>
				</div>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
						<li className="nav-item">
							<a
								className="nav-link link text-white display-4"
								href="home/profile/">
								<span
									className="mbri-home mbr-iconfont mbr-iconfont-btn"
									style={{ color: 'rgb(255, 134, 0)' }}></span>
								Employee Login
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link link text-white display-4"
								href="home/ttools/">
								<span
									className="mobi-mbri mobi-mbri-sites mbr-iconfont mbr-iconfont-btn"
									style={{ color: 'rgb(255, 134, 0)' }}></span>
								TTools
							</a>
						</li>
					</ul>
					<div className="navbar-buttons mbr-section-btn">
						<a className="btn btn-sm btn-primary display-4" href="home/apply">
							<span
								className="mbri-edit mbr-iconfont mbr-iconfont-btn"
								style={{ color: 'rgb(255, 255, 255)' }}></span>
							Apply Now!
						</a>
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavigationBar;
