import * as Api from '../../../library/Api/api';

import { Button, Form, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import LoadingIcon from '../../_presentational/LoadingIcon';
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
		setDataError(false);
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

	function handleSetPublicKey() {
		if (!publicKeyVal) return;

		Api.setPublicApiKey(publicKeyVal).then(() => {
			getData();
		});
	}

	return (
		<div className="container w-auto p-3">
			{dataError ? (
				<div>
					<LoadingIcon />

					<h2>Error retrieving your statistics</h2>
					<p>Your public API key was invalid or not found.</p>
					<p>
						Public API keys are free-of-charge and, by providing your public API
						key, you allow outside services to access your information on your
						behalf.
					</p>
					<p>
						If you have your public API key, enter it in the box below and hit
						'Submit'.
					</p>
					<p>To retrieve your public API key, follow these steps:</p>
					<ol>
						<li>Open the chat in Transport Tycoon</li>
						<li>Type /api public copy</li>
						<li>Copy the API key</li>
						<li>Paste it into the box below and click 'Submit'.</li>
					</ol>

					<p>To generate a new public API key, follow these steps:</p>
					<ol>
						<li>Open the chat in Transport Tycoon</li>
						<li>Type /api public generate</li>
						<li>Copy the API key</li>
						<li>Paste it into the box below, and click 'Submit'.</li>
					</ol>

					<Form noValidate autoComplete="off">
						<Input
							type="text"
							value={publicKeyVal}
							onChange={e =>
								setPublicKeyVal(
									e.target.value
										.replace(/\n/g, '')
										.replace(
											/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
											''
										)
								)
							}
							valid={!!publicKeyVal}
							invalid={!publicKeyVal}
							placeholder="Your public API key"
						/>
						<Button onClick={handleSetPublicKey}>Submit</Button>
					</Form>
				</div>
			) : !storageData || !itemData ? (
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
