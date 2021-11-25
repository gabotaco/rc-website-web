import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "../../routes.js";
import AppNavbar from "../../components/Navigation/AppNavbar";
import {Query} from "react-apollo";
import LoadingIcon from "../../components/_presentational/LoadingIcon";
import * as queries from "../../apollo/queries";
import Footer from "../../components/Navigation/Footer"

class AppLayout extends React.Component {
    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/home") {
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

    getNameOfCurrentRoute = routes => {
        const pathname = this.props.location.pathname.endsWith("/") ? this.props.location.pathname.slice(0, -1) : this.props.location.pathname;
        for(const route of routes){
          if(route.layout+route.path === pathname){
              return route.name
          }
        }
        return "RC"
    }

    render() {
        return (
            <div className="wrapper">
                <div className="main-panel" ref="mainPanel">
                    <Query query={queries.GET_AUTH_USER}>
                        {
                            ({loading, error, data}) => {
                                if (loading) return <LoadingIcon />
                                if (error || !data) {
                                    this.props.history.push('/auth/login')
                                    return <p>You are being redirected</p>
                                }

                                return (
                                    <AppNavbar
                                        {...this.props}
                                        routeName={this.getNameOfCurrentRoute(routes)}
                                        authorizedUser={data.authorizedUser}
                                    />
                                )
                            }
                        }
                    </Query>
                    <Switch>{this.getRoutes(routes)}</Switch>
                    {// we don't want the Footer to be rendered on full screen maps page
                        this.getNameOfCurrentRoute(routes) === "Home" ? null : (
                            <Footer />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default AppLayout;
