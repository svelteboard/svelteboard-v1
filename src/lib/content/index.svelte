<!-- Content.svelte -->
<script>
	import Repl from '$lib/repl/index.svelte';
	import Table from '$lib/table/index.svelte';

	export let content = [];

	const components = {
		repl: Repl,
		repl_embed: Repl,
		table: Table,
		table_embed: Table
		// Add any other components you may need
	};

	const tags = {
		paragraph: 'p',
		bulletList: 'ul',
		orderedList: 'ol',
		listItem: 'li',
		// Define tags for bold, italic, and underline
		bold: 'strong',
		italic: 'em',
		underline: 'u'
		// ... add other tag mappings if necessary
	};

	// Separate object for headings to handle different levels
	const headingTags = {
		1: 'h1',
		2: 'h2',
		3: 'h3',
		4: 'h4',
		5: 'h5',
		6: 'h6'
	};

	const getComponent = (type) => components[type] || null;
	const getTag = (type) => tags[type] || 'div';
	const getHeadingTag = (level) => headingTags[level] || 'h1';

	const getContent = (contentNode) => {
		if (contentNode.type === 'editor' && contentNode.content.type === 'doc') {
			return contentNode.content.content || [];
		}
		return Array.isArray(contentNode.content) ? contentNode.content : [];
	};
</script>

{#if content}
	{#each content as node, index (node.id ?? index)}
		{#if node.type === 'editor'}
			<div class="prose m-auto mt-16">
				<svelte:self content={getContent(node)} />
			</div>
		{:else if node.type === 'repl_embed'}
			<div class="min-h-[620px] w-full">
				<div
					class="absolute left-0 right-0 m-auto w-full h-[620px] lg:h-[670px] max-h-screen p-4 lg:p-12 max-w-7xl"
				>
					<div class="rounded-lg border h-full overflow-clip">
						<svelte:component this={getComponent(node.type)} content={node.content} />
					</div>
				</div>
			</div>
		{:else if node.type in components}
			<div class={node.type === 'repl' ? 'overflow-scroll h-screen' : 'm-auto w-full not-prose'}>
				<div class="rounded-lg border h-full overflow-x-scroll">
					<svelte:component this={getComponent(node.type)} content={node.content} />
				</div>
			</div>
		{:else if node.type === 'heading'}
			<svelte:element this={getHeadingTag(node.attrs.level)}>
				{#each getContent(node) as childContent, childIndex (childContent.id ?? `${index}-${childIndex}`)}
					<svelte:self content={[childContent]} />
				{/each}
			</svelte:element>
		{:else if node.type === 'text'}
			<!-- For text nodes, we will check for marks and wrap with appropriate tags -->
			{#if node.marks}
				{#each node.marks as mark}
					<svelte:element this={getTag(mark.type)}>
						{node.text}
					</svelte:element>
				{/each}
			{:else}
				{node.text}
			{/if}
		{:else}
			<svelte:element this={getTag(node.type)}>
				{#each getContent(node) as childContent, childIndex (childContent.id ?? `${index}-${childIndex}`)}
					<svelte:self content={[childContent]} />
				{/each}
			</svelte:element>
		{/if}
	{/each}
{/if}
