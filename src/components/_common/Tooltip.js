import React, { useState } from 'react';
import { Tooltip as ReactTip } from 'reactstrap';

const Tooltip = props => {
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const toggle = () => setTooltipOpen(!tooltipOpen);

	return (
		<ReactTip
			placement={props.placement}
			target={props.target}
			isOpen={tooltipOpen}
			toggle={toggle}>
			{props.children}
		</ReactTip>
	);
};

export default Tooltip;
