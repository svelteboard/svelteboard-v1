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
	<title>Svelteboard - Svelte Tutorials</title>
	<meta
		name="description"
		content="Svelteboard is a collection of tutorials, tools, and resources for to help you learn Svelte."
	/>
	<meta
		name="keywords"
		content="svelte, svelteboard, svelte tutorials, svelte resources, svelte tools, svelte repl"
	/>
	<meta name="author" content="Svelteboard" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</svelte:head>

<section class="relative pt-12 md:pt-24 bg-forest-900">
	<div class="absolute h-full w-full top-0 le ft-0 bg-[url('/noise.png')] opacity-5 z-0" />
	<div class="text-center mb-24 z-10 relative">
		<h1
			class="text-center font-heading tracking-tight text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 items-center"
		>
			<span class="grow"> Tutorials, tools, and svmore</span>
			<span class="ml-2 inline-block">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					class="w-8 h-8 text-white group"
				>
					<path
						class="group-hover:text-amber-700"
						d="M6.5 23L13 21.75M21 19L13 21.75M4 19.5L13 21.75M18.5 23L13 21.75"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						class="group-hover:text-orange-600"
						d="M15.2618 3.44474C16.9347 4.20424 18.3004 5.52396 19.1309 7.18342C19.9613 8.84289 20.2061 10.7416 19.8244 12.5624C19.4428 14.3832 18.4577 16.0158 17.0338 17.1875C15.6099 18.3592 13.8334 18.999 12.0011 19C10.4338 18.9999 8.90103 18.5322 7.59306 17.6549C6.28508 16.7776 5.25951 15.5293 4.64364 14.065C4.02777 12.6007 3.84873 10.9849 4.12874 9.4182C4.40875 7.85145 5.13548 6.40275 6.21873 5.25193C6.9652 6.31095 7.9502 7.17318 9.09149 7.76663C9.11148 6.46457 9.41399 5.18303 9.97745 4.01339C10.5409 2.84375 11.3514 1.81483 12.3512 1C13.1143 2.03977 14.1122 2.87791 15.2609 3.44375L15.2618 3.44474Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						class="group-hover:text-yellow-400"
						d="M12.0013 16C13.2699 15.9996 14.491 15.5633 15.4171 14.7796C16.3432 13.9959 16.9051 12.9233 16.989 11.7791C17.073 10.6349 16.6726 9.50465 15.869 8.61728C15.0655 7.72992 13.9188 7.15179 12.6614 7C11.2846 8.11348 10.3775 9.62389 10.0944 11.274C9.06716 11.0469 8.10026 10.6371 7.25006 10.0687C7.00316 10.7476 6.93789 11.4698 7.0596 12.1759C7.18131 12.882 7.48653 13.552 7.95021 14.1308C8.41389 14.7097 9.02282 15.1809 9.72702 15.5058C10.4312 15.8307 11.2106 16.0001 12.0013 16Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		</h1>

		<p class="text-lg text-gray-300">
			Our goal is to make shipping a little faster, easier, and more fun.
		</p>
	</div>
</section>

<section class="max-w-[1040px] w-full m-auto my-12 p-4 h-[640px] max-h-screen">
	<div class="rounded-md border shadow-sm overflow-clip h-full">
		<Repl {components} />
	</div>
</section>
