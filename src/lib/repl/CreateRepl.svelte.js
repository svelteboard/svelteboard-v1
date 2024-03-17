import { browser } from '$app/environment';

export class CreateRepl {
	current = $state(0);
	worker = null;
	onComponentUpdated = null;
	update_output = null;
	update_tab = null;
	components = [];
	tabs = [];
	//tabs is separate from components because it was a pain to post message to iframe and worker using $state and $derrived. Could not be cloned. So I had to use a separate array to keep track of tabs

	//redo logic should be
	//update source -> compile -> update component
	// new compiled event triggers update_output

	constructor(
		_components = [
			{
				id: 0,
				name: 'App',
				type: 'svelte',
				source: ''
			}
		]
	) {
		this.components = _components;
		this.initializeWorker();
		this.jobId = 0;
	}

	initializeWorker() {
		if (!browser) return;

		let url = new URL('./worker.js', import.meta.url);
		this.worker = new Worker(url.href, { type: 'module' });
		this.worker.addEventListener('message', this.handleWorkerMessage.bind(this));
	}

	handleWorkerMessage(event) {
		if (this.update_output) {
			this.update_output(event.data);
		}
	}

	compile() {
		this.jobId++;
		if (!this.worker) return;
		this.worker.postMessage({ components: this.components, jobId: this.jobId });
	}

	on_update_output = (callback) => {
		if (!browser) return;
		this.update_output = callback;
		this.compile();
	};

	on_update_tab = (callback) => {
		if (!browser) return;
		this.update_tab = callback;
		callback(this.components[this.current].source);
	};

	update_source = (source) => {
		this.components[this.current].source = source;
		this.compile();
	};
	set_tab = (id) => {
		let i = this.components.findIndex((component) => component.id === id);
		this.current = i;
		if (this.update_tab) this.update_tab(this.components[i].source);
	};

	new_tab = () => {
		//get last component id and add 1
		const id = this.components[this.components.length - 1].id + 1;
		this.components.push({
			id,
			name: 'Component' + id,
			type: 'svelte',
			source: ''
		});
		this.set_tab(id);
	};
	remove_tab = (id) => {
		this.components = this.components.filter((component) => component.id !== id);
	};
	select_tab = (id) => {
		let i = this.components.findIndex((component) => component.id === id);
		if (i === this.current) return;
		if (i === -1) return;
		this.current = i;
		if (this.update_tab) this.update_tab(this.components[i].source);
	};

	setOnComponentUpdated(callback) {
		this.onComponentUpdated = callback;
	}

	get_tabs = () => {
		return this.components.map(({ id, name, type }) => ({ id, name, type }));
	};
}
