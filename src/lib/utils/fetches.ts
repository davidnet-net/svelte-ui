import { appState } from "$lib/engines/appStateEngine.svelte";

import { generateUUIDv7 } from "./crypto";

async function postFetch(url: string, data: Record<string, unknown>) {
	const correlationID = generateUUIDv7();

	await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-Page-Session-ID": appState.pageSessionID as string,
			"x-Correlation-ID": correlationID
		},
		body: JSON.stringify(data)
	});
}

postFetch("", { b: "a" });
