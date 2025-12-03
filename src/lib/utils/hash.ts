import CryptoJS from "crypto-js";

export async function hashSHA256(data: string): Promise<string> {
	// Check if Web Crypto API is available
	if (typeof crypto !== "undefined" && crypto.subtle && crypto.subtle.digest) {
		const encoder = new TextEncoder();
		const buffer = encoder.encode(data);
		const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

		return Array.from(new Uint8Array(hashBuffer))
			.map((x) => x.toString(16).padStart(2, "0"))
			.join("");
	} else {
		// Fallback to CryptoJS
		return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
	}
}
