/** @type {import('@sveltejs/kit').Config} */
const sveltePreprocess = require('svelte-preprocess');
module.exports = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},
	preprocess: sveltePreprocess()
};
