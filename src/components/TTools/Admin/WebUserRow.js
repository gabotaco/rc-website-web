import * as queries from '../../../apollo/queries';

import {
	Button,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from 'reactstrap';
import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

const WebUserRow = props => {
	const [userPerm, setUserPerm] = useState(props.user.permission);
	const [oldUserPerm, setOldUserPerm] = useState(userPerm);
	const [userId, setUserId] = useState(props.user.in_game_id);
	const [modal, setModal] = useState(false);
	const [newUserId, setNewUserId] = useState();
	const [oldUserId, setOldUserId] = useState(userId);
	const toggle = () => setModal(!modal);

	const [SET_USER_PERM, {}] = useMutation(queries.SET_USER_PERM, {
		variables: {
			id: parseInt(props.user.id),
			perm: userPerm,
		},
		onError: err => {
			console.error(err);
			setUserPerm(oldUserPerm);
		},
	});
	const [SET_USER_ID, {}] = useMutation(queries.SET_USER_ID, {
		variables: {
			id: parseInt(props.user.id),
			in_game_id: newUserId,
		},
		onError: err => {
			console.error(err);
			setUserId(oldUserId);
		},
	});

	function handleSelectChange(ev) {
		setOldUserPerm(userPerm);
		setUserPerm(parseInt(ev.target.value));
		SET_USER_PERM();
	}

	function validInGameID() {
		return newUserId && !isNaN(parseInt(newUserId)) && newUserId >= 1;
	}

	function handleInGameChange() {
		if (!validInGameID()) return;
		setOldUserId(userId);
		setUserId(newUserId);
		toggle();
		SET_USER_ID();
	}

	return (
		<tr key={props.user.id}>
			<td>{props.user.discord_id}</td>
			<td>
				{userId}
				<Button onClick={toggle} color="success" className="float-right">
					Change
				</Button>
				<Modal isOpen={modal} toggle={toggle} fade>
					<ModalHeader toggle={toggle}>
						Change {props.user.discord_id}'s in game id
					</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label>In Game ID:</Label>
								<Input
									invalid={!validInGameID()}
									type="number"
									placeholder={userId}
									value={newUserId}
									onChange={ev => setNewUserId(parseInt(ev.target.value))}
								/>
								<FormFeedback>Please provide an ID</FormFeedback>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={toggle}>
							Cancel
						</Button>
						<Button color="primary" onClick={handleInGameChange}>
							Change
						</Button>
					</ModalFooter>
				</Modal>
			</td>
			<td data-order={userPerm}>
				<Input
					value={userPerm}
					type="select"
					className="form-control"
					disabled={
						props.user.discord_id === props.authorizedUser.discord_id ||
						userPerm >= props.authorizedUser.ttpermission
					}
					onChange={handleSelectChange}>
					<option
						value="3"
						disabled={
							props.user.discord_id === '404650985529540618' ||
							props.authorizedUser.ttpermission <= 3
						}>
						Can grant/revoke permissions
					</option>
					<option value="2" disabled={props.authorizedUser.ttpermission <= 2}>
						Can search Storage and Businesses of others
					</option>
					<option value="1" disabled={props.authorizedUser.ttpermission <= 1}>
						Can search Player Information of others
					</option>
					<option value="0" disabled={props.authorizedUser.ttpermission <= 0}>
						Sees only their information
					</option>
				</Input>
			</td>
		</tr>
	);
};

export default WebUserRow;
