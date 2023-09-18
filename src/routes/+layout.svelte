<script>
	import '../app.css';
	let mobile_menu_open = false;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>

	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	<!-- <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> -->

	<!-- Favicon for high-resolution displays -->
	<!-- <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> -->

	<!-- Apple Touch Icon (at least 60x60px for iOS home screen) -->
	<!-- <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon.png" /> -->
</svelte:head>

<div class="min-h-screen flex flex-col">
	<nav class="bg-green-950">
		<div class="container px-4 mx-auto">
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
							<ul class="flex items-center mr-8">
								<li class="font-medium hover:text-white text-green-50 tracking-tight">
									<a class="hover:bg-green-900 px-6 py-3 rounded-full" href="/blog">Blog</a>
								</li>
								<li class="font-medium hover:text-white text-green-50 tracking-tight">
									<a class="hover:bg-green-900 px-6 py-3 rounded-full" href="snippets"
										>Code Snippets</a
									>
								</li>
								<li class="font-medium hover:text-white text-green-50 tracking-tight">
									<a class="hover:bg-green-900 px-6 py-3 rounded-full" href="/repl">REPL</a>
								</li>
							</ul>
						</div>
						<!-- <div class="w-auto hidden lg:block">
						<div class="inline-block">
							<a
								class="inline-block px-5 py-3 text-white font-semibold text-center tracking-tight bg-green-900 hover:bg-green-800 rounded-lg focus:ring-4 focus:ring-green-300 transition duration-200"
								href="#">GitHub</a
							>
						</div>
					</div> -->
						<div class="w-auto lg:hidden">
							<button
								class="bg-green-800 rounded-full p-3"
								on:click={() => (mobile_menu_open = !mobile_menu_open)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 text-green-50"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
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
			<nav class="relative z-10 px-9 pt-8 bg-white h-full overflow-y-auto">
				<div class="flex flex-wrap justify-between h-full">
					<div class="w-full">
						<div class="flex items-center justify-between -m-2">
							<div class="w-auto p-2">
								<a class="inline-block text-green-950 font-bold" href="/"> Svelteboard </a>
							</div>
							<div class="w-auto p-2">
								<button on:click={() => (mobile_menu_open = false)}>
									<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M6 18L18 6M6 6L18 18"
											stroke="#111827"
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
							<li class="mb-12 font-medium hover:text-green-950 text-green-900 tracking-tight">
								<a href="/">Blog</a>
							</li>
							<li class="mb-12 font-medium hover:text-green-950 text-green-900 tracking-tight">
								<a href="snippets">Code Snippets</a>
							</li>
							<li class="font-medium hover:text-green-950 text-green-900 tracking-tight">
								<a href="/repl">REPL</a>
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
	<main class="grow flex flex-col">
		<slot />
	</main>
</div>

<style>
	.drop-shadow-green {
		filter: drop-shadow(2px 2px 0px rgba(20, 83, 45, 1));
	}
</style>
