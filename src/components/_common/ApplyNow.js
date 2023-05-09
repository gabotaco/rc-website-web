// @flow
import * as React from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import AppConfigs from '../../config/app_configs';

const ApplyNow = props => {
	let applyText = (
		<h1>
			You aren't a member! Apply <a href="/home/apply/">here</a>
		</h1>
	);
	if (props.ttools) {
		applyText = (
			<React.Fragment>
				<h1>
					Your Discord account is not linked to Transport Tycoon. Follow
					<a href="https://discordapp.com/channels/307266366174658560/307284000198754304/713536239877357670">
						the instructions
					</a>
					<a href="https://discord.gg/nQY43P">here</a>
					and try again.
				</h1>
				<h4>
					Instructions post:
					<a href="https://discordapp.com/channels/307266366174658560/307284000198754304/713536239877357670">
						https://discordapp.com/channels/307266366174658560/307284000198754304/713536239877357670
					</a>
					<br />
					Transport Tycoon Discord:{' '}
					<a href="https://discord.gg/nQY43P">https://discord.gg/nQY43P</a>
				</h4>
			</React.Fragment>
		);
	}

	return (
		<div>
			<div style={Styles.ApplyLinkDiv}>{applyText}</div>
			<div>
				<h1>Hire member: (MANAGEMENT ONLY)</h1>
				<Form action={`${AppConfigs.server_url}/api/hire`}>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label for="in-game-id-for-the-hiring-process-only-for-managers">
									In Game ID
								</Label>
								<Input
									type="number"
									name="in_game_id"
									id="in-game-id-for-the-hiring-process-only-for-managers"
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="in-game-name-for-the-hiring-process-only-for-managers">
									In Game Name
								</Label>
								<Input
									type="text"
									name="in_game_name"
									id="in-game-name-for-the-hiring-process-only-for-managers"
								/>
							</FormGroup>
						</Col>
					</Row>
					<Button color="primary">Hire</Button>
				</Form>
			</div>
		</div>
	);
};

export default ApplyNow;

const Styles = {
	ApplyLinkDiv: {
		height: '100vh',
	},
};
