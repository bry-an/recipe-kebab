<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const removeItem = (item) => {
		dispatch('removeItem', item);
	};
	export let item = {};
</script>

<p>{item.title} <button on:click={removeItem(item)}>Remove Item</button></p>
