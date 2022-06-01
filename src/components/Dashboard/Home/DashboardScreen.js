import React, { useEffect } from 'react';
import PermRender from '../../_common/PermRender';
import { Query } from 'react-apollo';
import * as queries from '../../../apollo/queries';
import LoadingIcon from '../../_presentational/LoadingIcon';
import { Container } from 'reactstrap';
import ServerUptime from './ServerUptime';
import VehicleMods from './VehicleMods';

const DashboardScreen = () => {
	useEffect(() => {
		document.title = `RC - Dashboard`;
	}, []);

	return (
		<Container>
			<h1>Server Status</h1>
			<ServerUptime />

			<Query query={queries.GET_AUTH_USER}>
				{({ loading, error, data }) => {
					if (loading) return <LoadingIcon />;
					if (error) {
						console.error(error);
						return 'There was an error authenticating your request';
					}
					const { authorizedUser } = data;

					return (
						<PermRender perms={[3, 2, 1]} authorizedUser={authorizedUser}>
							<h2>Get vehicle mods</h2>
							<VehicleMods />
						</PermRender>
					);
				}}
			</Query>
		</Container>
	);
};

export default DashboardScreen;
