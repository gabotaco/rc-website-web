import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from 'reactstrap';

import React from 'react';
import { withRouter } from 'react-router-dom';

const TToolsDropdownMenu = ({ history, routeName }) => {
	function redirect(event, page) {
		event.preventDefault();
		history.push(page);
		return false;
	}

	return (
		<UncontrolledDropdown nav inNavbar setActiveFromChild>
			<DropdownToggle caret nav>
				TTools
			</DropdownToggle>
			<DropdownMenu end>
				<DropdownItem
					href="/home/ttools"
					onClick={e => redirect(e, '/home/ttools')}
					active={routeName === 'TTools Home'}>
					<i className={'bi bi-house'} style={Styles.icon} />
					Home
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem
					href="/home/ttools/biz"
					onClick={e => redirect(e, '/home/ttools/biz')}
					active={routeName === 'Businesses'}>
					<i className={'bi bi-building'} style={Styles.icon} />
					Businesses
				</DropdownItem>
				<DropdownItem
					href="/home/ttools/storage"
					onClick={e => redirect(e, '/home/ttools/storage')}
					active={routeName === 'Storages'}>
					<i className={'bi bi-archive'} style={Styles.icon} />
					Storages
				</DropdownItem>
				<DropdownItem
					href="/home/ttools/trucking"
					onClick={e => redirect(e, '/home/ttools/trucking')}
					active={routeName === 'Trucking'}>
					<i className={'bi bi-truck'} style={Styles.icon} />
					Trucking
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem
					href="/home/ttools/completionist"
					onClick={e => redirect(e, '/home/ttools/completionist')}
					active={routeName === 'Completionist'}>
					<i className={'bi bi-check-circle'} style={Styles.icon} />
					Completionist
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	);
};

export default withRouter(TToolsDropdownMenu);

const Styles = {
	icon: {
		marginRight: '10px',
		transition: 'opacity 0.3s !important',
		transform: 'rotate(0deg) !important',
		display: 'inline-block',
	},
};
