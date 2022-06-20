// @flow
import React, { useState } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import CustomTable from './CustomTable';

const FilterableTables = props => {
	const [activeFilter, setActiveFilter] = useState(
		props.startingFilter || props.filters[0]
	);

	return (
		<React.Fragment>
			<ButtonGroup className="mb-2">
				{props.filters.map((filter, i) => {
					return (
						<Button
							color="primary"
							key={i}
							active={activeFilter === filter}
							onClick={() => setActiveFilter(filter)}>
							{filter}
						</Button>
					);
				})}
			</ButtonGroup>
			{props.tables.map((table, i) => {
				return (
					<div
						key={i}
						style={{
							display: activeFilter === table.filter ? 'block' : 'none',
						}}>
						<CustomTable
							onCreated={newTable => {
								if (props.onCreated) {
									props.onCreated(table.filter, newTable);
								}
							}}
							headers={table.headers}
							data={table.data}
							format={table.formatter}
							config={table.config}
						/>
					</div>
				);
			})}
		</React.Fragment>
	);
};

export default FilterableTables;
