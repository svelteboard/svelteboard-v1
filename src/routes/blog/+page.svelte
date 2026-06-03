<script>
	import tutorials from './tutorials.json';

	const section_order = [
		'Start here',
		'Build with APIs',
		'Generate and share media',
		'Interface experiments'
	];

	const section_descriptions = {
		'Start here': 'Small patterns for learning the shape of Svelte components.',
		'Build with APIs': 'Practical service integrations and async UI examples.',
		'Generate and share media': 'Demos for turning Svelte output into shareable assets.',
		'Interface experiments': 'Larger UI sketches, visual experiments, and advanced components.'
	};

	const sections = section_order
		.map((title) => ({
			title,
			description: section_descriptions[title],
			items: tutorials.filter((tutorial) => tutorial.group === title)
		}))
		.filter((section) => section.items.length > 0);
</script>

<svelte:head>
	<title>Tutorials - Svelteboard</title>
	<meta
		name="description"
		content="Follow practical Svelte tutorials, demos, and browser REPL examples on Svelteboard."
	/>
	<meta
		name="keywords"
		content="svelte, svelteboard, svelte tutorials, svelte resources, svelte tools, svelte repl"
	/>
	<meta name="author" content="Svelteboard" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</svelte:head>

<div class="bg-gray-50">
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
		<div class="max-w-3xl">
			<p class="text-sm font-semibold uppercase text-forest-700">Svelteboard tutorials</p>
			<h1 class="mt-3 text-4xl font-extrabold text-slate-950 sm:text-5xl">
				Practical Svelte guides and demos
			</h1>
			<p class="mt-5 text-lg leading-8 text-slate-600">
				Start with small component patterns, then jump into API examples, generated media, and
				larger interface experiments.
			</p>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
		{#each sections as section}
			<section class="border-t border-slate-200 py-10">
				<div class="mb-6 max-w-3xl">
					<h2 class="text-2xl font-bold text-slate-950">{section.title}</h2>
					<p class="mt-2 text-base leading-7 text-slate-600">{section.description}</p>
				</div>

				<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{#each section.items as { tag, title, preview, url, level, time }}
						<a
							href={url}
							class="group flex min-h-[220px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-forest-700/30 hover:shadow-md"
						>
							<div class="flex flex-wrap gap-2">
								<span
									class="inline-flex items-center rounded-md bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800"
								>
									{tag}
								</span>
								<span
									class="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
								>
									{level}
								</span>
								<span
									class="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
								>
									{time}
								</span>
							</div>

							<h3 class="mt-5 text-xl font-semibold text-slate-950 group-hover:text-forest-800">
								{title}
							</h3>
							<p class="mt-3 grow text-base leading-7 text-slate-600">
								{preview}
							</p>
							<span class="mt-6 inline-flex items-center text-sm font-semibold text-forest-800">
								Open tutorial
								<span aria-hidden="true" class="ml-2 transition group-hover:translate-x-1"
									>-&gt;</span
								>
							</span>
						</a>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>
