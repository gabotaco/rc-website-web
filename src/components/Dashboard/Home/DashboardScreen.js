import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import ServerUptime from './ServerUptime';
import VehicleModsContainer from './VehicleModsContainer';

const DashboardScreen = () => {
	useEffect(() => {
		document.title = `RC - Dashboard`;
	}, []);

	return (
		<Container>
			<h1>Server Status</h1>
			<ServerUptime />
			<VehicleModsContainer />
		</Container>
	);
};

export default DashboardScreen;
