/* eslint-disable */

type UUIDv7 = string;

interface teamMember {
	userID: UUIDv7 & { __brand: "userID" };
}

interface team {
	teamID: UUIDv7 & { __brand: "teamID" };
	name: string;
	description: string;
	avatarURL: string;
	bannerURL: string;
	members: teamMember[];
}

interface organizationRole {
	roleID: UUIDv7 & { __brand: "roleID" };
	name: string;
	level: number;
	permissions: string[];
}

interface organizationMember {
	userID: UUIDv7 & { __brand: "userID" };
	roles: organizationRole[];
}

interface organization {
	organizationID: UUIDv7 & { __brand: "organizationID" };
	members: organizationMember[];
	name: string;
	description: string;
	avatarURL: string;
	bannerURL: string;
}
