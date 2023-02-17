import * as queries from '../../../apollo/queries';

import React, { useEffect } from 'react';

import ApplyNow from '../../_common/ApplyNow';
import CompanyCurrentMembersTable from './CompanyCurrentMembersTable';
import CompanyMembersTable from './CompanyMembersTable';
import { Container } from 'reactstrap';
import LoadingIcon from '../../_presentational/LoadingIcon';
import ManagerCashoutContainer from './ManagerCashoutContainer';
import PermRender from '../../_common/PermRender';
import { Query } from 'react-apollo';
import TopTurninForm from './TopTurninForm';

const CompanyManagementScreen = () => {
	useEffect(() => {
		document.title = `RC - Management`;
	}, []);

	return (
		<Query query={queries.GET_AUTH_USER}>
			{({ loading, error, data }) => {
				if (loading) return <LoadingIcon />;
				if (error) {
					console.error(error);
					return 'There was an error authenticating your request';
				}
				const { authorizedUser } = data;

				return (
					<Container>
						<PermRender perms={[3, 2]} authorizedUser={authorizedUser}>
							<h1>Company Members</h1>
							<CompanyMembersTable
								user={authorizedUser}
								perms={authorizedUser.permission}
							/>
						</PermRender>
						<PermRender perms={[1]} authorizedUser={authorizedUser}>
							<h1>Company Members</h1>
							<CompanyCurrentMembersTable user={authorizedUser} />
						</PermRender>
						<PermRender perms={[3]} authorizedUser={authorizedUser}>
							<h1>Managers Cashouts</h1>
							<ManagerCashoutContainer />
						</PermRender>
						<PermRender perms={[3, 2]} authorizedUser={authorizedUser}>
							<h1>Get Top Turnins</h1>
							<TopTurninForm />
						</PermRender>
						<PermRender perms={[0]} authorizedUser={authorizedUser}>
							<ApplyNow />
						</PermRender>
					</Container>
				);
			}}
		</Query>
	);
};

export default CompanyManagementScreen;
