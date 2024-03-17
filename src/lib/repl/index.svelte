<script>
	import { browser } from '$app/environment';
	import Input from './Input.svelte';
	import Output from './Output.svelte';
	import { CreateRepl } from './CreateRepl.svelte.js';

	// export let embed = false;
	let resize_bar;
	let worker;

	let input_w = $state(50);
	let output_w = $derived(100 - input_w);
	let resize = $state(false);
	let current = $state(1);
	let compiled = $state.frozen();
	let input_output_toggle = $state(true);
	let innerWidth = $state(0);
	let jobId = 0;
	let {
		components = [
			{
				id: 0,
				name: `App`,
				type: 'svelte',
				source: 'hello world'
			}
		]
	} = $props();
	let Repl = new CreateRepl(components);

	function handle_pointerdown(e) {
		resize = true;
		resize_bar.setPointerCapture(e.pointerId);

		resize_bar.addEventListener('pointermove', (e) => {
			if (!resize) return;
			input_w = (e.clientX / window.innerWidth) * 100;
		});
		resize_bar.addEventListener(
			'pointerup',
			() => {
				resize = false;
				resize_bar.releasePointerCapture(e.pointerId);
			},
			{ once: true }
		);
	}
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/>
</svelte:head>
<svelte:window bind:innerWidth />

<div class="w-full relative shadow-sm grow flex flex-col not-prose h-full">
	<div class="overflow-scroll grow flex flex-col">
		<div class="inline-flex w-full grow">
			<div
				style="width:{input_w}%;"
				class="max-h-screen overflow-scroll pb-[40px] sm:pb-0 {input_output_toggle
					? 'toggle-full'
					: 'hide'}"
			>
				<Input {Repl} />
			</div>
			<div
				bind:this={resize_bar}
				onpointerdown={handle_pointerdown}
				class="bg-slate-700 h-full w-1 cursor-col-resize absolute hidden sm:block"
				style="left:{input_w}%; margin-left:-4px;"
			/>
			<div style="width:{output_w}%" class={input_output_toggle ? 'hide' : 'toggle-full'}>
				<Output on_update_output={Repl.on_update_output} />
			</div>
		</div>
	</div>
	<div class="border-t backdrop-blur-sm bottom-0 absolute w-full sm:hidden p-2">
		<div class="m-auto flex max-w-xs">
			Input
			<button
				ondoubleclick={(e) => {
					e.preventDefault();
					input_output_toggle = !input_output_toggle;
				}}
				onclick={(e) => {
					e.preventDefault();
					input_output_toggle = !input_output_toggle;
				}}
				type="button"
				class="{input_output_toggle ? 'bg-slate-200' : 'bg-blue-400'} 
          m-auto relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				role="switch"
				aria-checked="false"
			>
				<span class="sr-only">Use setting</span>
				<span
					aria-hidden="true"
					class="{input_output_toggle
						? 'translate-x-0'
						: 'translate-x-5'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
				/>
			</button>
			Output
		</div>
	</div>
</div>

<style>
	:root {
		--input-width: 50%;
		--output-width: 50%;
	}

	@media (max-width: 639px) {
		.toggle-visible {
			display: block;
		}

		.input-section,
		.output-section {
			width: 100%;
		}

		.resize-bar {
			display: none;
		}
		.toggle-full {
			width: 100% !important;
		}
		.hide {
			display: none;
		}
	}

	@media (min-width: 640px) {
		.input-section {
			width: var(--input-width);
		}

		.output-section {
			width: var(--output-width);
		}

		.toggle-visible {
			display: none;
		}
	}

	.resize-bar {
		cursor: col-resize;
		width: 5px; /* Adjust the width of the resize bar here */
		background-color: #333; /* Resize bar color */
	}
</style>
