import React from 'react';
import * as queries from '../../apollo/queries';
import LoadingIcon from '../_presentational/LoadingIcon';
import { useQuery } from '@apollo/client';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const AuthUserStatus = ({
	setPendingApplication,
	setAppStatus,
	setNewHire,
	modal2,
	toggle2,
	applicationSteps,
	applicationStep,
	handleConfirm,
	gameIdLoading,
}) => {
	const { loading, error, data } = useQuery(queries.GET_AUTH_USER_STATUS);

	if (loading) return <LoadingIcon />;
	if (error) {
		console.error(error);
		return 'There was an error authenticating your request';
	}

	if (data.getAuthUserStatus) {
		var { status } = data.getAuthUserStatus;
	}

	if (status && status !== 'Rejected') {
		setPendingApplication(true);
		setAppStatus(status);
		return <React.Fragment></React.Fragment>;
	} else if (status === 'Rejected') {
		setAppStatus(status);
	}

	setNewHire(true);

	return (
		<Modal
			fade
			isOpen={modal2}
			toggle={toggle2}
			backdrop={'static'}
			size="lg"
			keyboard={false}>
			<ModalHeader toggle={toggle2}>
				{applicationSteps[applicationStep].header}
			</ModalHeader>
			<ModalBody>{applicationSteps[applicationStep].body}</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={toggle2}>
					Cancel
				</Button>
				<Button
					color="primary"
					onClick={handleConfirm}
					disabled={gameIdLoading}>
					{gameIdLoading ? (
						<LoadingIcon inline />
					) : (
						applicationSteps[applicationStep].next || 'Next'
					)}
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default AuthUserStatus;
