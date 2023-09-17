<script>
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	// import { yCollab, yUndoManagerKeymap } from "y-codemirror.next";
	// import { ymap, provider } from '$lib/stores';

	import { EditorView, basicSetup } from 'codemirror';
	import { ViewPlugin, ViewUpdate } from '@codemirror/view';
	import { code_theme } from './theme';
	// import { javascript } from "@codemirror/lang-javascript";
	// import { html } from "@codemirror/lang-html";
	import { EditorState } from '@codemirror/state';
	import { svelte } from '@replit/codemirror-lang-svelte';

	import { tags } from '@lezer/highlight';
	import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';

	let editor, view, state;
	let current = 0;
	export let components = [
		{
			id: 1,
			name: `App`,
			type: 'svelte',
			source: ''
		}
	];

	const listen_updates = (update) => {
		if (update.docChanged) {
			const source = view.state.doc.toString();
			components[current].source = source;
		}
	};

	export const userColor = { color: '#30bced', light: '#30bced33' };

	// export const userColor = usercolors[random.uint32() % usercolors.length];
	function get_extensions(source) {
		let extensions = [
			// keymap.of([...yUndoManagerKeymap]),
			basicSetup,
			svelte(),
			EditorView.updateListener.of(listen_updates),
			EditorView.lineWrapping,
			EditorView.baseTheme(code_theme, { dark: true }),
			syntaxHighlighting(
				HighlightStyle.define([
					{ tag: tags.keyword, color: '#fb923c' },
					{ tag: tags.comment, color: 'plum', fontStyle: 'italic' },
					{ tag: tags.meta, color: '#67e8f9' },
					{ tag: tags.strong, fontWeight: 'bold' },
					{ tag: tags.emphasis, fontStyle: 'italic' },
					{ tag: tags.strikethrough, textDecoration: 'line-through' },
					{ tag: tags.link, color: '#f3f4f6', textDecoration: 'underline' },
					{ tag: tags.heading, fontWeight: 'bold', color: 'black' },
					{ tag: [tags.atom, tags.bool], color: '#fdba74' },
					{
						tag: [tags.processingInstruction, tags.string, tags.inserted],
						color: '#a5f3fc'
					},
					{ tag: tags.invalid, color: 'pink' },
					{
						tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName],
						color: '#f3f4f6'
					},
					{
						tag: [tags.function(tags.variableName), tags.labelName],
						color: '#c4b5fd'
					},
					{
						tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
						color: '#f3f4f6'
					},
					{
						tag: [tags.definition(tags.name), tags.separator],
						color: '#f3f4f6'
					},
					{
						tag: [
							tags.typeName,
							tags.className,
							tags.number,
							tags.changed,
							tags.annotation,
							tags.modifier,
							tags.self,
							tags.namespace
						],
						color: '#67e8f9'
					},
					{
						tag: [
							tags.operator,
							tags.operatorKeyword,
							tags.url,
							tags.escape,
							tags.regexp,
							tags.special(tags.string)
						],
						color: '#f3f4f6'
					}
				])
			)
		];
		// if ($provider) extensions.push(yCollab(source, $provider.awareness));
		// else extensions.push(yCollab(source));

		return extensions;
	}

	onMount(() => {
		// components = $ymap.get(yid);
		create_codemirror();
	});
	onDestroy(() => {
		if (view) view.destroy();
	});
	function create_codemirror() {
		if (!browser) return;

		if (view) view.destroy();

		if (editor) {
			const file = components[0];
			const source = file.source;

			state = EditorState.create({
				doc: source.toString(),
				extensions: get_extensions(source)
			});

			view = new EditorView({
				state,
				parent: editor
			});
		}
	}

	export function update_editor_source(i) {
		if (components.length < 1) return;
		current = i;
		const file = components[i];
		const source = file.source;

		// view.setState(
		// 	EditorState.create({
		// 		doc: source.toString()
		// 		// extensions: get_extensions(source)
		// 	})
		// );
		const tr = view.state.update({
			changes: {
				from: 0,
				to: view.state.doc.length,
				insert: source
			}
		});

		view.dispatch(tr);
	}
</script>

<div bind:this={editor} class="text-base sm:text-sm flex-1 overflow-scroll" />
