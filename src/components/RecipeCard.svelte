<script>
	export let recipe = {};
	let addRecipe = false;
	const firstTwoIngredients = (ingredients) => ingredients.split(',').slice(0, 2);
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
<input type="checkbox" id="add-recipe-to-checkbox" bind:value={addRecipe} />
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
