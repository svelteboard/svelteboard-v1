<script>
	import Repl from '$lib/repl/index.svelte';
	let components = [
		{
			id: 0,
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
	];
</script>

<svelte:head>
	<title>Repl | Svelteboard</title>
	<meta name="description" content="Svelte 5 Repl. Try out Svelte code in the browser." />
	<meta
		name="keywords"
		content="svelte, svelteboard, svelte tutorials, svelte resources, svelte tools, svelte repl"
	/>
	<meta name="author" content="Svelteboard" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</svelte:head>

<Repl {components} />
