import React from "react";
import { Route, Switch } from "react-router-dom";

// import Footer from "components/Footer/Footer.jsx";

import routes from "../../routes.js";

class Pages extends React.Component {
	getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.collapse) {
				return this.getRoutes(prop.views);
			}
			if (prop.layout === "/auth") {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};
	render() {
		return (
			<>
				<div className="wrapper wrapper-full-page" ref="fullPages">
					<div className="">
						<Switch>{this.getRoutes(routes)}</Switch>
					</div>
				</div>
			</>
		);
	}
}

export default Pages;
