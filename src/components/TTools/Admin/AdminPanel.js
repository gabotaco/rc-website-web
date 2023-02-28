import * as Api from '../../../library/Api/api';

import {
	Col,
	Collapse,
	Container,
	Nav,
	NavItem,
	Navbar,
	NavbarToggler,
	Row,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';

import CustomPaginatedTable from '../../_common/CustomPaginatedTable';
import FormattedNumber from '../../_common/FormattedNumber';
import { GET_PAGINATED_WEB_USERS } from '../../../apollo/paginatedQueries';
import LoadingIcon from '../../_presentational/LoadingIcon';
import WebUserRow from './WebUserRow';
import $ from 'jquery';

const AdminPanel = props => {
	const [collapsed, setCollapsed] = useState(false);
	const [charges, setCharges] = useState(<LoadingIcon />);
	const toggleNavbar = () => setCollapsed(!collapsed);

	function getVisible() {
		if (window.innerWidth <= 1199.98) {
			document.getElementById('left-nav').style.top = '0px';
			return;
		}
		const $el = $('#navbar');
		const scrollTop = $(this).scrollTop();
		const scrollBot = scrollTop + $(this).height();
		const elTop = $el.offset().top;
		const elBottom = elTop + $el.outerHeight();
		const visibleTop = elTop < scrollTop ? scrollTop : elTop;
		const visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;

		if (visibleBottom - visibleTop < 0) {
			document.getElementById('left-nav').style.top = '0px';
		} else {
			document.getElementById('left-nav').style.top =
				visibleBottom - visibleTop + 'px';
		}
	}

	const formatter = (user, key) => {
		return (
			<WebUserRow key={key} user={user} authorizedUser={props.authorizedUser} />
		);
	};

	useEffect(() => {
		Api.getCharges()
			.then(response => {
				setCharges(<FormattedNumber num={response[0]} />);
			})
			.catch(err => {
				console.error(err);
				setCharges('UNKNOWN');
			});

		getVisible();
		$(window).on('scroll resize', getVisible);
		document.onresize = function () {
			getVisible();
		};
	}, []);

	return (
		<Container fluid style={Style.container}>
			<Row>
				<Col md="2" style={Style.leftColumn}>
					<Navbar
						expand="xl"
						dark
						fixed="left"
						className="overflow-auto"
						style={Style.navbar}
						id="left-nav">
						<NavbarToggler onClick={toggleNavbar} />
						<Collapse navbar isOpen={!collapsed}>
							<Nav navbar vertical>
								<h3>Key Info</h3>
								<NavItem>Current Charges: {charges}</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</Col>
				<Col xl="10" style={Style.rightColumn}>
					<h1 className="text-center">Linked Website Users</h1>

					<CustomPaginatedTable
						config={config}
						headers={Headers}
						query={GET_PAGINATED_WEB_USERS}
						format={formatter}
						page={1}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default AdminPanel;

const Style = {
	container: {
		marginLeft: '0px',
		paddingLeft: '0px',
	},
	leftColumn: {
		paddingLeft: '0px',
	},
	rightColumn: {
		paddingLeft: '35px',
	},
	navbar: {
		backgroundColor: '#2e2e2e',
		maxHeight: '100vh',
	},
};

const config = {
	id: 'admin-table',
	jquery: {
		order: [[2, 'desc']],
	},
};

const Headers = ['Discord ID', 'In Game ID', 'Perms'];
