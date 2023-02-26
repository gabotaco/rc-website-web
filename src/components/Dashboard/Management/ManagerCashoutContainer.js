import React from 'react';
import LoadingIcon from '../../_presentational/LoadingIcon';
import * as queries from '../../../apollo/queries';
import ManagerCashoutTable from './ManagerCashoutTable';
import { useQuery } from '@apollo/client';

const ManagerCashoutContainer = props => {
	const { loading, error, data, refetch } = useQuery(queries.GET_ALL_MANAGERS);

	if (loading) return <LoadingIcon />;
	if (error) {
		console.error(error);
		return 'There was an error loading active managers';
	}

	const managers = data.getAllManagers;

	return <ManagerCashoutTable managers={managers} refetch={refetch} />;
};

export default ManagerCashoutContainer;
