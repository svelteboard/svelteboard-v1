<script>
	let { compiled } = $props();
	import srcdoc from './srcdoc/index.html?raw';

	let iframe;

	$effect(() => {
		if (compiled === undefined) return;
		iframe.contentWindow.postMessage({ type: 'compile', data: compiled }, '*');
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
