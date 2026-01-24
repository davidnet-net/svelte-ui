/** INTENDED FOR LEGACY APPS**/
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);

	if (event.url.pathname.startsWith("/fonts/")) {
		response.headers.set("Access-Control-Allow-Origin", "*");
		response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
		response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
	}

	return response;
}
