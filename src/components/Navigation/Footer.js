import React from "react";
import { Container } from "reactstrap";

class Footer extends React.Component {
	render() {
		return (
			<footer style={Styles.footer}>
				<Container>
					<span className="text-muted" style={Styles.text}>made with <i className="fa fa-heart heart" /> by Gabo</span>
				</Container>
			</footer>
		);
	}
}


export default Footer;

const Styles = {
	footer: {
		position: 'relative',
		bottom: 0,
		width: '80%',
		height: '60px',
		lineHeight: '60px'
	},
	text: {
		position: 'absolute',
		right: 0
	}
}