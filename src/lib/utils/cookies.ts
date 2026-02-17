const COOKIE_DOMAIN = import.meta.env.DEV ? "localhost" : ".davidnet.net";

/**
 * @param name - The name of the cookie to set.
 * @param value - The value to store in the cookie.
 * @param days - Optional number of days until the cookie expires.
 */
export function setCookie(name: string, value: string, days?: number): void {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}

	// Setting the domain to .davidnet.net allows subdomains to read/write this cookie
	document.cookie = `${name}=${value || ""}${expires}; path=/; domain=${COOKIE_DOMAIN}; SameSite=Lax`;
}

/**
 * @param name - The name of the cookie to retrieve.
 * @returns The cookie value or null if not found.
 */
export function getCookie(name: string): string | null {
	const nameEQ = name + "=";
	const cookieParts = document.cookie.split(";");

	for (let i = 0; i < cookieParts.length; i++) {
		let part = cookieParts[i];
		while (part.charAt(0) === " ") part = part.substring(1, part.length);
		if (part.indexOf(nameEQ) === 0) return part.substring(nameEQ.length, part.length);
	}
	return null;
}

/**
 * @param name - The name of the cookie to remove.
 */
export function deleteCookie(name: string): void {
	document.cookie = `${name}=; path=/; domain=${COOKIE_DOMAIN}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
