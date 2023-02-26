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
	Row,
} from 'reactstrap';
import LoadingIcon from '../../../_presentational/LoadingIcon';
import { useMutation } from '@apollo/client';
import * as queries from '../../../../apollo/queries';

const EditDeadlineButton = props => {
	const { member } = props;
	const [modal, setModal] = useState(false);
	const [deadline, setDeadline] = useState(
		new Date(member.deadline).toISOString().split('T')[0]
	);
	const [SET_DEADLINE, {loading}] = useMutation(queries.SET_MEMBER_DEADLINE, {
		onCompleted: (data) => {
			toggle();
		},
		onError: (err) => {
			console.error(err);
			alert('There was an error changing their deadline');
		}
	});

	const toggle = () => setModal(!modal);

	function change() {
		if (!new Date(deadline)) return;
		const newDeadline = new Date(deadline);
		newDeadline.setDate(newDeadline.getDate() + 1);
		SET_DEADLINE({
			variables: {
				uid: member.id,
				deadline: newDeadline.toISOString().split('T')[0],
			},
		});
	}

	function set7Days() {
		const d = new Date();
		d.setDate(d.getDate() + 7);
		setDeadline(d.toISOString().split('T')[0]);
	}

	function addWeek() {
		const d = new Date(deadline);
		d.setDate(d.getDate() + 7);
		setDeadline(d.toISOString().split('T')[0]);
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
					Change {member.in_game_name}'s deadline
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>Deadline:</Label>
							<Input
								invalid={!deadline}
								type="date"
								placeholder={
									new Date(member.deadline).toISOString().split('T')[0]
								}
								value={deadline}
								onChange={ev => setDeadline(ev.target.value)}></Input>
							<FormFeedback>
								Please provide a deadline. Previous deadline was{' '}
								{new Date(member.deadline).toISOString().split('T')[0]}
							</FormFeedback>
						</FormGroup>
					</Form>
					<Row className="mx-1">
						<Button color="primary" className="mr-1 col" onClick={set7Days}>
							7 Days
						</Button>
						<Button color="primary" className="col" onClick={addWeek}>
							Add Week
						</Button>
					</Row>
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

export default EditDeadlineButton;
