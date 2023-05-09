import React, { useEffect } from 'react';
import * as Api from '../../library/Api/api';
import { withRouter } from 'react-router-dom';

const LogoutScreen = props => {
	useEffect(() => {
		Api.logoutUser().then(() => {
			props.history.push('/auth/login');
		});
	}, []);

	return <div />;
};

export default withRouter(LogoutScreen);
