<script>
	import Tabs from './Tabs.svelte';
	import CodeMirror from './CodeMirror.svelte';

	let { components = [], current = 1, tabs = true } = $props();

	let codemirror;
	let current_component = $state(0);

	function get_max(_components) {
		const ids = _components.map(({ id }) => id);
		return Math.max(...ids);
	}

	function new_component() {
		const id = get_max(components) + 1;

		components = components.concat({
			id,
			name: `Component${id}`,
			type: 'svelte',
			source: ''
		});
	}

	function remove_component(event) {
		const uid = event.detail;
		// const index = components.findIndex(({ id }) => id === uid);
		component = components.filter(({ id }) => id !== uid);
	}

	// use uuid for id in case of collision.

	$effect(() => {
		tabs = components.map(({ id, name, type }) => ({ id, name, type }));
	});
</script>

<section class="flex flex-col h-full overflow-scroll w-full">
	<Tabs
		{tabs}
		{current}
		on:select={({ detail }) => {
			current_component = components.findIndex(({ id }) => id === detail);
		}}
		on:new={new_component}
		on:remove={remove_component}
	/>
	<div class="grow bg-slate-900 relative">
		<CodeMirror bind:this={codemirror} bind:current={current_component} bind:components />
	</div>
</section>
