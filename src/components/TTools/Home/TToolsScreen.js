import React, { useEffect } from 'react';
import PermRender from '../../_common/PermRender';
import * as queries from '../../../apollo/queries';
import LoadingIcon from '../../_presentational/LoadingIcon';
import ApplyNow from '../../_common/ApplyNow';
import HomeScreen from './HomeScreen';
import { useQuery } from '@apollo/client';

const TToolsScreen = () => {
	const IDParam = new URLSearchParams(window.location.search).get('id');

	useEffect(() => {
		document.title = `RC - TTools Home`;
	}, []);

	const {loading, error, data} = useQuery(queries.GET_AUTH_USER);

	if (loading) return <LoadingIcon />;
	if (error) {
		console.error(error);
		return 'There was an error authenticating your request';
	}
	const { authorizedUser } = data;

	return (
		<React.Fragment>
			<PermRender ttperms={[-1]} authorizedUser={authorizedUser}>
				<ApplyNow ttools />
			</PermRender>
			<PermRender ttperms={[3, 2, 1, 0]} authorizedUser={authorizedUser}>
				<HomeScreen
					ttperm={authorizedUser.ttpermission}
					game_id={IDParam || authorizedUser.in_game_id}
				/>
			</PermRender>
		</React.Fragment>
	);
};

export default TToolsScreen;
