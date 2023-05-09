import React, { Suspense } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AppConfigs from './config/app_configs';
import AppLayout from './layouts/App/AppLayout';
import AuthLayout from './layouts/Auth/AuthLayout';
import ReactDOM from 'react-dom/client';
import { createBrowserHistory } from 'history';

// import "bootswatch/dist/darkly/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.css";

const hist = createBrowserHistory();
const cache = new InMemoryCache({ addTypename: true });

const client = new ApolloClient({
	uri: `${AppConfigs.server_url}/graphql`,
	cache,
	credentials: 'include',
});

const RcApp = () => {
	return (
		<Router history={hist}>
			<Switch>
				<Route
					path="/"
					exact
					render={props => (window.location.href = 'home.html')}
				/>
				<Redirect from="/auth" exact to="/auth/login" />
				<Route path="/auth" render={props => <AuthLayout {...props} />} />
				<Route path="/home" render={props => <AppLayout {...props} />} />
			</Switch>
		</Router>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ApolloProvider client={client}>
		<Suspense fallback={<div>Loading...</div>}>
			<RcApp />
		</Suspense>
	</ApolloProvider>
);
