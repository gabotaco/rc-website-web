import * as queries from '../../apollo/queries';

import ApplyNow from '../_common/ApplyNow';
import { Container } from 'reactstrap';
import LoadingIcon from '../_presentational/LoadingIcon';
import ManagerCashout from './managers/ManagerCashout';
import ManagerPayouts from './managers/ManagerPayouts';
import MemberProgress from './members/MemberProgress';
import MemberTurnins from './members/MemberTurnins';
import PermRender from '../_common/PermRender';
import { Query } from 'react-apollo';
import React from 'react';
import { withRouter } from 'react-router';

class ProfileScreen extends React.Component {
	componentDidMount() {
		document.title = `RC - Profile`;
		if (sessionStorage.getItem('redirect')) {
			const redirect = sessionStorage.getItem('redirect');
			sessionStorage.removeItem('redirect');
			this.props.history.push(redirect);
		}
	}

	render() {
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
							<PermRender perms={[3, 2, 1]} authorizedUser={authorizedUser}>
								<MemberProgress />
								<h1>Your turn ins</h1>
								<MemberTurnins />
							</PermRender>
							<PermRender perms={[3, 2]} authorizedUser={authorizedUser}>
								<h1>Your payouts</h1>
								<ManagerPayouts />
								<h1>Your cashout</h1>
								<ManagerCashout />
								<small>
									Auto-populated values will only refresh once per every 2
									minutes
								</small>
							</PermRender>
							<PermRender perms={[0]} authorizedUser={authorizedUser}>
								<ApplyNow />
							</PermRender>
						</Container>
					);
				}}
			</Query>
		);
	}
}

export default withRouter(ProfileScreen);
