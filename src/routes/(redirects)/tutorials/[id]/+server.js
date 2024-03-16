import { redirect } from '@sveltejs/kit';

export async function GET({ params }) {
	let location = params.id;
	return redirect(301, `/blog/${location}`);
}
