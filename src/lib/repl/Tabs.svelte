<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let tabs = [];
	export let current = 0;
</script>

<div class="flex sticky top-0 z-10">
	<ul
		on:dblclick={() => dispatch('new')}
		class="not-prose p-1 shadow-sm overflow-scroll z-30 min-h-[50px] top-0 sticky order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:leading-7 bg-slate-950 grow"
	>
		{#each tabs as { name, type, id }}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class:active={id === current}
				class="cursor-pointer p-3 border-l border-slate-700 text-slate-400 shadow-inner"
				on:click={() => dispatch('select', id)}
				on:dblclick|stopPropagation
			>
				{name}.{type}
				{#if id === current && `${name}.${type}` != 'App.svelte'}
					<button
						on:click={() => {
							dispatch('remove', id);
						}}
						class="ml-1"
					>
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
								d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				{/if}
			</li>
		{/each}
	</ul>
	<button
		on:click={() => dispatch('new')}
		class="p-2 bg-slate-950 hover:bg-slate-800 text-slate-100"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-5 h-5"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
		</svg>
	</button>
</div>

<style>
	ul {
		margin: 0;
		flex-wrap: nowrap;
	}
	li {
		list-style-type: none;
	}
	.active {
		text-decoration: underline;
		display: inline-flex;
		color: #fff;
	}
</style>
