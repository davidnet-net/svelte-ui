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
	lastActiveWorkspaceId: (UUIDv7Type & { __brand: "workspaceID" }) | null;
}

export interface workspace {
	id: UUIDv7Type & { __brand: "workspaceID" };
	ownerId: UUIDv7Type & { __brand: "userID" };
	type: "personal" | "organization";
	name: string;
	createdAt: string;
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
	workspaces: workspace[] | undefined;
	preferences: preferences | undefined;
	privacy: privacyPreferences | undefined;
}>({
	token: undefined,
	user: undefined,
	workspaces: undefined,
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
	identityState.workspaces = undefined;
	identityState.preferences = undefined;
	identityState.privacy = undefined;
}

export async function logout() {
	await clearIdentityData();
	await deleteFetch(PUBLIC_BACKEND_URL + "/auth/session");
	await authBeat();
	window.location.reload();
}

export async function syncProfileData() {
	if (!identityState.token?.raw) {
		console.warn("[identityEngine]: Cannot sync profile data without a token.");
		return;
	}

	console.debug("[identityEngine]: Syncing user profile data...");

	try {
		const [userRes, prefRes, privacyRes] = await Promise.allSettled([
			getFetch(`${PUBLIC_BACKEND_URL}/auth/me`, undefined, undefined, true),
			getFetch(`${PUBLIC_BACKEND_URL}/auth/preferences`, undefined, undefined, true),
			getFetch(`${PUBLIC_BACKEND_URL}/auth/privacy/preferences`, undefined, undefined, true)
		]);

		if (userRes.status === "fulfilled" && userRes.value) {
			const data = userRes.value as any;

			identityState.user = {
				userID: data.userID,
				username: data.username,
				displayName: data.displayName,
				avatarURL: data.avatarURL,
				bannerURL: data.bannerURL,
				description: data.description,
				email: data.email,
				countryCode: data.countryCode,
				location: data.location,
				isAdmin: data.isAdmin,
				isInternal: data.isInternal,
				lastActiveWorkspaceId: data.lastActiveWorkspaceId ?? null
			};

			identityState.workspaces = data.workspaces as workspace[];
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
}

export async function authBeat() {
	if (authState.isBeating) return;
	authState.isBeating = true;
	authState.loading = true;

	let timeoutId: ReturnType<typeof setTimeout>;
	const timeoutPromise = new Promise((_, reject) => {
		timeoutId = setTimeout(() => {
			reject(new Error("[identityEngine]: Auth beat timed out after 10s"));
		}, 10000);
	});

	try {
		await Promise.race([refresh(), timeoutPromise]);
	} catch (error) {
		console.warn("[identityEngine]: Auth beat failed or timed out.", error);
		authState.isLoggedIn = false;
		await clearIdentityData();
	} finally {
		clearTimeout(timeoutId!);
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

// Derived state to automatically track the current workspace
export function getCurrentWorkspace() {
	return identityState.workspaces && identityState.user?.lastActiveWorkspaceId
		? identityState.workspaces.find((w) => w.id === identityState.user?.lastActiveWorkspaceId)
		: undefined;
}
