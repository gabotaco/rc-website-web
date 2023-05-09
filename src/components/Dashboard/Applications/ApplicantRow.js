import React, { useState } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	FormFeedback,
	Input,
	Label,
} from 'reactstrap';
import LoadingIcon from '../../_presentational/LoadingIcon';
import DoneIcon from '../../_presentational/DoneIcon';
import * as Api from '../../../library/Api/api';
import { useMutation } from '@apollo/client';
import * as queries from '../../../apollo/queries';

const ApplicantRow = ({ applicant }) => {
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [app, setApp] = useState(applicant);
	const [rejectReason, setRejectReason] = useState(undefined);
	const [newStatus, setNewStatus] = useState(
		app.status_info === null ? '' : app.status_info.replace(/.*?:\s/, '')
	);
	const [contactStatus, setContactStatus] = useState('WAITING');
	const [rejectStatus, setRejectStatus] = useState('WAITING');
	const [hireStatus, setHireStatus] = useState('WAITING');
	const [newStatusStatus, setNewStatusStatus] = useState('WAITING');
	const toggle = () => setModal(!modal);

	const [SET_APPLICANT_CONTACTED, {}] = useMutation(
		queries.SET_APPLICANT_CONTACTED,
		{
			onCompleted: data => {
				setContactStatus('DONE');
				setApp({
					...app,
					status: 'Contacted',
					status_info: data.setApplicantContacted,
				});
			},
			onError: err => {
				console.error(err);
				setContactStatus('WAITING');
				alert('Error setting applicant to contacted.');
			},
			variables: {
				id: app.id,
			},
		}
	);
	const [SET_APPLICANT_REJECTED, {}] = useMutation(
		queries.SET_APPLICANT_REJECTED,
		{
			onCompleted: data => {
				setRejectStatus('DONE');
				setApp({ ...app, status: 'Rejected', status_info: rejectReason });
			},
			onError: err => {
				console.error(err);
				setRejectStatus('WAITING');
				alert('Error setting applicant to reject.');
			},
			variables: {
				id: app.id,
				reason: rejectReason,
			},
		}
	);
	const [UPDATE_APPLICANT_STATUS_INFO, {}] = useMutation(
		queries.UPDATE_APPLICANT_STATUS_INFO,
		{
			onCompleted: data => {
				setNewStatusStatus('DONE');
				setApp({
					...app,
					status_info: data.updateApplicantStatusInfo,
				});
			},
			onError: err => {
				console.error(err);
				setNewStatusStatus('WAITING');
				alert('There was an error updating the applicants status');
			},
			variables: {
				id: app.id,
				status_info: newStatus,
			},
		}
	);

	function handleDetailsClick() {
		setLoading(true);
		Api.getApplicantDetails(app.id)
			.then(response => {
				setLoading(false);
				setApp(response);
				toggle();
			})
			.catch(err => {
				console.error(err);
				alert('There was an error getting applicant details');
				setLoading(false);
			});
	}

	function handleContactClick() {
		setContactStatus('LOADING');
		SET_APPLICANT_CONTACTED();
	}

	function handleRejectClick() {
		if (!rejectReason) {
			return setRejectReason('');
		}
		setRejectStatus('LOADING');
		SET_APPLICANT_REJECTED();
	}

	function handleNewStatusClick() {
		if (!newStatus || app.status !== 'Contacted') return;
		setNewStatusStatus('LOADING');
		UPDATE_APPLICANT_STATUS_INFO();
	}

	function handleHireClick() {
		if (!app.in_discord) return;
		setHireStatus('LOADING');
		Api.hire(
			app.company,
			app.in_game_name,
			app.in_game_id,
			app.discord_id,
			app.id
		)
			.then(() => {
				setHireStatus('DONE');
				setApp({ ...app, status: 'Hired', status_info: null });
			})
			.catch(err => {
				console.error(err);
				setHireStatus('WAITING');
				alert('Error hiring applicant');
			});
	}

	return (
		<tr key={app.id}>
			<Modal isOpen={modal} toggle={toggle} size="lg" fade>
				<ModalHeader toggle={toggle}>
					Details for {app.in_game_name} ({app.in_game_id}){' '}
					{app.in_discord ? (
						<span className="font-weight-bold text-success">
							This member is in Discord!
						</span>
					) : (
						<span className="font-weight-bold text-danger">
							This member isn't in Discord!
						</span>
					)}{' '}
					({app.discord_id})
				</ModalHeader>
				<ModalBody>
					<Form noValidate>
						<FormGroup>
							<Label>
								This sounds serious but it's totally not! Why should we choose
								you?
							</Label>
							<Input type="textarea" rows="3" value={app.why} readOnly />
						</FormGroup>
						<FormGroup>
							<Label>
								Say anything! (Hobbies, interests, field of work, whatever makes
								you, you!)
							</Label>
							<Input type="textarea" rows="3" value={app.anything} readOnly />
						</FormGroup>
						<FormGroup>
							<Label>How much do you play per week right now?</Label>
							<Input type="text" value={app.play_per_week} readOnly />
						</FormGroup>
					</Form>
					<Button color="primary" className="mr-1" onClick={handleContactClick}>
						{contactStatus === 'WAITING' ? (
							'Contact'
						) : contactStatus === 'LOADING' ? (
							<LoadingIcon />
						) : (
							<DoneIcon sizeClass={'glimpsicon-btn'} />
						)}
					</Button>
					<Button
						color="success"
						disabled={!app.in_discord}
						onClick={handleHireClick}>
						{hireStatus === 'WAITING' ? (
							'Hire'
						) : hireStatus === 'LOADING' ? (
							<LoadingIcon />
						) : (
							<DoneIcon sizeClass={'glimpsicon-btn'} />
						)}
					</Button>
					<Form inline className="my-2" noValidate>
						<Label className="sr-only">Status Reason</Label>
						<Input
							disabled={app.status !== 'Contacted'}
							invalid={newStatus !== undefined && newStatus.length === 0}
							type="text"
							className="mr-1"
							placeholder="New Status"
							required
							value={newStatus}
							onChange={ev => setNewStatus(ev.target.value)}
						/>
						<Button
							disabled={app.status !== 'Contacted'}
							color="secondary"
							onClick={handleNewStatusClick}>
							{newStatusStatus === 'WAITING' ? (
								'Update Status'
							) : newStatusStatus === 'LOADING' ? (
								<LoadingIcon />
							) : (
								<DoneIcon sizeClass={'glimpsicon-btn'} />
							)}
						</Button>
						<FormFeedback>
							Please specify a status and make sure the applicant has been
							contacted.
						</FormFeedback>
					</Form>
					<Form inline className="my-2" noValidate>
						<Label className="sr-only">Rejected Reason</Label>
						<Input
							invalid={rejectReason !== undefined && rejectReason.length === 0}
							type="text"
							className="mr-1"
							placeholder="Reject reason"
							required
							value={rejectReason}
							onChange={ev => setRejectReason(ev.target.value)}
						/>
						<Button color="danger" onClick={handleRejectClick}>
							{rejectStatus === 'WAITING' ? (
								'Reject'
							) : rejectStatus === 'LOADING' ? (
								<LoadingIcon />
							) : (
								<DoneIcon sizeClass={'glimpsicon-btn'} />
							)}
						</Button>
						<FormFeedback>Please specify a reason.</FormFeedback>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={toggle}>
						Done
					</Button>
				</ModalFooter>
			</Modal>
			<td>
				{app.status_info
					? app.status === 'Contacted'
						? app.status_info
						: `${app.status} (${app.status_info})`
					: app.status}
			</td>
			<td>{app.company.toUpperCase()}</td>
			<td>
				{app.in_game_id} {app.in_game_name}
			</td>
			<td>{app.country}</td>
			<td data-order={new Date(app.createdAt).toISOString()}>
				{new Date(app.createdAt).toDateString()}
			</td>
			<td>
				<Button color="info" onClick={handleDetailsClick} disabled={loading}>
					{loading ? <LoadingIcon /> : 'Details'}
				</Button>
			</td>
		</tr>
	);
};

export default ApplicantRow;
