<script>
	import RecipeCard from '../components/RecipeCard.svelte';
	let typeSearch = '';
	let validationError = false;
	let recipes = [];

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
</script>

<section>
	<h1 class="header">Welcome to Recipe Kebab!</h1>

	<label for="type-input" class="label">What Would You Like To Cook?</label>
	<input bind:value={typeSearch} type="text" id="type-input" />
	<button on:click={getRecipes}>Get Recipes</button>
	{#if validationError}
		<p class="error">You must enter a search term</p>
	{/if}
	<ul>
		{#each recipes as recipe}
			<li>
				<RecipeCard bind:recipe />
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
	.label {
		display: block;
	}
	.error {
		color: red;
		margin-top: 0.5rem;
	}
</style>
