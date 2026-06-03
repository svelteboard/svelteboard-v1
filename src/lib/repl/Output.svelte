<script>
	let { on_update_output } = $props();
	import srcdoc from './srcdoc/index.html?raw';

	let iframe;
	let iframe_ready = false;
	let pending_output;
	let view = $state('result');
	let compiled_code = $state('');
	let compile_error = $state('');

	on_update_output((compiled) => {
		if (compiled === undefined) return;
		if (compiled.type === 'output') {
			compile_error = '';
			compiled_code = compiled.message?.code || '';
			return update_result(compiled.message);
		}

		compile_error = compiled?.message || String(compiled);
		compiled_code = `/* Error compiling REPL output\n\n${compile_error}\n*/`;
	});

	function update_result(message) {
		if (!iframe?.contentWindow || !iframe_ready) {
			pending_output = message;
			return;
		}

		iframe.contentWindow.postMessage({ type: 'update', data: message }, '*');
	}

	function handle_iframe_load() {
		iframe_ready = true;

		if (pending_output) {
			update_result(pending_output);
			pending_output = null;
		}
	}
</script>

<section class="flex h-full w-full flex-col bg-white">
	<div class="flex border-b border-slate-200 bg-white text-sm font-medium text-slate-600">
		<button
			type="button"
			class="px-4 py-3 hover:text-slate-950 {view === 'result'
				? 'border-b-2 border-slate-950 text-slate-950'
				: ''}"
			onclick={() => (view = 'result')}>Result</button
		>
		<button
			type="button"
			class="px-4 py-3 hover:text-slate-950 {view === 'compiled'
				? 'border-b-2 border-slate-950 text-slate-950'
				: ''}"
			onclick={() => (view = 'compiled')}>Compiled JS</button
		>
	</div>

	<div class:hidden={view !== 'result'} class="min-h-0 grow">
		<iframe
			class="h-full w-full"
			title="Rendered REPL"
			bind:this={iframe}
			{srcdoc}
			sandbox="allow-scripts"
			onload={handle_iframe_load}
		></iframe>
	</div>

	<div
		class:hidden={view !== 'compiled'}
		class="min-h-0 grow overflow-auto bg-slate-950 text-sm text-slate-100"
	>
		{#if compile_error}
			<div class="border-b border-red-400/40 bg-red-950 px-4 py-3 text-red-100">
				{compile_error}
			</div>
		{/if}
		<pre class="m-0 min-h-full whitespace-pre-wrap p-4 font-mono leading-6">{compiled_code ||
				'// Waiting for compiled output...'}</pre>
	</div>
</section>
