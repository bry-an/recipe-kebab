<script context="module">
	export const getIngredients = (num) => (ingredients) => take(num, ingredients.split(','));
</script>

<script>
	import take from 'ramda/src/take';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function addRecipe(recipe) {
		dispatch('addRecipe', recipe);
	}
	function removeRecipe(recipe) {
		dispatch('removeRecipe', recipe);
	}
	let recipeAdded = false;
	$: if (recipeAdded === true) {
		addRecipe(recipe);
	} else {
		removeRecipe(recipe);
	}
	const firstTwoIngredients = getIngredients(2);
	export let recipe = {};
</script>

<a href={recipe.href} target="_blank">
	<h3>{recipe.title}</h3>
</a>
<div class="recipe-image">
	{#if recipe.thumbnail}
		<img href="recipe.href" src={recipe.thumbnail} alt={`${recipe.thumbnail}-image`} />
	{:else}
		<p>No image available, but I bet it looks great</p>
	{/if}
</div>
<input type="checkbox" id="add-recipe-to-checkbox" bind:checked={recipeAdded} />
<label for="add-recipe-to-kebab">Add this recipe to your kebab!</label>

<p>
	This recipe combines the flavor of {firstTwoIngredients(recipe.ingredients)[0]} with the delightful
	taste of {firstTwoIngredients(recipe.ingredients)[1]}
</p>
<hr />

<style>
	.recipe-image {
		display: block;
		padding: 1rem 0;
	}
</style>
