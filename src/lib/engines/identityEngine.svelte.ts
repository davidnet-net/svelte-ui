import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { UUIDv7Type } from "$lib/utils/crypto";
import { postFetch } from "$lib/utils/fetches";
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

export let currentToken: accessToken | undefined = $state(undefined);
export const currentUser: user | undefined = $state(undefined);
export const currentPreferences: preferences | undefined = $state(undefined);
export const currentPrivacyPreferences: privacyPreferences | undefined = $state(undefined);

let authTimer: ReturnType<typeof setTimeout> | null = null;

// Call authBeat instead do not touch refresh manually!
async function refresh() {
	console.debug("[identityEngine]: Refreshing...");

	try {
		const result = await postFetch(`${PUBLIC_BACKEND_URL}/auth/session/refresh`, {});
		if (result && result.accessToken) {
			currentToken = {
				raw: result.accessToken,
				userID: result.userID,
				jwtID: result.jwtID,
				issuedAt: result.issuedAt,
				expiresAt: result.expiresAt
			};
			authState.isLoggedIn = true;
		} else {
			authState.isLoggedIn = false;
		}
	} catch (error) {
		console.warn("[identityEngine]: Refresh failed or session expired", error);
		authState.isLoggedIn = false;
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
		setupNextBeat();
	}
}

function setupNextBeat() {
	if (authTimer) clearTimeout(authTimer);

	let delay = 5 * 60 * 1000; // 5 MIN

	if (currentToken?.expiresAt) {
		const now = Date.now();
		const expiresAtMs = currentToken.expiresAt * 1000; // Unix timestamp in seconds

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
