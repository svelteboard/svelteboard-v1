import * as rollup from '@rollup/browser';
import * as svelte from 'svelte/compiler';

const CDN_URL = 'https://esm.sh';

const component_lookup = new Map();
const compile_cache = new Map();

let currentJobId = 0;

function generate_lookup(components) {
	component_lookup.set('./__entry.js', {
		name: '__entry',
		source: `
      export { mount, unmount, untrack } from 'svelte';
      export { default as App } from './App.svelte';
    `,
		type: 'js',
		modified: false
	});

	for (let i = 0; i < components.length; i++) {
		component_lookup.set(`./${components[i].name}.${components[i].type}`, components[i]);
	}
}

self.addEventListener('message', async (event) => {
	const { components, jobId } = event.data;

	currentJobId = jobId;

	generate_lookup(components);

	try {
		if (jobId !== currentJobId) return;

		const bundle = await rollup.rollup({
			input: './__entry.js',
			plugins: [
				{
					name: 'repl-plugin',
					async resolveId(importee, importer) {
						// handle imports from 'svelte'
						if (importee === 'svelte' || importee.startsWith('svelte/')) {
							return external(get_svelte_runtime_url(importee));
						}

						if (importee === 'esm-env') {
							return external(`${CDN_URL}/esm-env@1.0.0/dev-browser.js`);
						}

						if (component_lookup.has(importee)) return importee;
						if (component_lookup.has(`${importee}.js`)) return importee + '.js';

						if (importee.startsWith('http:') || importee.startsWith('https:')) {
							return external(importee);
						}

						if (importer && /^https?:/.test(importer) && importee.startsWith('/')) {
							return external(new URL(importee, importer).href);
						}

						if (importer && /^https?:/.test(importer) && importee.startsWith('.')) {
							return external(new URL(importee, importer).href);
						}

						if (importee.startsWith('.')) {
							return resolve_local_import(importee, importer);
						}

						return external(`${CDN_URL}/${importee}`);
					},
					async load(id) {
						if (component_lookup.has(id)) return component_lookup.get(id).source;
					},
					transform(code, id) {
						if (!id.endsWith('.svelte')) return null;

						// self.postMessage({ type: 'status', message: `Compiling ${id}` });

						// Check the compile cache
						const cached = compile_cache.get(id);
						if (cached && cached.code === code) {
							return cached.result;
						}

						const result = svelte.compile(code, {
							filename: id,
							generate: 'client',
							css: 'external',
							dev: true,
							compatibility: {
								componentApi: 4
							}
						});

						if (result.css && result.css.code && result.css.code.trim() !== '') {
							result.js.code += `
                            const style = document.createElement('style');
                            style.textContent = ${JSON.stringify(result.css.code)};
                            document.head.appendChild(style);
                        `;
						}

						// Update the compile cache
						compile_cache.set(id, { code, result: result.js.code });

						return result.js.code;
					}
				}
			]
		});
		if (jobId !== currentJobId) return;

		const output = (await bundle.generate({ format: 'esm' }))?.output?.[0];
		// self.postMessage(output);
		self.postMessage({ type: 'output', message: output });
	} catch (error) {
		self.postMessage(error);
	}
});

function external(id) {
	return { id, external: true };
}

function get_svelte_runtime_url(importee) {
	const subpath = importee === 'svelte' ? '' : importee.slice('svelte'.length);
	return with_bundle_query(`${CDN_URL}/svelte@${svelte.VERSION}${subpath}`);
}

function with_bundle_query(url) {
	return url.includes('?') ? `${url}&bundle` : `${url}?bundle`;
}

function resolve_local_import(importee, importer) {
	if (!importer || !component_lookup.has(importer)) return null;

	const base = importer.slice(0, importer.lastIndexOf('/') + 1);
	const resolved = normalize_local_path(`${base}${importee}`);
	const candidates = [
		resolved,
		`${resolved}.svelte`,
		`${resolved}.js`,
		`${resolved}.json`,
		`${resolved}/index.svelte`,
		`${resolved}/index.js`
	];

	return candidates.find((candidate) => component_lookup.has(candidate)) || null;
}

function normalize_local_path(path) {
	const stack = [];

	for (const part of path.split('/')) {
		if (!part || part === '.') continue;
		if (part === '..') stack.pop();
		else stack.push(part);
	}

	return `./${stack.join('/')}`;
}
