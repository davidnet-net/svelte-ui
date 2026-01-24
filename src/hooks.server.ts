export async function handle({ event, resolve }) {
	//! FIX: For legacy applications that still use the static "Design website CDN"
	const response = await resolve(event);

	if (event.url.pathname.match(/\.(woff2?|ttf|otf)$/)) {
		response.headers.set("Access-Control-Allow-Origin", "*");
	}

	return response;
}
