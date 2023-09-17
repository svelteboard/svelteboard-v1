const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			},
			screens: {
				standalone: { raw: '(display-mode: standalone)' }
			},
			boxShadow: {
				xs: '0 1px 2px 0 rgb(0 0 0 / 0.025)'
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
