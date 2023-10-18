import { Progress } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import FormattedNumber from '../../_common/FormattedNumber';

const itemInfo = require('./data/items.json');

const ItemStorage = props => {
	const [itemName, setItemName] = useState('');
	const [itemAmount, setItemAmount] = useState(0);
	const [itemNeeded, setItemNeeded] = useState(0);

	const [itemStorages, setItemStorages] = useState({});

	// Props

	useEffect(() => {
		if (props.item) setItemName(props.item);

		if (props.amount) setItemAmount(Number(props.amount));

		if (props.needed) setItemNeeded(props.needed);

		if (props.storages) setItemStorages(props.storages);
	}, [props]);

	const completeColour = '#2ecc71';
	const incompleteColour = '#e74b3c';

	const renderProgressBar = value => (
		<Progress multi>
			<Progress
				animated
				bar
				striped
				value={value}
				min={0}
				max={itemNeeded}
				style={{
					backgroundColor:
						value >= itemNeeded ? completeColour : incompleteColour,
				}}
			/>
		</Progress>
	);

	const renderStorageItems = () => {
		return Object.keys(itemStorages).map((storage, index) => {
			if (storage === 'amount') return null;
			return (
				<div key={index}>
					{storage}: <FormattedNumber num={itemStorages[storage]} />
					{renderProgressBar(itemStorages[storage])}
				</div>
			);
		});
	};
	return (
		<>
			<div
				className="rounded border border-dark p-2 m-2"
				style={{ backgroundColor: '#2c2f33' }}>
				<div className="row p-2">
					<div className="col">
						{itemInfo[itemName] ? itemInfo[itemName].name : itemName}
					</div>
					<div className="col text-right">
						<FormattedNumber num={itemAmount} />/
						<FormattedNumber num={itemNeeded} />
					</div>
				</div>

				{renderProgressBar(itemAmount)}

				{Object.keys(itemStorages).length > 0 && (
					<div className="row p-2">
						<div className="col">
							Storages:
							<div className="col">{renderStorageItems()}</div>
						</div>
					</div>
				)}
			</div>
			<br />
		</>
	);
};

export default ItemStorage;
