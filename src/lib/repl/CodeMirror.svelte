<script>
	import { browser } from '$app/environment';

	import { onMount, onDestroy } from 'svelte';

	import { EditorView, basicSetup } from 'codemirror';
	import { code_theme } from './theme';
	// import { javascript } from "@codemirror/lang-javascript";
	// import { html } from "@codemirror/lang-html";
	import { EditorState } from '@codemirror/state';
	import { svelte } from '@replit/codemirror-lang-svelte';

	import { tags } from '@lezer/highlight';
	import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';

	let editor = $state();
	let view = $state();
	let editor_state = $state();
	let source = '';
	let { on_update_tab, update_source } = $props();

	on_update_tab((_source) => update_editor_source(_source));

	function update_editor_source(_source) {
		if (!view) return (source = _source);

		const tr = view.state.update({
			changes: {
				from: 0,
				to: view.state.doc.length,
				insert: _source
			}
		});

		view.dispatch(tr);
	}
	const listen_updates = (update) => {
		if (update.docChanged) {
			update_source(view.state.doc.toString());
		}
	};

	function get_extensions() {
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

		return extensions;
	}

	onMount(() => {
		create_codemirror();
	});
	onDestroy(() => {
		if (view) view.destroy();
	});

	function create_codemirror() {
		if (!browser) return;
		if (view) view.destroy();

		if (editor) {
			editor_state = EditorState.create({
				doc: source.toString(),
				extensions: get_extensions(source)
			});

			view = new EditorView({
				state: editor_state,
				parent: editor
			});
		}
	}

	// let index;
	// function update_editor_source(i) {
	// 	if (index === i) return;
	// 	if (components.length < 1) return;

	// 	const tr = view.state.update({
	// 		changes: {
	// 			from: 0,
	// 			to: view.state.doc.length,
	// 			insert: source
	// 		}
	// 	});

	// 	view.dispatch(tr);

	// }
	// $effect(() => {
	// 	update_editor_source(current);
	// });
</script>

<div bind:this={editor} class="text-base sm:text-sm flex-1 overflow-scroll" />
