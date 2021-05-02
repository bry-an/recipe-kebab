<script>
	export let recipe = {};
	const firstTwoIngredients = (ingredients) => ingredients.split(',').slice(0, 2);
</script>

<a href={recipe.href} target="_blank">
	<h3>{recipe.title}</h3>
</a>
{#if recipe.thumbnail}
	<img href="recipe.href" src={recipe.thumbnail} alt={`${recipe.thumbnail}-image`} />
{:else}
	<p>No image available, but I bet it looks great</p>
{/if}

<p>
	This recipe combines the flavor of {firstTwoIngredients(recipe.ingredients)[0]} with the delightful
	taste of {firstTwoIngredients(recipe.ingredients)[1]}
</p>
<hr />

<style>
</style>
