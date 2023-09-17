export const code_theme = {
	'&': {
		color: '#D1D5DB',
		backgroundColor: '#111827'
	},

	'.cm-content': {
		caretColor: '#F97316'
	},

	'.cm-cursor, .cm-dropCursor': { borderLeftColor: '#F97316' },

	'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
		{ backgroundColor: '#4B5563 !important' },

	'.cm-panels': { backgroundColor: '#1F2937', color: '#D1D5DB' },
	'.cm-panels.cm-panels-top': { borderBottom: '2px solid #9CA3AF' },
	'.cm-panels.cm-panels-bottom': { borderTop: '2px solid #9CA3AF' },

	'.cm-searchMatch': {
		backgroundColor: '#7F1D1D'
	},
	'.cm-searchMatch.cm-searchMatch-selected': {
		backgroundColor: '#450A0A'
	},

	'.cm-activeLine': {
		backgroundColor: '#111827',
		border: '1px solid #1f2937 !important'
	},
	'.cm-line ::selection': {
		background: '#4B5563 !important'
	},
	'.cm-activeLine.cm-line ::selection': {
		background: '#4B5563 !important'
	},

	'&.cm-focused .cm-selectionBackground, ::selection': {
		backgroundColor: '#4B5563 !important'
	},

	'.cm-selectionMatch': { backgroundColor: '#6B7280' },

	'&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
		backgroundColor: '#4B5563'
	},

	'.cm-gutters': {
		minWidth: '34px',
		backgroundColor: '#111827',
		color: '#6b7280',
		border: 'none'
	},
	'.cm-line': {
		border: '1px solid transparent',
		minHeight: '23px'
	},

	'.cm-activeLineGutter': {
		color: '#f3f4f6',
		backgroundColor: '#111827'
	},

	'.cm-foldPlaceholder': {
		backgroundColor: 'transparent',
		border: 'none',
		color: '#9CA3AF'
	},

	'.cm-tooltip': {
		border: 'none',
		backgroundColor: '#1F2937'
	},
	'.cm-tooltip .cm-tooltip-arrow:before': {
		borderTopColor: 'transparent',
		borderBottomColor: 'transparent'
	},
	'.cm-tooltip .cm-tooltip-arrow:after': {
		borderTopColor: '#1F2937',
		borderBottomColor: '#1F2937'
	},
	'.cm-tooltip-autocomplete': {
		color: '#D1D5DB !important',
		perspective: '1px',
		'& > ul > li[aria-selected]': {
			backgroundColor: '#030712',
			color: '#f3f4f6 !important'
		}
	}
};
