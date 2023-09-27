import React, { useEffect, useState } from 'react';
import { Progress } from 'reactstrap';
import FormattedNumber from '../../_common/FormattedNumber';
import RecipeList from './RecipeList';
import ItemStorage from './ItemStorage';

const transformers = require('./data/transformers.json');
const itemInfo = require('./data/items.json');

const CraftingProduct = props => {
	const [userItemData, setUserItemData] = useState({});

	const [finalProduct, setFinalProduct] = useState(null);
	const [neededTotal, setNeededTotal] = useState(1);
	const [neededAmount, setNeededAmount] = useState(0);
	const [trailerCapacity, setTrailerCapacity] = useState(0);

	const [neededItems, setNeededItems] = useState({});
	const [recipeUsing, setRecipeUsing] = useState(null);

	useEffect(() => {
		if (props.itemData) {
			setUserItemData(props.itemData);
			setFinalProduct(props.item);
			setNeededAmount(Number(props.neededAmount));
			setNeededTotal(Number(props.neededTotal));

			setTrailerCapacity(props.trailerCapacity);

			if (props.item) setRecipeUsing(itemInfo[props.item].make[0]);
		}
	}, [props]);

	useEffect(() => {
		getRecipeItems(finalProduct);
	}, [finalProduct, recipeUsing]);

	const _neededItems = {};

	function getRecipeItems(item) {
		if (
			!item ||
			neededItems[item] ||
			!recipeUsing ||
			recipeUsing === 'null|null'
		)
			return;

		const [transformer, recipe] = recipeUsing.split('|');
		const recipeData = transformers[transformer]._recipes[recipe];

		if (!recipeData) return;

		for (const ingredient in recipeData.reagents) {
			if (_neededItems[ingredient]) {
				_neededItems[ingredient] +=
					(recipeData.reagents[ingredient] * neededAmount) /
					recipeData.products[finalProduct];
			} else {
				_neededItems[ingredient] =
					(recipeData.reagents[ingredient] * neededAmount) /
					recipeData.products[finalProduct];
			}
		}

		setNeededItems(_neededItems);
	}

	function itemBox(index, item, total) {
		const current = userItemData[item] ? userItemData[item].amount : 0;
		return (
			<div key={index} className="rounded border border-dark p-3">
				{itemInfo[item].name}: <FormattedNumber num={current} /> /{' '}
				{<FormattedNumber num={total} />}
				<Progress multi>
					<Progress
						animated
						bar
						striped
						value={userItemData[item] ? userItemData[item].amount : 0}
						min={0}
						max={total}
						style={{
							backgroundColor:
								userItemData[item] && userItemData[item].amount >= total
									? '#2ecc71'
									: '#e74b3c',
						}}
					/>
				</Progress>
				{recipeUsing ? (
					<RecipeList
						key={index}
						recipeItem={item}
						recipeUsing={recipeUsing}
						setRecipeUsing={setRecipeUsingVal}
						setFinalProduct={setFinalProductVal}
						recipeAmountNeeded={neededAmount}
						trailerCapacity={trailerCapacity}
					/>
				) : null}
			</div>
		);
	}

	function setFinalProductVal(item) {
		props.setFinalProductVal(item);
	}

	function setRecipeUsingVal(recipe) {
		setRecipeUsing(recipe);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-xl">
					<h2>Recipe:</h2>
					{finalProduct ? itemBox('main', finalProduct, neededTotal) : null}
				</div>
				<div className="col-xl">
					<h2>Your Items:</h2>
					{itemInfo[finalProduct] &&
					itemInfo[finalProduct].make.length &&
					neededItems ? (
						<>
							<div>
								{Object.keys(neededItems).map((item, index) => (
									<ItemStorage
										key={index}
										item={item}
										amount={userItemData[item] ? userItemData[item].amount : 0}
										needed={neededItems[item]}
										storages={userItemData[item] ? userItemData[item] : null}
									/>
								))}
							</div>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default CraftingProduct;
