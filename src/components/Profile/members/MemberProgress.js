import React from 'react';
import MemberDetailsTable from './progress/MemberDetailsTable';
import PigsProgress from './progress/PigsProgress';
import RtsProgress from './progress/RtsProgress';
import * as queries from '../../../apollo/queries';
import LoadingIcon from '../../_presentational/LoadingIcon';
import { useQuery } from '@apollo/client';

const MemberProgress = () => {
	const {loading, error, data} = useQuery(queries.GET_AUTH_USER_PROGRESS);
	if (loading) return <LoadingIcon />;
	if (error) {
		console.error(error);
		return 'There was an error getting your progress';
	}
	const { member, pigs, rts, company } = data.getAuthUserProgress;
	return (
		<div>
			<MemberDetailsTable member={member} />
			<h1>Your progress</h1>
			<PigsProgress member={member} pigs={pigs} company={company} />
			<RtsProgress member={member} rts={rts} company={company} />
		</div>
	);
};

export default MemberProgress;
