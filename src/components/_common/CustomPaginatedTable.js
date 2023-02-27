// @flow

import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import FormattedNumber from './FormattedNumber';
import LoadingIcon from '../_presentational/LoadingIcon';
import { useLazyQuery } from '@apollo/client';

const CustomPaginatedTable = props => {
	const [currentPage, setCurrentPage] = useState(0);
	const [pageCount, setPageCount] = useState(1);
	const [totalRows, setTotalRows] = useState(0);
	const [totalRowsFiltered, setTotalRowsFiltered] = useState(0);
	const [rowCount, setRowCount] = useState(10);
	const [pageButtons, setPageButtons] = useState([]);
	const [headers, setHeaders] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [textFilter, setTextFilter] = useState('');
	const [textFilterTimeout, setTextFilterTimeout] = useState(null);
	const [queryFilters, setQueryFilters] = useState(null);

	const [getData, { loading, error }] = useLazyQuery(props.query, {
		fetchPolicy: 'network-only',

		onCompleted: data => {
			const dataName =
				props.query.definitions[0].selectionSet.selections[0].name.value;
			const totalName =
				props.query.definitions[0].selectionSet.selections[1].name.value;
			const { [dataName]: getUsers, [totalName]: getTotal } = data;

			setTableData(getUsers.rows);
			setTotalRows(getTotal);
			setTotalRowsFiltered(getUsers.count);

			const lastPage = Math.ceil(getUsers.count / rowCount);
			setPageCount(lastPage);

			if (currentPage > lastPage) {
				setCurrentPage(lastPage);
			}
		},
		onError: error => {
			console.error(error);
		},
	});

	useEffect(() => {
		setHeaders(props.headers);
		setQueryFilters(props.filters);

		if (props.page) updateCurrentPage(props.page);
		else setCurrentPage(1);
	}, []);

	useEffect(() => {
		if (props.filters) {
			setQueryFilters(props.filters);
			getData({
				variables: {
					limit: rowCount,
					offset: (currentPage - 1) * rowCount,
					textFilter: textFilter,
					filter: props.filters,
				},
			});
		}
	}, [props.filters]);

	useEffect(() => {
		setPageButtons(PaginationButtons());
	}, [tableData, rowCount]);

	function updateLimit(limit) {
		const intLimit = parseInt(limit);

		// Calculate the offset based on old limit and new limit, so the table doesn't jump around
		const offset = Math.floor((currentPage * rowCount) / intLimit);

		setRowCount(intLimit);
		setCurrentPage(offset);

		getData({
			variables: {
				limit: intLimit,
				offset: (offset - 1) * intLimit,
				textFilter: textFilter,
				filter: queryFilters,
			},
		});
	}

	function updateCurrentPage(page) {
		if (currentPage === page) return;

		setCurrentPage(page);
		getData({
			variables: {
				limit: rowCount,
				offset: (page - 1) * rowCount,
				textFilter: textFilter,
				filter: queryFilters,
			},
		});
	}

	function updateTextFilter(text) {
		// If the user is typing, wait 100ms before sending the query
		if (textFilterTimeout) clearTimeout(textFilterTimeout);
		setTextFilterTimeout(
			setTimeout(() => {
				setTextFilter(text);
				getData({
					variables: {
						limit: rowCount,
						offset: (currentPage - 1) * rowCount,
						textFilter: text,
						filter: queryFilters,
					},
				});
			}, 100)
		);
	}

	function PaginationButtons() {
		// If there are less than 5 pages, display all of them
		if (pageCount <= 5) {
			let buttons = [];
			for (let i = 2; i < pageCount + 1; i++) {
				buttons.push(
					<PaginationItem key={i} className={currentPage === i ? 'active' : ''}>
						<PaginationLink onClick={() => updateCurrentPage(i)}>
							{i}
						</PaginationLink>
					</PaginationItem>
				);
			}
			return buttons;
		}

		if (currentPage > 3 && currentPage < pageCount - 2) {
			// If the current page is in the middle, display the current page and the two pages before and after it
			return (
				<>
					<PaginationItem disabled key="ellipsis1">
						<PaginationLink disabled>...</PaginationLink>
					</PaginationItem>

					<PaginationItem key="current-page" className={'active'}>
						<PaginationLink>{currentPage}</PaginationLink>
					</PaginationItem>

					<PaginationItem disabled key="ellipsis2">
						<PaginationLink disabled>...</PaginationLink>
					</PaginationItem>
				</>
			);
		} else if (currentPage <= 3) {
			// If the current page is 1, 2, 3 display them and then ellipsis
			return (
				<>
					<PaginationItem
						key="second-page"
						className={currentPage === 2 ? 'active' : ''}>
						<PaginationLink onClick={() => updateCurrentPage(2)}>
							2
						</PaginationLink>
					</PaginationItem>

					<PaginationItem
						key="third-page"
						className={currentPage === 3 ? 'active' : ''}>
						<PaginationLink onClick={() => updateCurrentPage(3)}>
							3
						</PaginationLink>
					</PaginationItem>

					<PaginationItem disabled key="ellipsis2">
						<PaginationLink disabled>...</PaginationLink>
					</PaginationItem>
				</>
			);
		} else if (currentPage >= pageCount - 2 && pageCount > 5) {
			// If the current page is the third last, second last or last page, display them and then ellipsis
			return (
				<>
					<PaginationItem disabled key="ellipsis1">
						<PaginationLink disabled>...</PaginationLink>
					</PaginationItem>

					<PaginationItem
						key="third-last-page"
						className={currentPage === pageCount - 2 ? 'active' : ''}>
						<PaginationLink onClick={() => updateCurrentPage(pageCount - 2)}>
							{pageCount - 2}
						</PaginationLink>
					</PaginationItem>

					<PaginationItem
						key="second-last-page"
						className={currentPage === pageCount - 1 ? 'active' : ''}>
						<PaginationLink onClick={() => updateCurrentPage(pageCount - 1)}>
							{pageCount - 1}
						</PaginationLink>
					</PaginationItem>
				</>
			);
		}
	}

	if (!headers) return <LoadingIcon />;

	return (
		<div className="table-responsive">
			<div className="dataTables_wrapper dt-bootstrap4 no-footer">
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="dataTables_length">
							<label>
								Show{' '}
								<select
									className="form-control dataTables_length"
									onChange={e => updateLimit(e.target.value)}>
									<option value="10" defaultChecked>
										10
									</option>
									<option value="25">25</option>
									<option value="50">50</option>
									<option value="100">100</option>
								</select>{' '}
								entries
							</label>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="dataTables_filter">
							<label>
								Search:{' '}
								<input
									type="search"
									className="form-control input-sm"
									placeholder=""
									onChange={e => updateTextFilter(e.target.value)}
								/>
							</label>
						</div>
					</div>
				</div>
				{loading && <LoadingIcon />}
				<Table hover id={props.config.id}>
					<thead>
						<tr>
							{headers.map((header, key) => {
								return (
									<th scope="col" key={key}>
										{header}
									</th>
								);
							})}
						</tr>
					</thead>
					{error && ';('}
					<tbody>
						{tableData.length > 0 &&
							tableData.map(data => {
								return props.format(data, data.id);
							})}
					</tbody>
				</Table>
				<div className="row">
					<div className="col-12 col-md-5">
						<div className="dataTables_info">
							Showing{' '}
							{currentPage ? (
								<FormattedNumber num={(currentPage - 1) * rowCount + 1} />
							) : (
								1
							)}{' '}
							to{' '}
							{(currentPage - 1) * rowCount + rowCount > totalRows ? (
								<FormattedNumber num={totalRows} />
							) : (
								<FormattedNumber
									num={
										totalRowsFiltered < (currentPage - 1) * rowCount + rowCount
											? totalRowsFiltered
											: (currentPage - 1) * rowCount + rowCount
									}
								/>
							)}{' '}
							of {<FormattedNumber num={totalRowsFiltered} />} entries{' '}
							{textFilter ? `(filtered from ${totalRows} total entries)` : ''}
						</div>
					</div>
					<div className="col-12 col-md-7">
						<div className="dataTables_paginate paging_simple_numbers">
							<Pagination>
								<PaginationItem disabled={currentPage === 1} key="previous">
									<PaginationLink
										onClick={() => updateCurrentPage(currentPage - 1)}>
										Previous
									</PaginationLink>
								</PaginationItem>

								<PaginationItem
									key="first"
									className={currentPage === 1 ? 'active' : ''}>
									<PaginationLink onClick={() => updateCurrentPage(1)}>
										1
									</PaginationLink>
								</PaginationItem>

								{pageButtons}

								{pageCount > 5 && (
									<PaginationItem
										key="last"
										className={currentPage === pageCount ? 'active' : ''}>
										<PaginationLink
											onClick={() => updateCurrentPage(pageCount)}>
											{pageCount}
										</PaginationLink>
									</PaginationItem>
								)}

								<PaginationItem disabled={currentPage >= pageCount} key="next">
									<PaginationLink
										onClick={() => updateCurrentPage(currentPage + 1)}>
										Next
									</PaginationLink>
								</PaginationItem>
							</Pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomPaginatedTable;
