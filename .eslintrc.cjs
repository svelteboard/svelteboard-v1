module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	globals: {
		$derived: 'readonly',
		$effect: 'readonly',
		$props: 'readonly',
		$state: 'readonly'
	},
	rules: {
		'no-useless-escape': 'off',
		'svelte/valid-compile': ['error', { ignoreWarnings: true }]
	}
};
