// @flow
import * as React from 'react';
import { Container, Col, Row, Card } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class UnderConstruction extends React.Component {
	render() {
		return (
			<>
				<Container className="my-6">
					<Row>
						<Col lg={6} md={9} sm={12}>
							<Card style={Styles.card}>
								<h4>This page is currently under construction</h4>
								<p>Come back soon!</p>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default UnderConstruction;

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
