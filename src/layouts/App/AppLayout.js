import React, {useRef} from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from '../../routes.js';
import AppNavbar from '../../components/Navigation/AppNavbar';
import LoadingIcon from '../../components/_presentational/LoadingIcon';
import * as queries from '../../apollo/queries';
import Footer from '../../components/Navigation/Footer';
import { useQuery } from '@apollo/client';

const AppLayout = (props) => {
	const getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.layout === '/home') {
				return (
					<Route
						path={prop.layout + prop.path}
						exact
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};

	const getNameOfCurrentRoute = routes => {
		const pathname = props.location.pathname.endsWith('/')
			? props.location.pathname.slice(0, -1)
			: props.location.pathname;
		for (const route of routes) {
			if (route.layout + route.path === pathname) {
				return route.name;
			}
		}
		return 'RC';
	};

	const {loading, error, data} = useQuery(queries.GET_AUTH_USER);
	function makeAppNavbar() {
		if (loading) return <LoadingIcon />;
		if (error || !data) {
			sessionStorage.setItem(
				'redirect',
				props.location.pathname
			);
			props.history.push('/auth/login');
			return <p>You are being redirected</p>;
		}
	
		return (
			<AppNavbar
				{...props}
				routeName={getNameOfCurrentRoute(routes)}
				authorizedUser={data.authorizedUser}
			/>
		);
	}

	const ref = useRef();

	return (
		<div className="wrapper">
			<div className="main-panel" ref={ref}>
				{makeAppNavbar()}
				<Switch>{getRoutes(routes)}</Switch>
				{
					// we don't want the Footer to be rendered on full screen maps page
					getNameOfCurrentRoute(routes) === 'Home' ? null : <Footer />
				}
			</div>
		</div>
	);
}

export default AppLayout;
