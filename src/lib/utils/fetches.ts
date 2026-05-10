import { appState } from "$lib/engines/appStateEngine.svelte";

import { generateUUIDv7 } from "./crypto";

/**
 * Core internal fetching utility that standardizes API requests across the application.
 * Automatically handles correlation IDs, session tracking, JSON formatting, and query parameter conversion.
 * * @param url - The fully qualified URL or path to the API endpoint.
 * @param method - The HTTP method to use (e.g., "GET", "POST").
 * @param data - Optional data payload. Converted to query parameters for GET/HEAD, and a JSON body for others.
 * @param customHeaders - Optional dictionary of additional headers to merge with the default headers.
 * @param sendAuth - If true, attaches the user's authentication token to the request headers.
 * @returns A promise that resolves to the parsed JSON response from the server.
 */
async function baseFetch(
	url: string,
	method: string,
	data?: Record<string, unknown>,
	customHeaders: Record<string, string> = {},
	sendAuth = false
) {
	const correlationID = generateUUIDv7();

	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		"x-Tab-Session-ID": appState.tabID as string,
		"x-Correlation-ID": correlationID,
		...customHeaders
	};

	if (sendAuth) {
		// TODO Send auth!!!
	}

	const options: RequestInit = {
		method,
		headers
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
		} else {
			options.body = JSON.stringify(data);
		}
	}

	const result = await fetch(finalUrl, options);
	return result.json();
}

/**
 * Performs an HTTP GET request.
 * * @param url - The endpoint URL.
 * @param data - Optional data to be appended to the URL as query string parameters.
 * @param headers - Optional custom headers to include in the request.
 * @param sendAuth - Whether to include the authentication token. Defaults to false.
 * @returns A promise resolving to the JSON response.
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
 * * @param url - The endpoint URL.
 * @param data - The data payload to be serialized as a JSON body.
 * @param headers - Optional custom headers to include in the request.
 * @param sendAuth - Whether to include the authentication token. Defaults to false.
 * @returns A promise resolving to the JSON response.
 */
export async function postFetch(
	url: string,
	data: Record<string, unknown>,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "POST", data, headers, sendAuth);
}

/**
 * Performs an HTTP PATCH request to apply partial modifications to a resource.
 * * @param url - The endpoint URL.
 * @param data - The partial data payload to be serialized as a JSON body.
 * @param headers - Optional custom headers to include in the request.
 * @param sendAuth - Whether to include the authentication token. Defaults to false.
 * @returns A promise resolving to the JSON response.
 */
export async function patchFetch(
	url: string,
	data: Record<string, unknown>,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "PATCH", data, headers, sendAuth);
}

/**
 * Performs an HTTP PUT request to replace a target resource.
 * * @param url - The endpoint URL.
 * @param data - The complete data payload to be serialized as a JSON body.
 * @param headers - Optional custom headers to include in the request.
 * @param sendAuth - Whether to include the authentication token. Defaults to false.
 * @returns A promise resolving to the JSON response.
 */
export async function putFetch(
	url: string,
	data: Record<string, unknown>,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "PUT", data, headers, sendAuth);
}

/**
 * Performs an HTTP DELETE request to remove a specified resource.
 * * @param url - The endpoint URL.
 * @param data - Optional data payload to be serialized as a JSON body.
 * @param headers - Optional custom headers to include in the request.
 * @param sendAuth - Whether to include the authentication token. Defaults to false.
 * @returns A promise resolving to the JSON response.
 */
export async function deleteFetch(
	url: string,
	data?: Record<string, unknown>,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "DELETE", data, headers, sendAuth);
}

/**
 * Performs an HTTP HEAD request. Identical to GET, but the server does not return a message body.
 * Useful for checking if a resource exists or reading its headers.
 * * @param url - The endpoint URL.
 * @param data - Optional data to be appended to the URL as query string parameters.
 * @param headers - Optional custom headers to include in the request.
 * @param sendAuth - Whether to include the authentication token. Defaults to false.
 * @returns A promise resolving to the JSON response.
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
 * Performs an HTTP OPTIONS request to describe the communication options for the target resource.
 * * @param url - The endpoint URL.
 * @param data - Optional data payload to be serialized as a JSON body.
 * @param headers - Optional custom headers to include in the request.
 * @param sendAuth - Whether to include the authentication token. Defaults to false.
 * @returns A promise resolving to the JSON response.
 */
export async function optionsFetch(
	url: string,
	data?: Record<string, unknown>,
	headers?: Record<string, string>,
	sendAuth = false
) {
	return baseFetch(url, "OPTIONS", data, headers, sendAuth);
}
