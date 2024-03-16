<script>
	import '../app.css';
	let mobile_menu_open = false;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>

	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon.png" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<nav class="bg-forest-900 relative">
		<div class="absolute h-full w-full top-0 le ft-0 bg-[url('/noise.png')] opacity-5 z-0" />
		<div class="relative px-4 mx-auto">
			<div class="flex items-center justify-between py-5">
				<div class="w-auto">
					<div class="flex flex-wrap items-center">
						<div
							class="w-auto pr-2 font-bold hover:text-white text-green-50 tracking-tight text-lg drop-shadow-green"
						>
							<a href="/"> Svelteboard </a>
						</div>
					</div>
				</div>
				<div class="w-auto">
					<div class="flex flex-wrap items-center">
						<div class="w-auto hidden lg:block">
							<ul class="flex items-center mr-8 space-x-4">
								<li class="font-medium tracking-tight">
									<a
										class="text-white hover:text-forest-300 px-6 py-3 border-b border-transparent hover:border-forest-300"
										href="/blog">Blog</a
									>
								</li>
								<li class="font-medium tracking-tight">
									<a
										class="text-white hover:text-forest-300 px-6 py-3 border-b border-transparent hover:border-forest-300"
										href="/snippets">Code Snippets</a
									>
								</li>
								<li class="font-medium tracking-tight">
									<a
										class="text-white hover:text-forest-300 px-6 py-3 border-b border-transparent hover:border-forest-300"
										href="/repl">REPL</a
									>
								</li>
								<li>
									<a
										class="inline-block p-2 ml-auto border border-forest-900 bg-forest-200 bg-opacity-30 hover:bg-forest-700 rounded-lg ring ring-forest-600 hover:ring-2 transition duration-200 hover:translate-y-px"
										href="https://github.com/svelteboard/svelteboard-v1"
										target="_blank"
									>
										<span class="sr-only">Github</span>
										<svg
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="w-6 h-6 text-white"
											><path
												d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
											/></svg
										>
									</a>
								</li>
							</ul>
						</div>

						<div class="w-auto lg:hidden">
							<button
								class="lg:hidden navbar-burger flex items-center justify-center h-10 w-10 ml-auto border border-forest-900 bg-forest-200 bg-opacity-30 hover:bg-forest-700 rounded-lg"
								on:click={() => (mobile_menu_open = !mobile_menu_open)}
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M3 5H21"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M3 12H21"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M3 19H21"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="{mobile_menu_open
				? ''
				: 'hidden'} navbar-menu fixed top-0 right-0 bottom-0 w-4/6 sm:max-w-xs z-50"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
				on:click={() => (mobile_menu_open = false)}
			/>
			<nav class="relative z-10 px-9 pt-8 bg-forest-900 h-full overflow-y-auto">
				<div class="absolute h-full w-full top-0 le ft-0 bg-[url('/noise.png')] opacity-5 z-0" />
				<div class="flex flex-wrap justify-between h-full z-10 relative">
					<div class="w-full">
						<div class="flex items-center justify-between -m-2">
							<div class="w-auto p-2">
								<a class="inline-block text-white font-bold" href="/"> Svelteboard </a>
							</div>
							<div class="w-auto p-2">
								<button on:click={() => (mobile_menu_open = false)}>
									<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M6 18L18 6M6 6L18 18"
											stroke="#fff"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
					<div class="flex flex-col justify-center py-16 w-full">
						<ul>
							<li class="mb-12 font-medium hover:text-forest-50 text-white tracking-tight">
								<a on:click={() => (mobile_menu_open = false)} href="/blog">Blog</a>
							</li>
							<li class="mb-12 font-medium hover:text-forest-50 text-white tracking-tight">
								<a on:click={() => (mobile_menu_open = false)} href="snippets">Code Snippets</a>
							</li>
							<li class="font-medium hover:text-forest-50 text-white tracking-tight">
								<a on:click={() => (mobile_menu_open = false)} href="/repl">REPL</a>
							</li>
						</ul>
					</div>
					<!-- <div class="flex flex-col justify-end w-full pb-8">
					<a
						class="inline-block px-5 py-3 text-white font-semibold text-center tracking-tight bg-green-950 hover:bg-green-800 rounded-lg focus:ring-4 focus:ring-green-300 transition duration-200"
						href="#">GitHub</a
					>
				</div> -->
				</div>
			</nav>
		</div>
	</nav>
	<main class="grow flex flex-col bg-gray-50">
		<slot />
	</main>
</div>

<style>
	.drop-shadow-green {
		filter: drop-shadow(2px 2px 0px rgba(20, 83, 45));
	}
</style>
