import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import CustomTable from '../../_common/CustomTable';

const Items = props => {
	const [showItem, setShowItem] = useState({
		name: '',
		amount: 0,
		weight: 0,
		storages: [],
	});
	const [modal, setModal] = useState(false);
	const [storageData, setStorageData] = useState(null);
	const storages = require('./storages.json');

	const toggle = () => setModal(!modal);

	const formatter = (item, key) => {
		return (
			<tr key={key}>
				<td dangerouslySetInnerHTML={{ __html: item.name }} />
				<td>{item.amount}</td>
				<td>{(item.weight * item.amount).toFixed(2).replace(/\.?0+$/, '')}</td>
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

	function StorageName(storage) {
		if (storage.startsWith('faq_')) {
			return storage.replace('faq_', 'Facton');
		}

		return storages[storage].name;
	}

	function StorageSize(storage) {
		if (storage.name.startsWith('faq_')) {
			return 500000;
		}

		if (storage.name.startsWith('biz_train')) {
			return 16000 + Math.floor((16000 * storage.lvl) / 9 / 10) * 10;
		}

		if (storage.name.startsWith('biz_')) {
			return storages[storage.name].size * storage.lvl;
		}

		return storages[storage.name].size;
	}

	function modelFormatter(storage) {
		return (
			<tr key={storage.name}>
				<td>{StorageName(storage.name)}</td>
				<td>{storage.amount}</td>
				<td>{storage.weight * storage.amount}</td>
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

	function resolveItemName(item) {
		if (item.dName) return item.dName;
		if (item.name.startsWith('vehicle_shipment'))
			return item.name.split('|')[2];
		if (item.name.startsWith('rts_card'))
			return 'RTS Card: ' + item.name.split('|')[2];
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
						lvl: storage.lvl,
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
									__html: showItem.name + ' (Storage Locations)',
								}}
							/>
						</ModalHeader>
						<ModalBody>
							<CustomTable
								headers={['Storage', 'Amount', 'Weight', 'Storage Used']}
								data={showItem.storages}
								keyField="storage"
								pagination={true}
								paginationPerPage={5}
								format={modelFormatter}
								config={{ id: 'storage-locations' }}
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

const config = {
	id: 'items-storage',
};

const headers = [
	'Item Name',
	'Item Quantity',
	'Item total weight (kg)',
	'Storages',
];
