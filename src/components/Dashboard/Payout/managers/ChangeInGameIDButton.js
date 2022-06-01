import React, { useState } from 'react';
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	FormFeedback,
} from 'reactstrap';
import LoadingIcon from '../../../_presentational/LoadingIcon';
import { useMutation } from 'react-apollo-hooks';
import * as queries from '../../../../apollo/queries';

const ChangeInGameIDButton = props => {
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const toggle = () => setModal(!modal);
	const [gameID, setGameID] = useState(props.game_id);
	const CHANGE_ID = useMutation(queries.SET_REFERRER_ID);

	function handleClick() {
		if (!gameID || gameID < 1) return;
		setLoading(true);
		CHANGE_ID({
			variables: {
				app_id: props.app_id,
				new_id: gameID,
			},
		})
			.then(() => {
				setLoading(false);
				toggle();
				props.refetch();
			})
			.catch(err => {
				console.error(err);
				setLoading(false);
				alert('There was an error changing their ID');
			});
	}

	return (
		<React.Fragment>
			<Button
				color="success"
				className="ml-1"
				onClick={toggle}
				disabled={modal}>
				{modal ? <LoadingIcon /> : 'Change'}
			</Button>
			<Modal isOpen={modal} toggle={toggle} fade>
				<ModalHeader toggle={toggle}>
					Change {props.employee_name}'s referrer
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>In Game ID:</Label>
							<Input
								invalid={!gameID || gameID < 1}
								type="number"
								placeholder={props.game_id}
								value={gameID}
								onChange={ev => setGameID(parseInt(ev.target.value))}
							/>
							<FormFeedback>
								Please provide a valid ID. Previous ID was {props.game_id}
							</FormFeedback>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
					<Button color="primary" onClick={handleClick} disabled={loading}>
						{loading ? <LoadingIcon /> : 'Confirm'}
					</Button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
};

export default ChangeInGameIDButton;
