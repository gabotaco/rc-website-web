// @flow
import * as React from 'react';
import { useQuery } from '@apollo/client';
import * as queries from '../../apollo/queries';
import LoadingIcon from '../_presentational/LoadingIcon';

const PermRender = props => {
	const { loading, error, data } = useQuery(queries.GET_AUTH_USER);

	function handle(authorizedUser) {
		if (props.perms) {
			return props.perms.includes(authorizedUser.permission) ? (
				<React.Fragment>{props.children}</React.Fragment>
			) : null;
		} else {
			return props.ttperms.includes(authorizedUser.ttpermission) ? (
				<React.Fragment>{props.children}</React.Fragment>
			) : null;
		}
	}

	if (props.authorizedUser) {
		return handle(props.authorizedUser);
	} else {
		if (loading) return <LoadingIcon />;
		if (error) {
			console.error(error);
			return 'There was an error authenticating your request';
		}
		const { authorizedUser } = data;

		return handle(authorizedUser);
	}
};

export default PermRender;
