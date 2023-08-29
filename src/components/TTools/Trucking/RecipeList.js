import React, { useEffect, useState } from 'react';

const transformers = require('./data/transformers.json');
const itemInfo = require('./data/items.json');

const RecipeList = props => {
	const [recipeItem, setRecipeItem] = useState(null);
	const [recipeShowingTransformer, setRecipeShowingTransformer] =
		useState(null);
	const [recipeShowingRecipe, setRecipeShowingRecipe] = useState(null);

	const [recipeAmountNeeded, setRecipeAmountNeeded] = useState(0);
	const [trailerCapacity, setTrailerCapacity] = useState(0);

	useEffect(() => {
		if (props.recipeItem) {
			setRecipeItem(props.recipeItem);
			setTrailerCapacity(props.trailerCapacity);

			if (props.recipeUsing) {
				const [transformer, recipe] = props.recipeUsing.split('|');

				setRecipeShowingTransformer(transformer);
				setRecipeShowingRecipe(recipe);
				setRecipeAmountNeeded(props.recipeAmountNeeded);
			}
		}
	}, [props]);

	function getRecipeProducts(transformer, recipe) {
		const recipeData = transformers[transformer]._recipes[recipe];
		if (!recipeData) return null;

		const products = recipeData.products;
		if (!products) return null;

		let productItems = [];
		for (const product in products) {
			productItems.push(
				<p key={product}>
					{itemInfo[product].name}: {products[product]}
					{recipeItem === product ? (
						<span className="text-success"> (Crafting Product)</span>
					) : itemInfo[product].make.length > 0 ? (
						<button
							className="btn btn-sm btn-primary ml-2"
							onClick={() => {
								props.setFinalProduct(product);
							}}>
							Select As Crafting Product
						</button>
					) : null}
				</p>
			);
		}

		return productItems;
	}

	function getRecipesIngredients(transformer, recipe) {
		const recipeData = transformers[transformer]._recipes[recipe];
		if (!recipeData) return null;

		const ingredients = recipeData.reagents;
		if (!ingredients) return null;

		let ingredientItems = [];
		for (const ingredient in ingredients) {
			ingredientItems.push(
				<p key={ingredient}>
					{itemInfo[ingredient].name}: {ingredients[ingredient]}
					{itemInfo[ingredient].make.length > 0 ? (
						<button
							className="btn btn-sm btn-primary ml-2"
							onClick={() => {
								props.setFinalProduct(ingredient);
							}}>
							Select As Crafting Product
						</button>
					) : null}
				</p>
			);
		}

		return ingredientItems;
	}

	function calculateRecipeRuns(transformer, recipe) {
		const recipeData = transformers[transformer]._recipes[recipe];

		const products = recipeData.products;
		const ingredients = recipeData.reagents;

		let productWeight = 0;
		let ingredientWeight = 0;

		//Get the weight of the products
		for (const product in products) {
			productWeight +=
				products[product] * itemInfo[product].weight * recipeAmountNeeded;
		}

		//Get the weight of the ingredients
		for (const ingredient in ingredients) {
			ingredientWeight +=
				ingredients[ingredient] *
				itemInfo[ingredient].weight *
				recipeAmountNeeded;
		}

		//Calculate the number of runs needed to make the final product
		const runsNeeded =
			Math.ceil(productWeight / trailerCapacity) >
			Math.ceil(ingredientWeight / trailerCapacity)
				? Math.ceil(productWeight / trailerCapacity)
				: Math.ceil(ingredientWeight / trailerCapacity);

		//Return the number of runs needed to make the final product
		return runsNeeded > 0 ? runsNeeded : 0;
	}

	function getRecipeIngredientAmountPerRun(transformer, recipe) {
		const recipeData = transformers[transformer]._recipes[recipe];
		if (!recipeData) return null;

		const ingredients = recipeData.reagents;
		if (!ingredients) return null;

		const runsNeeded = calculateRecipeRuns(transformer, recipe);

		let ingredientItems = [];
		for (const ingredient in ingredients) {
			ingredientItems.push(
				<p key={ingredient}>
					{itemInfo[ingredient].name}:{' '}
					{Math.floor(
						ingredients[ingredient] * (recipeAmountNeeded / runsNeeded)
					)}
				</p>
			);
		}

		return ingredientItems;
	}

	return (
		<>
			{recipeItem ? (
				<>
					<div className="row m-2">
						{itemInfo[recipeItem].make.length > 1 ? (
							<select
								className="form-control"
								value={recipeShowingTransformer + '|' + recipeShowingRecipe}
								onChange={e => {
									const [transformer, recipe] = e.target.value.split('|');
									setRecipeShowingTransformer(transformer);
									setRecipeShowingRecipe(recipe);
									props.setRecipeUsing(e.target.value);
								}}>
								{itemInfo[recipeItem].make.map((transformerRecipe, index) => {
									const [transformer, recipe] = transformerRecipe.split('|');
									return (
										<option key={index} value={transformerRecipe}>
											{transformer}: {recipe}
										</option>
									);
								})}
							</select>
						) : (
							<h4>
								<b>
									{recipeShowingTransformer}: {recipeShowingRecipe}
								</b>
							</h4>
						)}
					</div>

					{recipeShowingRecipe ? (
						<div className="m-2">
							<p>Produces:</p>
							<ul>
								{getRecipeProducts(
									recipeShowingTransformer,
									recipeShowingRecipe
								)}
							</ul>
							<br />
							<p>Requires:</p>
							<ul>
								{getRecipesIngredients(
									recipeShowingTransformer,
									recipeShowingRecipe
								)}
							</ul>
							<p>
								Requires{' '}
								{calculateRecipeRuns(
									recipeShowingTransformer,
									recipeShowingRecipe
								)}{' '}
								runs:
							</p>
							<p>Ingredients per run:</p>
							<ul>
								{getRecipeIngredientAmountPerRun(
									recipeShowingTransformer,
									recipeShowingRecipe
								)}
							</ul>
						</div>
					) : null}
				</>
			) : null}
		</>
	);
};

export default RecipeList;
