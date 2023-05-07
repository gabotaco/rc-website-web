import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import CustomTable from '../../_common/CustomTable';

const Vehicles = props => {
	const [showItem, setShowItem] = useState({
		name: '',
		amount: 0,
		weight: 0,
		storages: [],
	});
	const [modal, setModal] = useState(false);
	const [storageData, setStorageData] = useState(null);

	const toggle = () => setModal(!modal);

	const formatter = (item, key) => {
		return (
			<tr key={key}>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		);
	};

	function formatters(storage) {
		return (
			<tr key={storage.name}>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		);
	}

	function resolveItemName(item) {
		if (item.dName) return item.dName;
		if (item.name.startsWith('vehicle_shipment'))
			return item.name.split('|')[2];
		if (item.name.startsWith('rts_card')) return item.name.split('|')[2];
		if (item.name.startsWith('gut_knife')) return item.name.split('|')[0];

		return item.name;
	}

	useEffect(() => {
		if (!props.data) return;

		const items = [];
		props.data.forEach(storage => {
			storage.inventory.forEach(item => {
				// if the item is already in the list, add the weight, amount and storage
				const existingItem = items.find(i => i.name === item.name);
				if (existingItem) {
					existingItem.weight += item.weight;
					existingItem.amount += item.amount;
					existingItem.storages.push({
						name: storage.name,
						amount: item.amount,
						weight: item.weight,
					});
				} else {
					// else add it to the list
					items.push({
						name: resolveItemName(item),
						weight: item.weight,
						amount: item.amount,
						storages: [
							{
								name: storage.name,
								amount: item.amount,
								weight: item.weight,
							},
						],
					});
				}
			});
		});

		props.data.items = items;
		setStorageData(props.data);
	}, [props.data]);

	return (
		<>
			{storageData ? (
				<div>
					<Modal isOpen={modal} toggle={toggle} size="lg" fade>
						<ModalHeader toggle={toggle}>
							{showItem.name + ' (Storage Locations)'}
						</ModalHeader>
						<ModalBody>
							<CustomTable
								headers={['Storage', 'Amount', 'Weight', 'Storage Used']}
								data={showItem.storages}
								keyField="storage"
								pagination={true}
								paginationPerPage={5}
								format={formatters}
								config={{ id: 'storage-locations' }}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={toggle}>
								Done
							</Button>
						</ModalFooter>
					</Modal>

					<h2>Vehicles</h2>

					<CustomTable
						config={config}
						headers={headers}
						data={storageData.items}
						format={formatter}
					/>
				</div>
			) : (
				<div>
					<h2>No items found</h2>
				</div>
			)}
		</>
	);
};

export default Vehicles;

const config = {
	id: 'vehicles-storage',
};

const headers = [
	'Vehicle Name',
	'Vehicle Type',
	'Item Quantity',
	'Storage Used (kg)',
	'Storage Capacity (kg)',
	'Storage Usage',
	'Inventory',
];
