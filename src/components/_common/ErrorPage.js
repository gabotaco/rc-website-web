// @flow
import * as React from 'react';
import { Container, Col, Row, Card } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
	return (
		<>
			<Container className="my-6">
				<Row>
					<Col lg={6} md={9} sm={12}>
						<Card style={Styles.card}>
							<h1>404</h1>
							<h4>Welcome to the dank side.</h4>
							<p>
								Sorry bud... Lets make like a hippie and{' '}
								<NavLink
									style={Styles.secondaryActionLink}
									to="/home/"
									className="nav-link">
									blow this joint
								</NavLink>
							</p>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default ErrorPage;

const Styles = {
	card: {
		padding: '20px 40px',
		textAlign: 'center',
	},
	secondaryFooter: {
		textAlign: 'center',
	},
	offsetText: {
		color: '#999',
	},
	secondaryActionLink: {
		margin: 0,
		padding: 0,
		display: 'inline',
		color: '#fbc658',
	},
};
