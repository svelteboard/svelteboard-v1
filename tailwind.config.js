const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Figtree', ...defaultTheme.fontFamily.sans]
			},
			screens: {
				standalone: { raw: '(display-mode: standalone)' }
			},
			boxShadow: {
				xs: '0 1px 2px 0 rgb(0 0 0 / 0.025)'
			},
			colors: {
				forest: {
					50: '#F9FBF9',
					100: '#F2F8F4',
					200: '#DEEDE3',
					300: '#C4DECC',
					400: '#A3CCAF',
					500: '#7CB68D',
					600: '#579E6C',
					700: '#417751',
					800: '#2B4F36',
					900: '#073517',
					950: '#042411'
				},
				lime: {
					50: '#FDFEFB',
					100: '#F7FCED',
					200: '#EFFADB',
					300: '#E2F6C0',
					400: '#D1F19C',
					500: '#BCEB70',
					600: '#A3E33A',
					700: '#85C51C',
					800: '#70A617',
					900: '#588212'
				},
				gray: {
					50: '#F7F8F7',
					100: '#EEF1EF',
					200: '#E3E8E5',
					300: '#D2DAD5',
					400: '#9CABA2',
					500: '#6C7F73',
					600: '#4B6354',
					700: '#3B5444',
					800: '#19251D',
					900: '#041109'
				}
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
