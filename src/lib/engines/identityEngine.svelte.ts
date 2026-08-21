import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { UUIDv7Type } from "$lib/utils/crypto";
import { deleteFetch, getFetch, postFetch, putFetch } from "$lib/utils/fetches";

import { afterIdentityInit } from "./initEngine.svelte";
import { toast } from "./toastEngine.svelte";

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

export const rbacState = $state<{
	isOwner: boolean;
	isPersonal: boolean;
	workspacePermissions: Set<string>;
	teamPermissions: Map<string, Set<string>>;
}>({
	isOwner: false,
	isPersonal: false,
	workspacePermissions: new Set(),
	teamPermissions: new Map()
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

	rbacState.isOwner = false;
	rbacState.isPersonal = false;
	rbacState.workspacePermissions.clear();
	rbacState.teamPermissions.clear();
}

export async function logout() {
	await clearIdentityData();
	await deleteFetch(PUBLIC_BACKEND_URL + "/auth/session");
	await authBeat();
	window.location.reload();
}

export async function syncWorkspaceAccess(workspaceId: string) {
	console.debug(`[identityEngine]: Syncing RBAC for workspace ${workspaceId}`);
	const rbacRes = await getFetch(
		`${PUBLIC_BACKEND_URL}/workspaces/${workspaceId}/access`,
		undefined,
		undefined,
		true
	);

	if (rbacRes && rbacRes.success) {
		rbacState.isOwner = rbacRes.isOwner;
		rbacState.isPersonal = rbacRes.isPersonal;
		rbacState.workspacePermissions = new Set(rbacRes.workspacePermissions);

		const teamMap = new Map<string, Set<string>>();
		for (const [tId, perms] of Object.entries(rbacRes.teamPermissions)) {
			teamMap.set(tId, new Set(perms as string[]));
		}
		rbacState.teamPermissions = teamMap;
	}
}

export function hasPermission(permissionKey: string, teamId?: string): boolean {
	if (rbacState.isOwner) return true;
	if (rbacState.isPersonal) return false;

	if (rbacState.workspacePermissions.has(permissionKey)) return true;

	if (teamId) {
		const teamPerms = rbacState.teamPermissions.get(teamId);
		if (teamPerms?.has(permissionKey)) return true;
	}

	return false;
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

			// Auto-select personal workspace in the backend database if none is active
			if (!identityState.user.lastActiveWorkspaceId && identityState.workspaces) {
				const personalWorkspace = identityState.workspaces.find((w) => w.type === "personal");

				if (personalWorkspace) {
					console.debug(
						"[identityEngine]: No active workspace found. Auto-selecting personal workspace."
					);

					const selectRes = await putFetch(
						`${PUBLIC_BACKEND_URL}/workspaces/select`,
						{ workspaceId: personalWorkspace.id },
						undefined,
						true
					);

					if (selectRes && selectRes.success) {
						identityState.user.lastActiveWorkspaceId = personalWorkspace.id;
						console.debug("[identityEngine]: Personal workspace successfully auto-selected.");
					}
				}
			}
		}

		if (prefRes.status === "fulfilled" && prefRes.value) {
			identityState.preferences = prefRes.value as preferences;
		}

		if (privacyRes.status === "fulfilled" && privacyRes.value) {
			identityState.privacy = privacyRes.value as privacyPreferences;
		}

		if (identityState.user?.lastActiveWorkspaceId) {
			await syncWorkspaceAccess(identityState.user.lastActiveWorkspaceId);
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

// Derived state to automatically track the current workspace with personal fallback
export function getCurrentWorkspace() {
	if (!identityState.workspaces) return undefined;

	let current = identityState.user?.lastActiveWorkspaceId
		? identityState.workspaces.find((w) => w.id === identityState.user?.lastActiveWorkspaceId)
		: undefined;

	if (!current) {
		current = identityState.workspaces.find((w) => w.type === "personal");
	}

	return current;
}

export async function switchWorkspace(workspaceID: string, name: string) {
	const result = await putFetch(
		PUBLIC_BACKEND_URL + "/workspaces/select",
		{
			workspaceId: workspaceID
		},
		undefined,
		true
	);

	if (result.code === "WORKSPACE_NOT_FOUND") {
		await authBeat();
		toast(
			"Workspace doesn't exist",
			"We reloaded your workspaces for you!",
			undefined,
			3000,
			"danger"
		);
		return;
	}

	if (result.code === "FORBIDDEN") {
		await authBeat();
		toast(
			"You don't have access to this workspace!",
			"We reloaded your workspaces for you!",
			undefined,
			3000,
			"danger"
		);
		return;
	}

	if (result.success) {
		if (identityState.user) {
			identityState.user.lastActiveWorkspaceId = workspaceID as UUIDv7Type & {
				__brand: "workspaceID";
			};
		}

		await syncWorkspaceAccess(workspaceID);

		toast("Workspace switched!", name, undefined, 3000);
	}
}
