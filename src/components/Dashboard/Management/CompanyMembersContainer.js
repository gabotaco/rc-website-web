import React from 'react';
import { Query } from 'react-apollo';
import LoadingIcon from '../../_presentational/LoadingIcon';
import * as queries from '../../../apollo/queries';
import CompanyMembersTable from './CompanyMembersTable';

const CompanyMembersContainer = props => {
	return (
		<Query query={queries.GET_ALL_MEMBER_DETAILS}>
			{({ loading, error, data, refetch }) => {
				if (loading) return <LoadingIcon />;
				if (error) {
					console.error(error);
					return 'There was an error loading active managers';
				}

				const members = data.getAllMemberDetails;

				return (
					<CompanyMembersTable
						members={members}
						refetch={refetch}
						perms={props.perms}
					/>
				);
			}}
		</Query>
	);
};

export default CompanyMembersContainer;
