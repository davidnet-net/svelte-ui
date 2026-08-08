import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { UUIDv7Type } from "$lib/utils/crypto";
import { deleteFetch, getFetch, postFetch } from "$lib/utils/fetches";

import { afterIdentityInit } from "./initEngine.svelte";

// Access token! --- Refresh Token is HTTP ONLY
export interface accessToken {
	userID: UUIDv7Type & { __brand: "userID" };
	jwtID: UUIDv7Type & { __brand: "jwtID" };
	issuedAt: number;
	expiresAt: number;
	raw: string;
}

export interface user {
	userID: UUIDv7Type & { __brand: "userID" };
	username: string;
	displayName: string;
	avatarURL: string;
	bannerURL: string;
	description: string;
	email: string;
	countryCode: string;
	location: string;
	isAdmin: boolean;
	isInternal: boolean;
}

export interface preferences {
	theme: "dark" | "light" | "contrast" | "system";
	language: string;
	timezone: string;
	firstDayOfWeek: string;
	dateFormat: string;
}

export interface privacyPreferences {
	languageVisibility:
		| "private"
		| "organizations"
		| "connections"
		| "organizations_and_connections"
		| "public";
	timezoneVisibility:
		| "private"
		| "organizations"
		| "connections"
		| "organizations_and_connections"
		| "public";
	locationVisibility:
		| "private"
		| "organizations"
		| "connections"
		| "organizations_and_connections"
		| "public";
	emailVisibility:
		| "private"
		| "organizations"
		| "connections"
		| "organizations_and_connections"
		| "public";
}

export const authState = $state({
	loading: true,
	isBeating: false,
	isLoggedIn: false
});

export const identityState = $state<{
	token: accessToken | undefined;
	user: user | undefined;
	preferences: preferences | undefined;
	privacy: privacyPreferences | undefined;
}>({
	token: undefined,
	user: undefined,
	preferences: undefined,
	privacy: undefined
});

let authTimer: ReturnType<typeof setTimeout> | null = null;
let isInitialLoad = true;

let resolveReady: () => void;
const readyPromise = new Promise<void>((resolve) => {
	resolveReady = resolve;
});

export async function clearIdentityData() {
	console.debug("[identityEngine]: Clearing identity data...");
	identityState.token = undefined;
	identityState.user = undefined;
	identityState.preferences = undefined;
	identityState.privacy = undefined;
}

export async function logout() {
	await clearIdentityData();
	await deleteFetch(PUBLIC_BACKEND_URL + "/auth/session");
	await authBeat();
}

export async function syncProfileData() {
	if (!identityState.token?.raw) {
		console.warn("[identityEngine]: Cannot sync profile data without a token.");
		return;
	}

	console.debug("[identityEngine]: Syncing user profile data...");

	try {
		// Fetch all three endpoints concurrently using the new getFetch wrapper
		const [userRes, prefRes, privacyRes] = await Promise.allSettled([
			getFetch(`${PUBLIC_BACKEND_URL}/auth/me`, undefined, undefined, true),
			getFetch(`${PUBLIC_BACKEND_URL}/auth/preferences`, undefined, undefined, true),
			getFetch(`${PUBLIC_BACKEND_URL}/auth/privacy/preferences`, undefined, undefined, true)
		]);

		if (userRes.status === "fulfilled" && userRes.value) {
			identityState.user = userRes.value as user;
		}

		if (prefRes.status === "fulfilled" && prefRes.value) {
			identityState.preferences = prefRes.value as preferences;
		}

		if (privacyRes.status === "fulfilled" && privacyRes.value) {
			identityState.privacy = privacyRes.value as privacyPreferences;
		}
	} catch (error) {
		console.error("[identityEngine]: Critical error syncing profile data", error);
	}
}

// Call authBeat instead do not touch refresh manually!
async function refresh() {
	console.debug("[identityEngine]: Refreshing...");

	try {
		const result = await postFetch(`${PUBLIC_BACKEND_URL}/auth/session/refresh`, {});

		if (result && result.accessToken) {
			identityState.token = {
				raw: result.accessToken,
				userID: result.userID,
				jwtID: result.jwtID,
				issuedAt: result.issuedAt,
				expiresAt: result.expiresAt
			};

			authState.isLoggedIn = true;

			// Fetch profile data on EVERY successful refresh
			await syncProfileData();
			await afterIdentityInit();
		} else {
			console.warn("[identityEngine]: Session expired or never logged in.");
			authState.isLoggedIn = false;
			clearIdentityData();
		}
	} catch (error) {
		console.warn("[identityEngine]: Refresh request failed.", error);
		authState.isLoggedIn = false;
		clearIdentityData();
	}
}

export async function authBeat() {
	if (authState.isBeating) return;
	authState.isBeating = true;
	authState.loading = true;

	try {
		await refresh();
	} catch (error) {
		console.error("[identityEngine]: Auth beat failed", error);
	} finally {
		console.debug("[identityEngine]: Auth beat finished");
		authState.isBeating = false;
		authState.loading = false;

		if (isInitialLoad) {
			isInitialLoad = false;
			resolveReady();
		}

		setupNextBeat();
	}
}

function setupNextBeat() {
	if (authTimer) clearTimeout(authTimer);

	let delay = 5 * 60 * 1000; // 5 MIN

	if (identityState.token?.expiresAt) {
		const now = Date.now();
		const expiresAtMs = identityState.token.expiresAt * 1000; // Unix timestamp in seconds

		const buffer = 2 * 60 * 1000;
		delay = expiresAtMs - now - buffer;

		if (delay <= 0) delay = 1000;
	}

	authTimer = setTimeout(() => {
		authBeat();
	}, delay);
}

export async function initIdentityEngine() {
	document.addEventListener("visibilitychange", async () => {
		if (document.visibilityState === "visible") {
			await authBeat();
		}
	});

	await authBeat();
}

export function whenAuthReady(): Promise<void> {
	return readyPromise;
}
