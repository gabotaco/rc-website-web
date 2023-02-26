import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoadingIcon from '../../../_presentational/LoadingIcon';
import { useMutation } from '@apollo/client';
import * as queries from '../../../../apollo/queries';

const PayReferralButton = props => {
	const [modal, setModal] = useState(false);
	const [done, setDone] = useState(false);
	const [PAY_REF, {loading}] = useMutation(queries.SET_REF_PAID, {
		onCompleted: (data) => {
			setDone(true);
			toggle();
		},
		onError: (err) => {
			console.error(err);
			alert('There was an error marking their referral as paid');
		},
		variables: {
			id: props.referred_id
		}
	});

	const toggle = () => setModal(!modal);

	function handlePay() {
		PAY_REF();
	}

	return (
		<React.Fragment>
			<Button color="success" onClick={toggle} disabled={modal || done}>
				{modal ? <LoadingIcon /> : done ? 'Paid.' : 'Pay'}
			</Button>
			<Modal isOpen={modal} toggle={toggle} fade>
				<ModalHeader toggle={toggle}>Pay {props.name}</ModalHeader>
				<ModalBody>Are you sure you want to pay them?</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
					<Button color="primary" onClick={handlePay} disabled={loading}>
						{loading ? <LoadingIcon /> : 'Confirm'}
					</Button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
};

export default PayReferralButton;
