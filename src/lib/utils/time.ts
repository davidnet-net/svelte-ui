import { getSessionInfo, refreshAccessToken } from "$lib/session.js";

export function formatDateWithUTCOffset(date: Date): string {
	const pad = (n: number) => n.toString().padStart(2, "0");

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());

	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());

	// timezone offset in minutes
	const offsetMinutes = date.getTimezoneOffset();
	const sign = offsetMinutes > 0 ? "-" : "+";
	const absOffset = Math.abs(offsetMinutes);
	const offsetHours = pad(Math.floor(absOffset / 60));
	const offsetMins = pad(absOffset % 60);

	return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} UTC${sign}${offsetHours}:${offsetMins}`;
}

export async function formatDate_PREFERREDTIME(date: Date | string | undefined | null, correlationID: string): Promise<string> {
	// Check if the input is valid
	if (!date) {
		console.warn("formatDate_PREFERREDTIME: Date is null or undefined");
		return "Invalid date";
	}

	let d: Date;
	try {
		d = typeof date === "string" ? new Date(date) : date;
		if (isNaN(d.getTime())) {
			console.warn("formatDate_PREFERREDTIME: Invalid date object", date);
			return "Invalid date";
		}
	} catch (err) {
		console.error("formatDate_PREFERREDTIME: Error parsing date", err);
		return "Invalid date";
	}

	let timezone = "UTC";
	let dateFormat = "DD-MM-YYYY HH:mm";

	try {
		// Silent refresh, no fresh DB data
		await refreshAccessToken(correlationID, true, false);

		// Get session info
		const session = await getSessionInfo(correlationID, false);
		if (session?.preferences) {
			timezone = session.preferences.timezone || timezone;
			dateFormat = session.preferences.dateFormat || dateFormat;
		}
	} catch (err) {
		console.warn("formatDate_PREFERREDTIME: Failed to get session preferences, using defaults", err);
	}

	try {
		// Format the date using Intl API
		const parts = new Intl.DateTimeFormat("en-US", {
			timeZone: timezone,
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		})
			.formatToParts(d)
			.reduce(
				(acc: Record<string, string>, part: Intl.DateTimeFormatPart) => {
					if (part.type !== "literal") acc[part.type] = part.value;
					return acc;
				},
				{} as Record<string, string>
			);

		const day = parts.day ?? "??";
		const month = parts.month ?? "??";
		const year = parts.year ?? "????";
		const hour = parts.hour ?? "??";
		const minute = parts.minute ?? "??";

		switch (dateFormat) {
			case "DD-MM-YYYY HH:mm":
				return `${day}-${month}-${year} ${hour}:${minute}`;
			case "MM-DD-YYYY HH:mm":
				return `${month}-${day}-${year} ${hour}:${minute}`;
			case "YYYY-MM-DD HH:mm":
				return `${year}-${month}-${day} ${hour}:${minute}`;
			default:
				return `${day}-${month}-${year} ${hour}:${minute}`;
		}
	} catch (err) {
		console.error("formatDate_PREFERREDTIME: Error formatting date", err);
		return "Invalid date";
	}
}

export async function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function isMachineTimeSameAsPreferred(correlationID: string): Promise<boolean> {
	try {
		await refreshAccessToken(correlationID, true, false);
		const session = await getSessionInfo(correlationID, false);
		const preferredTZ = session?.preferences?.timezone || "UTC";

		const now = new Date();

		// --- Helper: get the offset (in minutes ahead of UTC) for a given timezone ---
		const getOffsetForZone = (tz: string): number => {
			// Format the current time in that timezone
			const parts = new Intl.DateTimeFormat("en-US", {
				timeZone: tz,
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false
			})
				.formatToParts(now)
				.reduce((acc: Record<string, number>, part: Intl.DateTimeFormatPart) => {
					if (part.type === "year") acc.year = Number(part.value);
					if (part.type === "month") acc.month = Number(part.value);
					if (part.type === "day") acc.day = Number(part.value);
					if (part.type === "hour") acc.hour = Number(part.value);
					if (part.type === "minute") acc.minute = Number(part.value);
					if (part.type === "second") acc.second = Number(part.value);
					return acc;
				}, {} as Record<string, number>);

			// Build a UTC timestamp as if that wall-clock time were UTC
			const tzWallClockUtcMs = Date.UTC(
				parts.year ?? now.getUTCFullYear(),
				(parts.month ?? now.getUTCMonth() + 1) - 1,
				parts.day ?? now.getUTCDate(),
				parts.hour ?? now.getUTCHours(),
				parts.minute ?? now.getUTCMinutes(),
				parts.second ?? now.getUTCSeconds()
			);

			// Offset in minutes ahead of UTC
			return Math.round((tzWallClockUtcMs - now.getTime()) / 60000);
		};

		// Get machine and preferred offsets
		const machineOffset = -now.getTimezoneOffset(); // minutes ahead of UTC
		const preferredOffset = getOffsetForZone(preferredTZ);

		// Compare
		return machineOffset === preferredOffset;
	} catch (err) {
		console.warn("isMachineTimeSameAsPreferred: error", err);
		return false;
	}
}
