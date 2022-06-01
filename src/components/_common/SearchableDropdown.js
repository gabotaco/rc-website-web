// @flow
import React, { useState, useEffect } from 'react';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Input,
} from 'reactstrap';
import LoadingIcon from '../_presentational/LoadingIcon';

const SearchableDropdown = props => {
	if (props.isLoading) {
		return (
			<Dropdown isOpen={false} toggle={() => {}}>
				<DropdownToggle
					color={'primary'}
					className="form-control"
					disabled={true}>
					{props.isLoading ? <LoadingIcon /> : 'Error loading options'}
				</DropdownToggle>
			</Dropdown>
		);
	}

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);
	const [buttons, setButtons] = useState();

	useEffect(() => {
		setButtons(filterFunction(''));
	}, []);

	function filterFunction(value) {
		if (!Array.isArray(props.data)) {
			return <DropdownItem disabled>{props.data}</DropdownItem>;
		}
		const searchButtons = props.data.reduce((buttons, data) => {
			if (data.searchString.toUpperCase().indexOf(value.toUpperCase()) > -1) {
				buttons.push(
					<DropdownItem
						key={buttons.length}
						onClick={() => props.onSelected(data)}>
						{data.inner}
					</DropdownItem>
				);
			}
			return buttons;
		}, []);

		if (searchButtons.length > 10) {
			return (
				<DropdownItem disabled>
					{searchButtons.length} results. Limit your search.
				</DropdownItem>
			);
		} else if (searchButtons.length === 0) {
			return <DropdownItem disabled>No results.</DropdownItem>;
		}

		return searchButtons;
	}

	return (
		<Dropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle color={'primary'} className="form-control" caret>
				{props.title ? props.title : 'Search'}
			</DropdownToggle>
			<DropdownMenu className="dropdown-menu-extended">
				<Input
					type="text"
					placeholder={props.placeholder || 'Search'}
					onChange={e => setButtons(filterFunction(e.target.value))}
					autoComplete="off"
					className="dropdown-item"
				/>
				<DropdownItem divider />
				{buttons}
			</DropdownMenu>
		</Dropdown>
	);
};

export default SearchableDropdown;
