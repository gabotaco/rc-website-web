import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import * as Api from '../../library/Api/api';
import LoadingIcon from '../_presentational/LoadingIcon';

const RestartButton = ({ history, authorizedUser }) => {
	const [content, setContent] = useState('Restart Alfred');
	const [loading, setLoading] = useState(false);

	function restartAlfred() {
		setLoading(true);
		Api.restartAlfred()
			.then(() => {
				setContent('Restarted.');
				setLoading(false);
			})
			.catch(err => {
				console.error(err);
				setContent('Failed.');
				setLoading(false);
			});
	}

	return (
		<>
			<Button
				color="danger"
				id="restart-button"
				type="button"
				size="lg"
				onClick={restartAlfred}
				disabled={loading}>
				{loading ? <LoadingIcon /> : content}
			</Button>
		</>
	);
};

export default withRouter(RestartButton);
