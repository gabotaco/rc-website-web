import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const CompanyMembersFilter = props => {
	const [manager, setManagers] = useState(false);
	const [rts, setRts] = useState(true);
	const [pigs, setPigs] = useState(true);
	const [fired, setFired] = useState(true);

	const filters = [];
	if (rts) filters.push('rts');
	if (pigs) filters.push('pigs');
	if (fired) filters.push('fired');

	if (manager) {
		props.onFilterChange('manager');
	} else {
		if (filters.length < 1) {
			props.onFilterChange('goo goo gaa gaa');
		} else {
			props.onFilterChange(filters.slice().join('|'));
		}
	}

	function managerOnClick() {
		setManagers(!manager);
	}

	return (
		<ButtonGroup className="mb-2">
			{props.perms > 2 && (
				<Button color="primary" active={manager} onClick={managerOnClick}>
					Manager
				</Button>
			)}
			<Button color="rts" active={rts} onClick={() => setRts(!rts)}>
				RTS
			</Button>
			<Button color="pigs" active={pigs} onClick={() => setPigs(!pigs)}>
				PIGS
			</Button>
			<Button color="yeet" active={fired} onClick={() => setFired(!fired)}>
				YEETED
			</Button>
		</ButtonGroup>
	);
};

export default CompanyMembersFilter;
