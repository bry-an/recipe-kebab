<script>
	import uniq from 'ramda/src/uniq';
	import RecipeCard from '../components/RecipeCard.svelte';
	import { getIngredients } from '../components/RecipeCard.svelte';
	let typeSearch = '';
	let validationError = false;
	let recipes = [];
	let kebab = [];

	let ingredients = [];

	const getFirstFiveIngredients = getIngredients(5);
	function getRecipes() {
		if (!typeSearch.length) {
			validationError = true;
			return;
		}
		validationError = false;
		fetch(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?q=${typeSearch}`)
			.then((res) => res.json())
			.then((data) => (recipes = data.results));
	}
	function addRecipe(event) {
		kebab = kebab.concat(event.detail);
		ingredients = uniq(ingredients.concat(getFirstFiveIngredients(event.detail.ingredients)));
	}
	function removeRecipe(event) {
		kebab = kebab.filter((kebabItem) => kebabItem.title !== event.detail.title);
		// have to calculate all recipes' ingredients again in case some recipes have same ingredients
		const localIngredients = [];
		kebab.forEach((kebabItem) => {
			localIngredients = localIngredients.concat(getFirstFiveIngredients(kebabItem.ingredients));
		});
		ingredients = uniq(localIngredients);
	}
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
					{#each kebab as kebabItem}
						<li>{kebabItem.title}</li>
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
					{#each ingredients as ingredient}
						<li class="ingredients-list-item">
							{ingredient}
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	</div>

	<label for="type-input" class="label">What Would You Like To Cook?</label>
	<input bind:value={typeSearch} type="text" id="type-input" />

	<button on:click={getRecipes}>Get Recipes</button>
	{#if validationError}
		<p class="error">You must enter a search term</p>
	{/if}
	<ul>
		{#each recipes as recipe}
			<li>
				<RecipeCard bind:recipe on:addRecipe={addRecipe} on:removeRecipe={removeRecipe} />
			</li>
		{/each}
	</ul>
</section>

<style>
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
	.label {
		display: block;
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
</style>
