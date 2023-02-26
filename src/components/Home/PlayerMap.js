import * as queries from '../../apollo/queries';

import LoadingIcon from '../../components/_presentational/LoadingIcon';
import Map from './Map';
import React from 'react';
import { useQuery } from '@apollo/client';

const PlayerMap = props => {
	const { loading, error, data } = useQuery(queries.GET_ALL_MEMBERS);

	if (loading) return <LoadingIcon />;
	if (error) {
		console.error(error);
		return 'Error getting company members';
	}

	const { members, managers, applicants } = data.getAllMembers;
	return (
		<Map
			members={members}
			managers={managers}
			applicants={applicants}
			loaded={props.loaded}
		/>
	);
};

export default PlayerMap;
