import { appState } from "$lib/engines/appStateEngine.svelte";

import { generateUUIDv7 } from "./crypto";

// Add parameter sendAuth

async function baseFetch(
	url: string,
	method: string,
	data: Record<string, unknown>,
	customHeaders: Record<string, string> = {}
) {
	const correlationID = generateUUIDv7();

	const result = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			"x-Tab-Session-ID": appState.tabID as string,
			"x-Correlation-ID": correlationID,
			...customHeaders
		},
		body: JSON.stringify(data)
	});

	return result.json();
}

export async function postFetch(
	url: string,
	data: Record<string, unknown>,
	headers?: Record<string, string>
) {
	return baseFetch(url, "POST", data, headers);
}

export async function patchFetch(
	url: string,
	data: Record<string, unknown>,
	headers?: Record<string, string>
) {
	return baseFetch(url, "PATCH", data, headers);
}
