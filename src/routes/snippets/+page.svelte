<script>
	let npm_create;
	async function copy_to_clipboard() {
		// Get value from code block
		const text = npm_create.innerText;

		await navigator.clipboard.writeText(text);
	}
</script>

<div class="max-w-7xl mx-auto mt-12">
	<fieldset>
		<legend class="text-base font-semibold leading-6 text-gray-900">Select a package manager</legend
		>

		<div class="mt-4 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
			<!-- Active: "border-green-900 ring-2 ring-green-900", Not Active: "border-gray-300" -->
			<label
				class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
			>
				<input
					type="radio"
					name="project-type"
					value="Newsletter"
					class="sr-only"
					aria-labelledby="project-type-0-label"
					aria-describedby="project-type-0-description-0 project-type-0-description-1"
				/>
				<span class="flex flex-1">
					<span class="flex flex-col">
						<span id="project-type-0-label" class="block text-sm font-medium text-gray-900"
							>NPM</span
						>
					</span>
				</span>
				<!-- Not Checked: "invisible" -->
				<svg
					class="h-5 w-5 text-green-900"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
						clip-rule="evenodd"
					/>
				</svg>
				<!--
        Active: "border", Not Active: "border-2"
        Checked: "border-green-900", Not Checked: "border-transparent"
      -->
				<span
					class="pointer-events-none absolute -inset-px rounded-lg border-2"
					aria-hidden="true"
				/>
			</label>
			<!-- Active: "border-green-900 ring-2 ring-green-900", Not Active: "border-gray-300" -->
			<label
				class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
			>
				<input
					type="radio"
					name="project-type"
					value="Existing Customers"
					class="sr-only"
					aria-labelledby="project-type-1-label"
					aria-describedby="project-type-1-description-0 project-type-1-description-1"
				/>
				<span class="flex flex-1">
					<span class="flex flex-col">
						<span id="project-type-1-label" class="block text-sm font-medium text-gray-900"
							>PNPM</span
						>
					</span>
				</span>
				<!-- Not Checked: "invisible" -->
				<svg
					class="h-5 w-5 text-green-900"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
						clip-rule="evenodd"
					/>
				</svg>

				<!--
        Active: "border", Not Active: "border-2"
        Checked: "border-green-900", Not Checked: "border-transparent"
      -->
				<span
					class="pointer-events-none absolute -inset-px rounded-lg border-2"
					aria-hidden="true"
				/>
			</label>
			<!-- Active: "border-green-900 ring-2 ring-green-900", Not Active: "border-gray-300" -->
			<label
				class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
			>
				<input
					type="radio"
					name="project-type"
					value="Trial Users"
					class="sr-only"
					aria-labelledby="project-type-2-label"
					aria-describedby="project-type-2-description-0 project-type-2-description-1"
				/>
				<span class="flex flex-1">
					<span class="flex flex-col">
						<span id="project-type-2-label" class="block text-sm font-medium text-gray-900"
							>Bun</span
						>
					</span>
				</span>
				<!-- Not Checked: "invisible" -->
				<svg
					class="h-5 w-5 text-green-900"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
						clip-rule="evenodd"
					/>
				</svg>
				<!--
        Active: "border", Not Active: "border-2"
        Checked: "border-green-900", Not Checked: "border-transparent"
      -->
				<span
					class="pointer-events-none absolute -inset-px rounded-lg border-2"
					aria-hidden="true"
				/>
			</label>
			<label
				class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
			>
				<input
					type="radio"
					name="project-type"
					value="Trial Users"
					class="sr-only"
					aria-labelledby="project-type-2-label"
					aria-describedby="project-type-2-description-0 project-type-2-description-1"
				/>
				<span class="flex flex-1">
					<span class="flex flex-col">
						<span id="project-type-2-label" class="block text-sm font-medium text-gray-900"
							>Bun</span
						>
					</span>
				</span>
				<!-- Not Checked: "invisible" -->
				<svg
					class="h-5 w-5 text-green-900"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
						clip-rule="evenodd"
					/>
				</svg>
				<!--
        Active: "border", Not Active: "border-2"
        Checked: "border-green-900", Not Checked: "border-transparent"
      -->
				<span
					class="pointer-events-none absolute -inset-px rounded-lg border-2"
					aria-hidden="true"
				/></label
			>
		</div>
	</fieldset>

	<div class="bg-slate-100 rounded-lg mt-12">
		<div class="w-full flex justify-between bg-slate-200 p-2 rounded-t-lg">
			<h4>Install Svelte</h4>
			<button on:click={copy_to_clipboard}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
					/>
				</svg>
			</button>
		</div>
		<div class="p-4">
			<code bind:this={npm_create}>
				npm create svelte@latest my-app<br />
				cd my-app<br />
				npm install<br />
				npm run dev <br />
			</code>
		</div>
	</div>
</div>
