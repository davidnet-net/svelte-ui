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
		| "organization"
		| "connections"
		| "organization_and_connections"
		| "public";
	timezoneVisibility:
		| "private"
		| "organization"
		| "connections"
		| "organization_and_connections"
		| "public";
	locationVisibility:
		| "private"
		| "organization"
		| "connections"
		| "organization_and_connections"
		| "public";
	emailVisibility:
		| "private"
		| "organization"
		| "connections"
		| "organization_and_connections"
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
	isLoggedIn: false
});

export const identity: identityType | undefined = undefined;
