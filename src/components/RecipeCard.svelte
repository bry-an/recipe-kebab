<script context="module">
	import map from 'ramda/src/map';
	import trim from 'ramda/src/trim';
	export const getIngredients = (num) => (ingredients) =>
		take(num, map(trim, ingredients.split(',')));
</script>

<script>
	import take from 'ramda/src/take';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	$: recipeAdded = recipe.added;
	$: buttonText = recipeAdded ? 'Remove from kebab' : 'Add to kebab';

	function handleAddRemove() {
		dispatch(recipeAdded ? 'removeRecipe' : 'addRecipe', recipe);
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
<button on:click={handleAddRemove}>{buttonText}</button>

<p>
	This recipe combines the flavor of {firstTwoIngredients(recipe.ingredients)[0]} with the delightful
	taste of {firstTwoIngredients(recipe.ingredients)[1]}
</p>

<style>
	.recipe-image {
		display: block;
		padding: 1rem 0;
	}
	a {
		text-decoration: none;
	}
</style>
