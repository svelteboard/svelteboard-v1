<script>
	export let compiled;
	import srcdoc from './srcdoc/index.html?raw';

	let iframe;

	function update(code) {
		iframe.contentWindow.postMessage(code, '*');
	}

	$: iframe && compiled && update(compiled);
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
