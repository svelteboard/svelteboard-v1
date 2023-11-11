<script>
	export let content;
</script>

<table class="min-w-full divide-y divide-gray-300">
	<thead>
		<tr>
			{#each Object.values(content.meta.columns) as column}
				<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
					{column.displayName}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class="bg-white divide-y divide-gray-200">
		{#each content.data as row, index}
			<tr class={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
				{#each Object.keys(content.meta.columns) as key}
					<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
						{row[key]}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
