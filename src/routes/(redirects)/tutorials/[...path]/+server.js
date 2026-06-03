import { redirect } from '@sveltejs/kit';

export async function GET({ params }) {
	return redirect(301, `/blog/${params.path}`);
}
