import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createBrowserHistory } from "history";
import { Router, Switch, Route, Redirect } from "react-router";
import { ApolloProvider } from "react-apollo";
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks';
import AuthLayout from "./layouts/Auth/AuthLayout";
import AppLayout from "./layouts/App/AppLayout";
// import "bootswatch/dist/darkly/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.css";
const hist = createBrowserHistory();
const cache = new InMemoryCache({addTypename: true});

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache,
  	connectToDevTools: true, // we can remove this if we put a flag in .env saying we're in development mode
	credentials: 'include'
});

const RcApp = () => {
	return (
		<Router history={hist}>
			<Switch>
				<Redirect from="/auth" exact to="/auth/login" />
				<Route path="/auth" render={props => <AuthLayout {...props} />} />
				<Route path="/home" render={props => <AppLayout {...props} />} />
			</Switch>
		</Router>
	)
}

ReactDOM.render(
	<ApolloProvider client={client}>
		<ApolloHooksProvider client={client}>
			<Suspense fallback={<div>Loading...</div>}>
				<RcApp />
			</Suspense>
		</ApolloHooksProvider>
	</ApolloProvider>,
  	document.getElementById('root')
);
