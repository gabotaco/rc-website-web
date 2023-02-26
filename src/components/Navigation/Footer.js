import React from 'react';
import { Container } from 'reactstrap';

const Footer = () => {
	function redirect() {
		window.open('https://github.com/Gabolicious/rc-website-web', '_blank');
	}

	return (
		<footer style={Styles.footer}>
			<Container>
				<span className="text-muted" style={Styles.text}>
					made with <i className="fa fa-heart heart" /> by Gabo.{' '}
					<a
						onClick={redirect}
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/Gabolicious/rc-website-server">
						Source
					</a>
				</span>
			</Container>
		</footer>
	);
}

export default Footer;

const Styles = {
	footer: {
		position: 'relative',
		bottom: 0,
		width: '83%',
		height: '60px',
		lineHeight: '60px',
	},
	text: {
		position: 'absolute',
		right: 0,
	},
};
