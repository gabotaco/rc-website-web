import React, { Suspense } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';

import ApolloClient from 'apollo-boost';
import { ApolloProvider as ApolloClientProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ApolloProvider } from 'react-apollo';
import AppConfigs from './config/app_configs';
import AppLayout from './layouts/App/AppLayout';
import AuthLayout from './layouts/Auth/AuthLayout';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
	<ApolloProvider client={client}>
		<ApolloClientProvider client={client}>
			<ApolloHooksProvider client={client}>
				<Suspense fallback={<div>Loading...</div>}>
					<RcApp />
				</Suspense>
			</ApolloHooksProvider>
		</ApolloClientProvider>
	</ApolloProvider>,
	document.getElementById('root')
);
