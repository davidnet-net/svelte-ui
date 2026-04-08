import { appState } from "$lib/engines/appStateEngine.svelte";

import { generateUUIDv7 } from "./crypto";

export async function postFetch(url: string, data: Record<string, unknown>) {
	const correlationID = generateUUIDv7(); // Replace with open telemetry traceID

	const result = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-Tab-Session-ID": appState.tabID as string,
			"x-Correlation-ID": correlationID
		},
		body: JSON.stringify(data)
	});

	return result;
}
