/* eslint-disable */

import type { UUIDv7Type } from "$lib/utils/crypto";

interface teamMember {
	userID: UUIDv7Type & { __brand: "userID" };
}

interface team {
	teamID: UUIDv7Type & { __brand: "teamID" };
	name: string;
	description: string;
	avatarURL: string;
	bannerURL: string;
	members: teamMember[];
}

interface organizationRole {
	roleID: UUIDv7Type & { __brand: "roleID" };
	name: string;
	level: number;
	permissions: string[];
}

interface organizationMember {
	userID: UUIDv7Type & { __brand: "userID" };
	roles: organizationRole[];
}

interface organization {
	organizationID: UUIDv7Type & { __brand: "organizationID" };
	members: organizationMember[];
	name: string;
	description: string;
	avatarURL: string;
	bannerURL: string;
}
