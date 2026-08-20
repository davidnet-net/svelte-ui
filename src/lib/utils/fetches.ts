import { toast } from "$lib/engines";
import { appState } from "$lib/engines/appStateEngine.svelte";
import { identityState } from "$lib/engines/identityEngine.svelte";

import { generateUUIDv7 } from "./crypto";

/**
 * Core internal fetching utility that standardizes API requests across the application.
 * Automatically handles correlation IDs, session tracking, JSON/FormData formatting, and query parameter conversion.
 */
async function baseFetch(
	url: string,
	method: string,
	data?: Record<string, unknown> | FormData,
	customHeaders: Record<string, string> = {},
	sendAuth = false
) {
	const correlationID = generateUUIDv7();

	// Check if the payload is FormData
	const isFormData = data instanceof FormData;

	// Dynamically set content-type: omit it for FormData so the browser handles the boundary string automatically
	const headers: Record<string, string> = {
		...(isFormData ? {} : { "Content-Type": "application/json" }),
		"x-Tab-Session-ID": appState.tabID as string,
		"x-Correlation-ID": correlationID,
		...customHeaders
	};

	if (sendAuth) {
		if (identityState.token?.raw) {
			headers["Authorization"] = `Bearer ${identityState.token.raw}`;
		} else {
			console.warn("[baseFetch]: sendAuth requested, but no token is in memory.");
		}
	}

	const options: RequestInit = {
		method,
		headers,
		credentials: "include"
	};

	let finalUrl = url;

	if (data) {
		if (method === "GET" || method === "HEAD") {
			const params = new URLSearchParams();
			Object.entries(data).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					params.append(key, String(value));
				}
			});

			const queryString = params.toString();
			if (queryString) {
				finalUrl += `?${queryString}`;
			}
		} else if (isFormData) {
			// Pass FormData directly as the body without JSON stringification
			options.body = data;
		} else {
			options.body = JSON.stringify(data);
		}
	}

	const result = await fetch(finalUrl, options);

	if (result.status === 429) {
		toast("Not so fast!", "You are going too fast, slow down.", "acute", 4000, "warning");
		return { code: "RATELIMIT", success: false };
	}
	if (result.status >= 500 && result.status <= 599) {
		toast("Sorry!", "Something went wrong on our side.", "error", 4000, "danger");
		return { code: "SERVER_ERROR", success: false };
	}
	if (result.status >= 401) {
		const parsedResult = await result.json();
		if (parsedResult.code !== "NO_PERMISSION") return;
		toast("Sorry!", "Missing permission: " + parsedResult.permisson, "error", 4000, "danger");
		return { code: "NO_PERMISSION", success: false };
	}
	return result.json();
}

/**
 * Performs an HTTP GET request.
 */
export async function getFetch(
	url: string,
	data?: Record<string, unknown>,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "GET", data, headers, sendAuth);
}

/**
 * Performs an HTTP POST request.
 */
export async function postFetch(
	url: string,
	data: Record<string, unknown> | FormData,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "POST", data, headers, sendAuth);
}

/**
 * Performs an HTTP PATCH request to apply partial modifications to a resource.
 */
export async function patchFetch(
	url: string,
	data: Record<string, unknown> | FormData,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "PATCH", data, headers, sendAuth);
}

/**
 * Performs an HTTP PUT request to replace a target resource.
 */
export async function putFetch(
	url: string,
	data: Record<string, unknown> | FormData,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "PUT", data, headers, sendAuth);
}

/**
 * Performs an HTTP DELETE request to remove a specified resource.
 */
export async function deleteFetch(
	url: string,
	data?: Record<string, unknown> | FormData,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "DELETE", data, headers, sendAuth);
}

/**
 * Performs an HTTP HEAD request.
 */
export async function headFetch(
	url: string,
	data?: Record<string, unknown>,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "HEAD", data, headers, sendAuth);
}

/**
 * Performs an HTTP OPTIONS request.
 */
export async function optionsFetch(
	url: string,
	data?: Record<string, unknown> | FormData,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "OPTIONS", data, headers, sendAuth);
}
