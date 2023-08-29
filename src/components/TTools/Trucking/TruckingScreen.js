import * as Api from '../../../library/Api/api';

import { Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import ItemStorage from './ItemStorage';
import CraftingProduct from './CraftingProduct';

const itemInfo = require('./data/items.json');

const TruckingScreen = () => {
	document.title = `RC - Trucking`;

	const [storageData, setStorageData] = useState(null);
	const [itemData, setItemData] = useState(null);
	const [dataError, setDataError] = useState(false);
	const [publicKeyVal, setPublicKeyVal] = useState('');

	const [finalProduct, setFinalProduct] = useState();
	const [productAmount, setProductAmount] = useState(10000);
	const [baseTrailerCapacity, setBaseTrailerCapacity] = useState(3000);

	function validTruckingItem(item) {
		if (item.name.startsWith('rts')) return false;
		if (item.name.startsWith('note')) return false;
		if (item.name.startsWith('blessing_card')) return false;
		if (item.name.startsWith('vehicle_card')) return false;
		if (item.name.startsWith('job_card')) return false;
		if (item.name.startsWith('exp_token')) return false;
		if (item.name.startsWith('prosp_')) return false;
		if (item.name.startsWith('prefix')) return false;
		if (item.name.startsWith('group_card')) return false;
		if (item.name.startsWith('chest_')) return false;
		if (item.name.startsWith('event_')) return false;
		if (item.name.startsWith('sd_')) return false;
		if (item.name.startsWith('upgrade_kit')) return false;
		if (item.name.startsWith('money_card')) return false;

		return true;
	}

	async function getData() {
		const apiStorageData = await Api.getStorages().catch(err => {
			setDataError(true);
			console.error(err);
			return null;
		});

		const apiTrunkData = await Api.getTrunks().catch(err => {
			setDataError(true);
			console.error(err);
			return null;
		});

		const apiCurrentVehicles = await Api.getCurrentVehicles();

		if (!apiStorageData || !apiTrunkData || !apiCurrentVehicles) return;

		setStorageData({
			...apiStorageData.storages,
		});

		const Items = {};

		apiStorageData.storages.forEach(storage => {
			storage.inventory.forEach(item => {
				if (!validTruckingItem(item)) {
					delete storage.inventory[item];
					return;
				}

				if (!Items[item.name]) {
					Items[item.name] = {
						amount: 0,
					};
				}
				Items[item.name][storage.name] = item.amount;
				Items[item.name].amount += item.amount;
			});
		});

		apiTrunkData.trunks.forEach(trunk => {
			for (let i = 0; i < trunk.inventory.length; i++) {
				const item = trunk.inventory[i];

				if (!validTruckingItem(item)) {
					delete trunk.inventory[i];
					continue;
				}

				if (!Items[item.name]) {
					Items[item.name] = {
						amount: 0,
					};
				}
				Items[item.name][trunk.name] = item.amount;
				Items[item.name].amount += item.amount;
			}
		});

		setItemData(Items);

		setFinalProduct(Object.keys(itemInfo)[0]);
	}

	function setFinalProductVal(item) {
		setFinalProduct(item);
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log('finalProduct', finalProduct);
	}, [finalProduct]);

	return (
		<div className="container w-auto p-3">
			{!storageData || !itemData ? (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ height: '100vh' }}>
					<div className="spinner-border mr-3" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			) : (
				<>
					<div className="row p-2">
						<div className="col">
							<h2>Crafting Product:</h2>
							<select
								className="form-control"
								onChange={e => {
									setFinalProduct(e.target.value);
								}}
								value={finalProduct}>
								{Object.keys(itemInfo).map((item, index) => {
									if (itemInfo[item].make.length === 0) return null;
									return (
										<option key={index} value={item}>
											{itemInfo[item].name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="col">
							<h2>Amount:</h2>
							<Input
								type="number"
								onChange={e => {
									setProductAmount(e.target.value);
								}}
								value={productAmount}
							/>
						</div>
						<div className="col">
							<h2>Trailer Capacity:</h2>
							<select
								className="form-control"
								onChange={e => {
									setBaseTrailerCapacity(e.target.value);
								}}
								value={baseTrailerCapacity}>
								<option value="3000">MK10</option>
								<option value="3500">MK11</option>
								<option value="5000">MK12</option>
								<option value="8500">MK13</option>
								<option value="9000">MK14</option>
								<option value="6000">MK15</option>
								<option value="15000">MK14+MK15</option>
							</select>
						</div>
					</div>

					<div className="row">
						<div className="col">
							<ItemStorage
								item={finalProduct}
								amount={
									itemData[finalProduct] ? itemData[finalProduct].amount : '0'
								}
								needed={productAmount}
								storages={itemData[finalProduct] ? itemData[finalProduct] : {}}
							/>
						</div>
					</div>
					<div className="row">
						<CraftingProduct
							item={finalProduct}
							neededAmount={
								productAmount -
								(itemData[finalProduct] ? itemData[finalProduct].amount : '0')
							}
							neededTotal={productAmount}
							itemData={itemData}
							setFinalProductVal={setFinalProductVal}
							trailerCapacity={baseTrailerCapacity}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default TruckingScreen;
