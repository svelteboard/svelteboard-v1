import * as rollup from 'https://unpkg.com/@rollup/browser/dist/es/rollup.browser.js';

const CDN_URL = 'https://unpkg.com';
const svelte_url = 'https://unpkg.com/svelte@5.0.0-next.80';

const component_lookup = new Map();
const fetch_cache = new Map();
const compile_cache = new Map();
let svelteCompilerLoaded = false;

let currentJobId = 0;
async function initCompiler() {
	try {
		importScripts(`https://svelte-compiler.dashing.workers.dev/`);
		svelteCompilerLoaded = true;
	} catch {
		await import(`https://svelte-compiler.dashing.workers.dev/`);
		svelteCompilerLoaded = true;
	}
}
async function follow_redirects(url) {
	const res = await fetch_if_uncached(url);
	return res.url;
}

async function fetch_if_uncached(url) {
	if (fetch_cache.has(url)) {
		return fetch_cache.get(url);
	}
	// self.postMessage({ type: 'status', message: `Fetching ${url}` });

	const promise = fetch(url)
		.then(async (r) => {
			if (r.ok) {
				return {
					url: r.url,
					body: await r.text()
				};
			}
			throw new Error(await r.text());
		})
		.catch((err) => {
			fetch_cache.delete(url);
			throw err;
		});

	fetch_cache.set(url, promise);
	return promise;
}

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

initCompiler();
self.addEventListener('message', async (event) => {
	if (!svelteCompilerLoaded) {
		await initCompiler();
	}

	const { components, jobId } = event.data;

	currentJobId = jobId;

	try {
		importScripts(`https://svelte-compiler.dashing.workers.dev/`);
	} catch {
		await import(`https://svelte-compiler.dashing.workers.dev/`);
	}

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
						if (importee === 'svelte') return `${svelte_url}/src/main/main-client.js`;
						if (importee === 'svelte/internal') return `${svelte_url}/src/internal/index.js`;

						if (importee.startsWith('svelte/')) {
							const sub_path = importee.slice(7);
							return `${svelte_url}/src/${sub_path}.js`;
						}

						if (importee === 'esm-env') {
							return `https://cdn.jsdelivr.net/npm/esm-env@1.0.0/dev-browser.js`;
						}

						if (component_lookup.has(importee)) return importee;
						if (component_lookup.has(`${importee}.js`)) return importee + '.js';

						if (importee.startsWith('http:') || importee.startsWith('https:')) return importee;

						if (importee.startsWith('.')) {
							if (importer && component_lookup.has(importer)) {
								return new URL(importee, importer).href;
							} else {
								const url = new URL(importee, importer).href;
								return await follow_redirects(url);
							}
						}

						const pkg_url = `${CDN_URL}/${importee}/package.json`;
						const pkg_json = await fetch_if_uncached(pkg_url).then((res) => res.body);
						const pkg = JSON.parse(pkg_json);

						if (pkg.svelte) {
							return new URL(pkg.svelte, pkg_url.replace(/\/package\.json$/, '/')).href;
						}
						if (pkg.module) {
							return new URL(pkg.module, pkg_url.replace(/\/package\.json$/, '/')).href;
						}
						if (pkg.main) {
							return new URL(pkg.main, pkg_url.replace(/\/package\.json$/, '/')).href;
						}

						return await follow_redirects(`${CDN_URL}/${importee}`);
					},
					async load(id) {
						if (component_lookup.has(id)) return component_lookup.get(id).source;

						const res = await fetch_if_uncached(id);
						return res.body;
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
							generate: 'dom',
							dev: true
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
