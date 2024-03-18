<script>
	let { on_update_output } = $props();
	import srcdoc from './srcdoc/index.html?raw';

	let iframe;

	on_update_output((compiled) => {
		if (compiled === undefined) return;
		if (compiled.type === 'output') {
			return iframe.contentWindow.postMessage({ type: 'update', data: compiled.message }, '*');
		}
	});
</script>

<section class="h-full w-full bg-white">
	<iframe
		class="w-full h-full"
		title="Rendered REPL"
		bind:this={iframe}
		{srcdoc}
		sandbox="allow-scripts"
	/>
</section>
