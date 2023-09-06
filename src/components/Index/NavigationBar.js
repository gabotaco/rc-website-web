import { Button } from 'reactstrap';
import '../../assets/css/mobirise-icons.css';
import '../../assets/css/mobirise-icons-bold.css';
import '../../assets/css/social-icons.css';

import React, { useState } from 'react';

const NavigationBar = ({ history }) => {
	const HomePage = () => history.push('/');
	const ProfilePage = () => history.push('/home/profile');
	const TToolsPage = () => history.push('/home/ttools');
	const ApplyPage = () => history.push('/home/apply');

	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<nav
			className={
				'navbar navbar-expand-lg fixed-top navbar-dark' +
				(dropdownOpen ? ' bg-dark' : ' ml-5 mr-5')
			}>
			<a className="navbar-brand" onClick={HomePage} href="/">
				<img
					src="assets/images/logo-rc-376x226.png"
					alt="RC"
					title=""
					style={{ height: '4.9rem' }}
				/>
			</a>
			<button
				className="navbar-toggler"
				type="button"
				onClick={() => setDropdownOpen(!dropdownOpen)}>
				<span
					className="mbri-menu"
					style={{
						color: 'rgb(255, 134, 0)',
					}}></span>
			</button>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto"></ul>
				<form className="form-inline my-2 my-lg-0">
					<a
						onClick={ProfilePage}
						className="nav-link link text-white font-weight-bold h5 d-flex"
						href="home/profile/">
						<span
							className="mbrib-home mbr-iconfont mbr-iconfont-btn mr-2"
							style={{
								color: 'rgb(255, 134, 0)',
								fontSize: '1.6rem',
							}}></span>
						Employee Login
					</a>
					<a
						onClick={TToolsPage}
						href="home/ttools/"
						className="nav-link link text-white font-weight-bold h5 mr-2 d-flex">
						<span
							className="mbrib-sites mbr-iconfont mbr-iconfont-btn mr-2"
							style={{
								color: 'rgb(255, 134, 0)',
								fontSize: '1.6rem',
							}}></span>
						TTools
					</a>
					<Button
						onClick={ApplyPage}
						className="btn btn-sm btn-primary h5 pl-4 pr-4"
						style={{
							backgroundColor: '#ff8600',
							borderColor: '#ff8600',
							fontSize: '1.2rem',
							borderRadius: '100px',
						}}>
						<span
							className="mbrib-edit mr-2"
							style={{
								fontSize: '1.6rem',
							}}></span>
						Apply Now!
					</Button>
				</form>
			</div>
			{dropdownOpen ? (
				<div className="navbar-collapse">
					<ul className="navbar-nav mr-auto"></ul>
					<form className="form-inline my-2 my-lg-0">
						<a
							onClick={ProfilePage}
							className="nav-link link text-white font-weight-bold h5 d-flex"
							href="home/profile/">
							<span
								className="mbri-home mbr-iconfont mbr-iconfont-btn mr-2"
								style={{
									color: 'rgb(255, 134, 0)',
									fontSize: '1.6rem',
								}}></span>
							Employee Login
						</a>
						<a
							onClick={TToolsPage}
							href="home/ttools/"
							className="nav-link link text-white font-weight-bold h5 mr-2 d-flex">
							<span
								className="mobi-mbri mbri-sites mbr-iconfont mbr-iconfont-btn mr-2"
								style={{
									color: 'rgb(255, 134, 0)',
									fontSize: '1.6rem',
								}}></span>
							TTools
						</a>
						<Button
							onClick={ApplyPage}
							className="btn btn-sm btn-primary h5 pl-4 pr-4"
							style={{
								backgroundColor: '#ff8600',
								borderColor: '#ff8600',
								fontSize: '1.2rem',
								borderRadius: '100px',
							}}>
							Apply Now!
						</Button>
					</form>
				</div>
			) : null}
		</nav>
	);
};

export default NavigationBar;
