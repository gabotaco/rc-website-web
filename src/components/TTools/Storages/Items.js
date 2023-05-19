import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { StorageName, StorageSize, resolveItemName } from './StoragesScreen';

import CustomTable from '../../_common/CustomTable';
import { formatNumber } from './StoragesScreen';

const config = {
	id: 'items-storage',
};
const modalConfig = {
	id: 'storage-locations',
};

const headers = [
	'Item Name',
	'Item Quantity',
	'Item total weight (kg)',
	'Storages',
];

const modalHeaders = ['Storage', 'Amount', 'Weight', 'Storage Used'];

const Items = props => {
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
				<td dangerouslySetInnerHTML={{ __html: item.displayName }} />
				<td>{formatNumber(item.amount)}</td>
				<td>{formatNumber(item.weight * item.amount)}</td>
				<td>
					<Button
						color="info"
						onClick={() => {
							setShowItem(item);
							toggle();
						}}>
						View Locations
					</Button>
				</td>
			</tr>
		);
	};

	function modelFormatter(storage) {
		return (
			<tr key={storage.name}>
				<td>{StorageName(storage.name)}</td>
				<td>{formatNumber(storage.amount)}</td>
				<td>{formatNumber(storage.weight * storage.amount)}</td>
				<td>
					{(
						((storage.weight * storage.amount) / StorageSize(storage)) *
						100
					).toFixed(2)}
					%
				</td>
			</tr>
		);
	}

	useEffect(() => {
		if (!props.data) return;

		const items = [];
		props.data.forEach(storage => {
			storage.inventory.forEach(item => {
				const existingItem = items.find(i => i.id === item.name);
				if (existingItem) {
					existingItem.amount += item.amount;
					existingItem.storages.push({
						name: storage.name,
						amount: item.amount,
						weight: item.weight,
						lvl: storage.lvl,
					});
				} else {
					items.push({
						id: item.name,
						displayName: resolveItemName(item),
						weight: item.weight,
						amount: item.amount,
						storages: [
							{
								name: storage.name,
								amount: item.amount,
								weight: item.weight,
								lvl: storage.lvl,
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
							<div
								dangerouslySetInnerHTML={{
									__html: showItem.displayName + ' (Storage Locations)',
								}}
							/>
						</ModalHeader>
						<ModalBody>
							<CustomTable
								headers={modalHeaders}
								data={showItem.storages}
								keyField="storage"
								pagination={true}
								paginationPerPage={5}
								format={modelFormatter}
								config={modalConfig}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={toggle}>
								Done
							</Button>
						</ModalFooter>
					</Modal>

					<h2>Items</h2>

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

export default Items;
