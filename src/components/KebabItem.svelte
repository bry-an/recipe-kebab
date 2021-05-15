<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const removeItem = (item) => {
		dispatch('removeItem', item);
	};
	export let item = {};
	export let isLastKebabItem;
	export let index;
	$: isLastItem = isLastKebabItem(index);
</script>

<div class="kebab-wrapper">
	<span> {item.title}</span>
	<div>
		<button on:click={removeItem(item)}>Remove Item</button>
		<a href={item.href} target="_blank"><button>View recipe</button></a>
	</div>
</div>
{#if !isLastItem}
	<div class="line-container">
		<div class="vl" />
	</div>
{/if}

<style>
	.line-container {
		display: flex;
		justify-content: center;
		width: 80%;
		padding: 1rem 0;
	}
	.vl {
		border-left: 2px solid black;
		height: 30px;
	}
	.kebab-wrapper {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 1rem;
		width: 80%;
	}
</style>
