import React, { useState } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	FormFeedback,
} from 'reactstrap';
import LoadingIcon from '../../../_presentational/LoadingIcon';
import { useMutation } from '@apollo/client';
import * as queries from '../../../../apollo/queries';

const EditInGameButton = props => {
	const [modal, setModal] = useState(false);
	const [name, setName] = useState(props.member.in_game_name);
	const [id, setId] = useState(props.member.in_game_id);
	const [discord, setDiscord] = useState(props.member.discord_id);
	const [CHANGE_IDENTIFIERS, {loading}] = useMutation(queries.SET_MEMBER_IDENTIFIERS, {
		variables: {
			uid: props.member.id,
			new_name: encodeURIComponent(name),
			new_id: id,
			new_discord: discord,
		},
		onCompleted: (data) => {
			toggle();
		},
		onError: (err) => {
			console.error(err);
			alert('There was an error changing their ID');
		}
	});

	const toggle = () => setModal(!modal);

	function change() {
		if (!name || !id || !discord) return;
		CHANGE_IDENTIFIERS();
	}

	return (
		<React.Fragment>
			<Button
				className="ml-2"
				color="success"
				onClick={toggle}
				disabled={modal}>
				Change
			</Button>
			<Modal isOpen={modal} toggle={toggle} fade>
				<ModalHeader toggle={toggle}>
					Change {props.member.in_game_name}'s identifiers
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>In Game Name:</Label>
							<Input
								invalid={!name}
								type="text"
								placeholder={props.member.in_game_name}
								value={name}
								onChange={ev => setName(ev.target.value)}></Input>
							<FormFeedback>
								Please provide a name. Previous name was "
								{props.member.in_game_name}"
							</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label>In Game ID:</Label>
							<Input
								invalid={!id}
								type="number"
								placeholder={props.member.in_game_id}
								value={id}
								onChange={ev => setId(parseInt(ev.target.value))}></Input>
							<FormFeedback>
								Please provide an ID. Previous ID was {props.member.in_game_id}
							</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label>Discord ID:</Label>
							<Input
								invalid={!discord}
								type="text"
								placeholder={props.member.discord_id}
								value={discord}
								onChange={ev => setDiscord(ev.target.value)}></Input>
							<FormFeedback>
								Please provide a Discord ID. Pervious ID was{' '}
								{props.member.discord_id}
							</FormFeedback>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
					<Button color="primary" onClick={change} disabled={loading}>
						{loading ? <LoadingIcon /> : 'Confirm'}
					</Button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
};

export default EditInGameButton;
