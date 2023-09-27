import * as Api from '../../../library/Api/api';

import { Button, Form, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import LoadingIcon from '../../_presentational/LoadingIcon';
import VehicleCard from './Vehicle';

const CompletionistScreen = () => {
	document.title = `RC - Completionist`;

	const [currentVehiclesData, setCurrentVehiclesData] = useState(null);
	const [ownedVehiclesData, setOwnedVehiclesData] = useState([]);
	const [publicKeyVal, setPublicKeyVal] = useState('');

	useStyles(Style.raw);

	async function getData() {
		const apiData = await Api.getTycoonData();
		let ownedVehicles = [];

		if (apiData.data) {
			let inv = apiData.data.inventory;
			let backpack = (await Api.getBackpack()).data;
			let data = {};

			Object.keys(inv).forEach(key => {
				data[key] = inv[key];
			});

			Object.keys(backpack).forEach(key => {
				if (data[key]) data[key].amount += backpack[key].amount;
				else data[key] = backpack[key];
			});

			const rtsCardsNames = Object.keys(data).filter(key => {
				return key.includes('rts_card|');
			});

			rtsCardsNames.forEach(key => {
				let keyName = key.split('|')[1];
				if (!ownedVehicles[keyName]) ownedVehicles[keyName] = data[key];
				else ownedVehicles[keyName].amount += data[key].amount;
			});
		}

		setOwnedVehiclesData(ownedVehicles);

		Api.getCurrentRTSVehicles().then(response => {
			setCurrentVehiclesData(response.vehicles);
		});
	}

	function handleSetPublicKey() {
		if (!publicKeyVal) return;

		Api.setPublicApiKey(publicKeyVal).then(() => {
			getData();
		});
	}

	useEffect(() => {
		getData();

		const interval = setInterval(async () => {
			await getData();
		}, 60 * 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="content">
			<h2>Current Vehicles</h2>
			{currentVehiclesData ? (
				<div className="cards">
					{Object.keys(currentVehiclesData).map(key => {
						return (
							<VehicleCard
								key={key}
								vehicle={currentVehiclesData[key]}
								ownedVehicles={ownedVehiclesData}
							/>
						);
					})}
				</div>
			) : (
				<div>
					<LoadingIcon />

					<h2>Error retrieving your statistics</h2>
					<p>You may not have opened the RTS Garage yet.</p>
					<p>Your public API key was invalid or not found.</p>
					<p>
						Public API keys are free-of-charge and, by providing your public API
						key, you allow outside services to access your information on your
						behalf.
					</p>
					<p>
						The RTS Completionist page uses this API key to find and show the
						list of vehicles that you're currently able to spawn for the RTS
						Transporter job. When you submit your public API key, we will
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

export default CompletionistScreen;

const Style = {
	raw: `
		.content {
			margin: 0 auto;
			max-width: 75%;
			padding: 0 20px;
		}

		.cards {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			grid-gap: 80px;
			justify-content: center;
			align-items: center;
		}

		.card {
			border-radius: 5px;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			margin-bottom: 25px;
			width: 250px;
		}

		.card-body {
			padding: 10px;
			height: 250px;
		}

		.card-body img{
			width: 100%;
			height: auto;
		}
    `,
};

function useStyles(body) {
	useEffect(() => {
		const style = document.createElement('style');
		style.innerHTML = body;

		document.body.appendChild(style);

		return () => {
			document.body.removeChild(style);
		};
	}, [body]);
}
