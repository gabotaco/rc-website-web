import React, { useState } from 'react';
import { Label } from 'reactstrap';
import SearchableDropdown from '../../../_common/SearchableDropdown';
import { useQuery } from '@apollo/client';
import * as queries from '../../../../apollo/queries';
import ManagerPayoutTable from './ManagerPayoutTable';

const SearchManagerPayouts = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [managerTable, setManagerTable] = useState(null);

	const { data, error, loading } = useQuery(queries.GET_ACTIVE_MANAGERS);
	if (error) {
		console.error(error);
		alert('There was an error loading active managers');
	}
	function makeData(data) {
		return {
			inner: `${data.member.in_game_id} ${data.member.in_game_name}`,
			searchString: `${data.member.in_game_id} ${data.member.in_game_name} ${data.member.discord_id}`,
			data: data,
		};
	}
	function managerSelected(data) {
		setIsLoading(true);
		setManagerTable(
			<React.Fragment>
				<h1>{data.data.member.in_game_name}'s Payouts</h1>
				<ManagerPayoutTable manager_id={data.data.id} />
			</React.Fragment>
		);
		setIsLoading(false);
	}

	return (
		<React.Fragment>
			<Label>Manager</Label>
			<SearchableDropdown
				placeholder="Manager name, game id, or discord"
				data={
					loading
						? 'LOADING'
						: error ? 'ERROR LOADING'
							: data.getActiveManagers.map(makeData)
				}
				onSelected={managerSelected}
				isLoading={isLoading || loading}
			/>
			{managerTable}
		</React.Fragment>
	);
};

export default SearchManagerPayouts;
