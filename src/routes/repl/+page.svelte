<script>
	import Repl from '$lib/repl/index.svelte';
	let components = $state([
		{
			id: 1,
			name: `App`,
			type: 'svelte',
			source: `<script>
	let count = $state(0);

	function increment() {
		count += 1;
	}
<\/script>

<button class="m-4 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onclick={increment}>
	clicks: {count}
</button>`
		}
	]);
</script>

<Repl bind:components />
