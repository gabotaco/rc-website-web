import React from "react";
import * as Api from "../../library/Api/api";
import {withRouter} from "react-router";


class LogoutScreen extends React.Component {

	componentDidMount() {
		Api.logoutUser().then(()=>{
			this.props.history.push('/auth/login')
		})
	}

	render(){
		return (
			<div/>
		);
	}
}

export default withRouter(LogoutScreen)
