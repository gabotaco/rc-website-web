import * as queries from '../../../../apollo/queries';

import {
	Button,
	ButtonGroup,
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

import LoadingIcon from '../../../_presentational/LoadingIcon';
import { useMutation } from '@apollo/client';

const CompanySelector = props => {
	const { member, perms } = props;

	const [modal, setModal] = useState(false);
	const [fireReason, setFireReason] = useState(member.fire_reason);
	const [welcome, setWelcome] = useState(member.welcome);

	const [SET_MANAGER] = useMutation(queries.SET_MEMBER_MANAGER, {
		variables: {
			uid: member.id,
			manager: !member.manager,
		},
		onError: err => {
			console.error(err);
			alert('There was an error making them a manager');
		},
	});
	const [CHANGE_COMPANY] = useMutation(queries.SET_MEMBER_COMPANY, {
		onError: err => {
			console.error(err);
			alert('There was an error changing their company');
		},
	});
	const [FIRE_MEMBER, { loading }] = useMutation(queries.FIRE_MEMBER, {
		variables: {
			uid: member.id,
			reason: encodeURIComponent(fireReason),
			welcome: welcome,
		},
		onCompleted: () => {
			toggle();
		},
		onError: err => {
			console.error(err);
			alert('There was an error firing this memeber');
		},
	});

	const toggle = () => setModal(!modal);

	function managerOnClick() {
		SET_MANAGER();
	}

	function rtsOnClick() {
		if (member.company === 'rts') return;

		alert(`RTS Rank: ${member.rts_rank}`);
		CHANGE_COMPANY({
			variables: {
				uid: member.id,
				company: 'rts',
			},
		});
	}

	function pigsOnClick() {
		if (member.company === 'pigs') return;

		alert(`PIGS Rank: ${member.pigs_rank}`);
		CHANGE_COMPANY({
			variables: {
				uid: member.id,
				company: 'pigs',
			},
		});
	}

	function fireOnClick() {
		FIRE_MEMBER();
	}

	return (
		<React.Fragment>
			<ButtonGroup>
				{perms > 2 && (
					<Button
						onClick={managerOnClick}
						color={member.manager ? 'success' : 'primary'}
						disabled={!member.welcome || member.company === 'fired'}>
						Manager
					</Button>
				)}
				<Button
					onClick={rtsOnClick}
					color="rts"
					active={member.company === 'rts'}
					disabled={!member.welcome}>
					RTS
				</Button>
				<Button
					onClick={pigsOnClick}
					color="pigs"
					active={member.company === 'pigs'}
					disabled={!member.welcome}>
					PIGS
				</Button>
				<Button
					onClick={toggle}
					color="yeet"
					active={member.company === 'fired'}
					disabled={modal}>
					YEET
				</Button>
			</ButtonGroup>
			<Modal isOpen={modal} toggle={toggle} fade>
				<ModalHeader toggle={toggle}>Fire {member.in_game_name}</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>Fire Reason:</Label>
							<Input
								invalid={!fireReason}
								type="text"
								value={fireReason}
								onChange={ev => setFireReason(ev.target.value)}></Input>
							<FormFeedback>Please provide a reason.</FormFeedback>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input
									type="checkbox"
									checked={welcome}
									onClick={() => setWelcome(!welcome)}></Input>
								Welcome Back?
							</Label>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
					<Button color="danger" onClick={fireOnClick} disabled={loading}>
						{loading ? <LoadingIcon /> : 'Fire'}
					</Button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
};

export default CompanySelector;
