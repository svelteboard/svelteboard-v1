<script>
	let create_sveltekit_snippet;
	let package_manager = 'npm';
	async function copy_to_clipboard() {
		// Get value from code block
		const text = create_sveltekit_snippet.innerText;

		await navigator.clipboard.writeText(text);
	}

	let package_managers = ['npm', 'pnpm', 'bun', 'yarn'];
</script>

<section class="relative pt-12 md:pt-24 bg-forest-900">
	<div class="absolute h-full w-full top-0 le ft-0 bg-[url('/noise.png')] opacity-5 z-0" />
	<div class="text-center mb-24 relative">
		<h1
			class="font-heading tracking-tight text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
		>
			Code Snippets
		</h1>
		<p class="text-lg text-gray-300">Code Snippets to get you started.</p>
	</div>
</section>
<section>
	<div class="py-12 md:py-24 bg-gray-50">
		<div class="container px-4 mx-auto">
			<div class="flex flex-wrap -mx-4">
				<div class="w-full lg:w-3/12 px-4 mb-10 lg:mb-0">
					<div class="max-w-xs pr-10 text-gray-900 font-semibold">
						<h4 class="mb-2">Package Manager</h4>
						<ul class="pr-6">
							{#each package_managers as manager}
								<li class="mb-3">
									<button
										on:click={() => (package_manager = manager)}
										class="block px-6 border-l-2 {package_manager === manager
											? 'border-lime-500 text-gray-900 font-semibold'
											: 'border-transparent text-gray-500'}">{manager}</button
									>
								</li>
							{/each}
						</ul>
					</div>
				</div>
				<div class="w-full lg:w-9/12 px-4">
					<div class="flex flex-wrap -mx-4">
						<div
							class="w-full md:w-1/2 px-4 py-6 mb-16 bg-white flex flex-col h-full rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:border-lime-500 ring ring-transparent hover:ring-lime-500"
						>
							<div class="w-full flex justify-between rounded-t-lg">
								<h4 class="text-base font-semibold leading-6 text-gray-700">Install SvelteKit</h4>
								<button on:click={copy_to_clipboard}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6 text-gray-600"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
										/>
									</svg>
								</button>
							</div>
							<code bind:this={create_sveltekit_snippet}>
								{package_manager} create svelte@latest
								<span class="focus-none" contenteditable="true">my-app</span><br />
								cd my-app<br />
								{package_manager} install<br />
								{package_manager === 'npm' ? `${package_manager} run` : package_manager} dev <br />
							</code>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
