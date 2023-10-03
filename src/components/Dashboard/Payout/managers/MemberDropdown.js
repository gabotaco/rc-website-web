import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import * as queries from '../../../../apollo/queries';
import SearchableDropdown from '../../../_common/SearchableDropdown';
import { FormFeedback, Input } from 'reactstrap';

const MemberDropdown = props => {
	const { data, error, loading } = useQuery(queries.GET_CURRENT_EMPLOYEES);
	const [selectedMember, setSelectedMember] = useState(null);

	if (error) {
		console.error(error);
		alert('There was an error loading company members');
	}

	function makeData(data) {
		return {
			inner: `${data.in_game_id} ${data.in_game_name}`,
			searchString: `${data.in_game_id} ${data.in_game_name} ${data.discord_id}`,
			member: data,
		};
	}

	function memberSelected(data) {
		setSelectedMember(data.member);
		props.onSelected(data.member);
	}

	return (
		<React.Fragment>
			<SearchableDropdown
				title={
					selectedMember
						? `${selectedMember.in_game_id}: ${selectedMember.in_game_name}`
						: 'Select'
				}
				placeholder="Search (Discord ID, In game ID, In game name)"
				data={
					loading
						? 'LOADING'
						: error
						? 'ERROR LOADING MEMBERS'
						: data.getCurrentEmployees.map(makeData)
				}
				onSelected={memberSelected}
				isLoading={loading}
			/>
			<Input
				valid={!!selectedMember}
				invalid={!selectedMember}
				style={{ display: 'none' }}
			/>
			<FormFeedback valid>Looks good!</FormFeedback>
			<FormFeedback>Please specify a member.</FormFeedback>
		</React.Fragment>
	);
};

export default MemberDropdown;
