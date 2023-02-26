import React, {useRef} from 'react';
import { Route, Switch } from 'react-router-dom';

// import Footer from "components/Footer/Footer.jsx";

import routes from '../../routes.js';

const Pages = () => {
	const getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.collapse) {
				return getRoutes(prop.views);
			}
			if (prop.layout === '/auth') {
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

	const ref = useRef();

	return (
		<>
			<div className="wrapper wrapper-full-page" ref={ref}>
				<div className="">
					<Switch>{getRoutes(routes)}</Switch>
				</div>
			</div>
		</>
	);
}

export default Pages;
