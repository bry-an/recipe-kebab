<script>
	import uniq from 'ramda/src/uniq';
	import when from 'ramda/src/when';
	import map from 'ramda/src/map';
	import propEq from 'ramda/src/propEq';
	import assoc from 'ramda/src/assoc';

	import RecipeCard from '../components/RecipeCard.svelte';
	import KebabItem from '../components/KebabItem.svelte';
	import { getIngredients } from '../components/RecipeCard.svelte';
	import { getRandomElement } from '../utils/utils.js';
	let typeSearch = '';
	let validationError = false;
	let recipes = [];
	let pairedRecipes = [];
	let kebab = [];

	let ingredients = [];

	const getFirstFiveIngredients = getIngredients(5);
	function fetchRecipes(search) {
		return fetch(`http://brypro.xyz/http://www.recipepuppy.com/api/?q=${search}`).then((res) =>
			res.json()
		);
	}
	function getRecipes() {
		if (!typeSearch.length) {
			validationError = true;
			return;
		}
		validationError = false;
		fetchRecipes(typeSearch).then(
			(data) => (recipes = data.results.map((recipe) => ({ ...recipe, added: false })))
		);
	}
	function getPairedIngredients(ingredient) {
		return fetch(`http://localhost:3001/pairings/?ingredient=${ingredient}`)
			.then((res) => res.json())
			.then((data) => data.pairings);
	}
	async function getPairedRecipes() {
		if (!ingredients.length) return;
		const randomIngredient = getRandomElement(ingredients);
		const pairedIngredients = await getPairedIngredients(randomIngredient);
		const randomPairedIngredient = getRandomElement(pairedIngredients);
		fetchRecipes(randomPairedIngredient).then(
			(data) => (pairedRecipes = data.results.map((recipe) => ({ ...recipe, added: false })))
		);
	}
	function addRecipe(event) {
		recipes = map(when(propEq('title', event.detail.title), assoc('added', true)), recipes);
		kebab = kebab.concat(event.detail);
		ingredients = uniq(ingredients.concat(getFirstFiveIngredients(event.detail.ingredients)));
	}
	function removeRecipe(event) {
		recipes = map(when(propEq('title', event.detail.title), assoc('added', false)), recipes);
		kebab = kebab.filter((kebabItem) => kebabItem.title !== event.detail.title);
		// have to calculate all recipes' ingredients again in case some recipes have same ingredients
		const localIngredients = kebab.reduce(
			(ingredients, kebabItem) =>
				ingredients.concat(getFirstFiveIngredients(kebabItem.ingredients)),
			[]
		);
		ingredients = uniq(localIngredients);
	}
	function handleSearch(e) {
		if (e.keyCode === 13) {
			getRecipes();
		}
	}
	const isLastItem = (arr) => (i) => i === arr.length - 1;
	let isLastKebabItem;
	$: {
		if (kebab.length) {
			isLastKebabItem = isLastItem(kebab);
		}
	}
	$: pairedRecipesBtnDisabled = !ingredients.length;
</script>

<section>
	<h1 class="header">Welcome to Recipe Kebab!</h1>
	<div class="kebab-container">
		<section class="kebab">
			<h3>Your kebab</h3>
			{#if !kebab.length}
				Your kebab is empty! Search for recipes and build a tasty kebab.
			{:else}
				<ul>
					{#each kebab as kebabItem, i (kebabItem.title)}
						<li>
							<KebabItem
								item={kebabItem}
								on:removeItem={removeRecipe}
								bind:isLastKebabItem
								index={i}
							/>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
		<section class="ingredients">
			<h3>Your key ingredients</h3>
			{#if !ingredients.length}
				No ingredients yet.
			{:else}
				<ul>
					{#each ingredients as ingredient (ingredient)}
						<li class="ingredients-list-item">
							{ingredient}
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	</div>
	<hr />

	<section class="input-container">
		<div>
			<label for="type-input" class="label"><h3>Build from your ingredients</h3></label>
			<input on:keyup={handleSearch} bind:value={typeSearch} type="text" id="type-input" />

			<button on:click={getRecipes}>Get Recipes</button>
			{#if validationError}
				<p class="error">You must enter a search term</p>
			{/if}
		</div>
		<div>
			<h3>Build from recommended pairings with your selected ingredients</h3>
			<button on:click={getPairedRecipes} disabled={pairedRecipesBtnDisabled}
				>Recommended Recipes</button
			>
		</div>
	</section>

	<section class="recipe-container">
		<div class="recipe-column">
			<ul>
				{#each recipes as recipe (recipe.title)}
					<li>
						<RecipeCard bind:recipe on:addRecipe={addRecipe} on:removeRecipe={removeRecipe} />
					</li>
				{/each}
			</ul>
		</div>
		<div class="recipe-column">
			<ul>
				{#each pairedRecipes as recipe (recipe.title)}
					<li>
						<RecipeCard bind:recipe on:addRecipe={addRecipe} on:removeRecipe={removeRecipe} />
					</li>
				{/each}
			</ul>
		</div>
	</section>
</section>

<style lang="scss">
	button {
		cursor: pointer;
	}
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	.header {
		text-align: center;
	}
	.kebab-container {
		display: flex;
		justify-content: start;
		margin-bottom: 2rem;
	}
	.recipe-container {
		display: flex;
	}
	.recipe-column {
		width: 50%;
	}
	.label {
		display: block;
	}
	.input-container {
		display: flex;
		div {
			width: 50%;
		}
	}
	.error {
		color: red;
		margin-top: 0.5rem;
	}
	.kebab {
		width: 50%;
	}
	.ingredients-list-item {
		display: inline;
	}
	.ingredients {
		width: 50%;
	}
</style>
