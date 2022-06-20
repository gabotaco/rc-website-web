import React, { useState } from 'react';
import * as queries from '../../../apollo/queries';
import { useMutation } from 'react-apollo-hooks';
import {
	Input,
	Modal,
	Button,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	FormFeedback,
	ModalFooter,
} from 'reactstrap';

const WebUserRow = props => {
	const SET_USER_PERM = useMutation(queries.SET_USER_PERM);
	const SET_USER_ID = useMutation(queries.SET_USER_ID);
	const [userPerm, setUserPerm] = useState(props.user.permission);
	const [userId, setUserId] = useState(props.user.in_game_id);
	const [modal, setModal] = useState(false);
	const [newUserId, setNewUserId] = useState();
	const toggle = () => setModal(!modal);

	function handleSelectChange(ev) {
		const oldPerm = userPerm;
		const perm = parseInt(ev.target.value);
		setUserPerm(perm);
		SET_USER_PERM({
			variables: {
				id: parseInt(props.user.id),
				perm: perm,
			},
		}).catch(() => setUserPerm(oldPerm));
	}

	function validInGameID() {
		return newUserId && !isNaN(parseInt(newUserId)) && newUserId >= 1;
	}

	function handleInGameChange() {
		if (!validInGameID()) return;
		const oldId = userId;
		setUserId(newUserId);
		toggle();
		SET_USER_ID({
			variables: {
				id: parseInt(props.user.id),
				in_game_id: newUserId,
			},
		}).catch(() => setUserId(oldId));
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
