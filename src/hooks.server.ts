/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);

	// Check if the request is for a file in the /fonts directory
	if (event.url.pathname.startsWith("/fonts/")) {
		// Set CORS to allow any origin
		response.headers.set("Access-Control-Allow-Origin", "*");

		// Optional: Specify allowed methods or cache headers for fonts
		response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
		response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
	}

	return response;
}
