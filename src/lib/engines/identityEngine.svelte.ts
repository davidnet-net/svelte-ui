import type { UUIDv7Type } from "$lib/utils/crypto";

interface jwt {
	userID: UUIDv7Type & { __brand: "userID" };
	jwtID: UUIDv7Type & { __brand: "jwtID" };
	issuedAt: number;
	expiresAt: number;
}

interface user {
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

interface preferences {
	theme: "dark" | "light" | "contrast" | "system";
	language: string;
	timezone: string;
	firstDayOfWeek: string;
	dateFormat: string;
}

interface privacyPreferences {
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

export interface identityType {
	jwt: jwt;
	user: user;
	preferences: preferences;
	privacyPreferences: privacyPreferences;
}

export const authState = $state({
	loading: true,
	isBeating: false,
	isLoggedIn: false
});

export const identity: identityType | undefined = undefined;

let authTimer: ReturnType<typeof setTimeout> | null = null;

// Call authBeat instead do not touch refresh manually!
async function refresh() {
	console.debug("[identityEngine]: Refreshing...");

	// Some fancy api calls here
}

async function authBeat() {
	if (authState.isBeating) return;
	authState.isBeating = true;
	authState.loading = true;

	try {
		await refresh();
	} catch (error) {
		console.error("[identityEngine]: Auth beat failed", error);
	} finally {
		authState.isBeating = false;
		authState.loading = false;
		setupNextBeat();
	}
}

function setupNextBeat() {
	if (authTimer) clearTimeout(authTimer);

	let delay = 5 * 60 * 1000; // Default to 5s minutes

	if (identity?.jwt.expiresAt) {
		const now = Date.now();
		const expiresAtMs = identity.jwt.expiresAt * 1000; // Assuming Unix timestamp in seconds

		const buffer = 2 * 60 * 1000;
		delay = expiresAtMs - now - buffer;

		if (delay <= 0) delay = 1000;
	}

	console.log(delay);
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

// idea: use free have i been pwnd api to tell if password is breached on password change or on signup
