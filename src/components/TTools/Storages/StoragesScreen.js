import * as Api from '../../../library/Api/api';

import { Button, Form, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import Items from './Items';
import LoadingIcon from '../../_presentational/LoadingIcon';
import Storages from './Storages';
import UnderConstruction from '../../_common/UnderConstruction';

const StoragesScreen = props => {
	document.title = `RC - Storages`;

	const [storageData, setStorageData] = useState(null);
	const [dataError, setDataError] = useState(false);
	const [publicKeyVal, setPublicKeyVal] = useState('');
	const [hasPremium, setHasPremium] = useState(false);
	const [hasPostopPerk, setHasPostopPerk] = useState(false);
	const [strengthLevel, setStrengthLevel] = useState(0);

	const [storageType, setStorageType] = useState('storages');

	function calculateLevel(xp) {
		return Math.floor((Math.sqrt(1 + (8 * xp) / 5) - 1) / 2);
	}

	async function getData() {
		const apiStorageData = await Api.getStorages().catch(err => {
			setDataError(true);
			return null;
		});
		const apiBizData = await Api.getTycoonBiz().catch(err => {
			setDataError(true);
			return null;
		});

		console.log(apiStorageData);

		if (!apiStorageData || !apiBizData) return setDataError(true);

		if (!apiStorageData | !apiStorageData.storages) return setDataError(true);
		if (!apiBizData | !apiBizData.businesses) return setDataError(true);

		const tiers = Object.keys(apiBizData.businesses).reduce((sum, key) => {
			if (!key.startsWith('biz_train')) return sum;
			return sum + apiBizData.businesses[key] - 1;
		}, 0);

		apiStorageData.storages.forEach(storage => {
			if (storage.name.startsWith('biz_')) {
				storage.lvl = apiBizData.businesses[storage.name];
			}
		});

		apiStorageData.storages.find(storage => {
			if (storage.name === 'biz_train') {
				storage.lvl = tiers;
				return true;
			}
			return false;
		});

		if (
			apiStorageData.groups.license_premium || // Brought in-game
			apiStorageData.groups.license_patreon_premium || // Brought via Patreon
			apiStorageData.groups.license_premium_p2w // Brought via Tebex
		) {
			setHasPremium(true);
		}

		if (apiStorageData.licenses.perk_trucking_postop) {
			setHasPostopPerk(true);
		}

		setStrengthLevel(calculateLevel(Math.round(apiStorageData.strength)));

		setStorageData(apiStorageData.storages);
	}

	function handleSetPublicKey(e) {
		if (!publicKeyVal) return;

		Api.setPublicApiKey(publicKeyVal).then(() => {
			getData();
		});
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="content">
			<div>
				<div className="d-flex justify-content-center">
					<h3>Data Updated every 10 minutes</h3>
				</div>
				{!dataError && (
					<div className="d-flex justify-content-center">
						<Button
							color="primary"
							onClick={() => {
								setStorageType('storages');
							}}
							active={storageType === 'storages'}
							className="m-1">
							Storages
						</Button>
						<Button
							color="primary"
							onClick={() => {
								setStorageType('items');
							}}
							active={storageType === 'items'}
							className="m-1">
							Items
						</Button>
						<Button
							color="primary"
							onClick={() => {
								setStorageType('vehicles');
							}}
							active={storageType === 'vehicles'}
							className="m-1">
							Vehicles
						</Button>
					</div>
				)}

				{!storageData && !dataError && <LoadingIcon />}
				{storageData && (
					<>
						<div style={{ display: storageType === 'storages' ? '' : 'none' }}>
							<Storages
								data={storageData}
								premium={hasPremium}
								postop={hasPostopPerk}
								strength={strengthLevel}
							/>
						</div>

						<div style={{ display: storageType === 'items' ? '' : 'none' }}>
							<Items
								data={storageData}
								premium={hasPremium}
								postop={hasPostopPerk}
								strength={strengthLevel}
							/>
						</div>

						<div style={{ display: storageType === 'vehicles' ? '' : 'none' }}>
							<UnderConstruction />
						</div>
					</>
				)}
			</div>
			{dataError && (
				<div>
					<h2>Error retrieving your statistics</h2>
					<p>You may have locked you api.</p>
					<p>
						Public API keys are free-of-charge and, by providing your public API
						key, you allow outside services to access your information on your
						behalf.
					</p>
					<p>
						The RTS TTools page uses this API key to find and show the list of
						items in your storages. When you submit your public API key, we will
						permanently store it. This allows you to use this page indefinitely,
						without the need to repeat this process. To revoke our access,
						follow the steps below to generate a new API key.
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
			)}
		</div>
	);
};

export default StoragesScreen;
