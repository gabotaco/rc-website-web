import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import * as queries from '../../apollo/queries';
import LoadingIcon from '../_presentational/LoadingIcon';
import { useQuery } from '@apollo/client';

const ApplyButton = ({ history, authorizedUser }) => {
	const {loading, error, data} = useQuery(queries.GET_AUTH_USER_STATUS);

	if (loading) return <LoadingIcon />;
	if (error) {
		console.error(error);
		return 'Error getting your application status';
	}
	if (data.getAuthUserStatus) {
		var { status } = data.getAuthUserStatus;
	}
	if (status) {
		return (
			<Button color="success" type="button" size="lg" disabled>
				{status}
			</Button>
		);
	} else {
		if (authorizedUser.permission === 0) {
			return (
				<Button
					color="warning"
					type="button"
					size="lg"
					onClick={() => history.push('/home/apply')}>
					Apply!
				</Button>
			);
		} else {
			return (
				<Button
					color="success"
					type="button"
					size="lg"
					onClick={() => history.push('/home/apply')}>
					Re-Join RC
				</Button>
			);
		}
	}
};

export default withRouter(ApplyButton);
