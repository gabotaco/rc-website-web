import React from 'react';
import PermRender from '../../_common/PermRender';
import * as queries from '../../../apollo/queries';
import LoadingIcon from '../../_presentational/LoadingIcon';
import VehicleMods from './VehicleMods';
import { useQuery } from '@apollo/client';

const VehicleModsContainer = () => {
	const { loading, error, data } = useQuery(queries.GET_AUTH_USER);
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
};

export default VehicleModsContainer;
