export async function hashSHA256(data: string) {
	const encoder = new TextEncoder();
	const buffer = encoder.encode(data);
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

	return Array.from(new Uint8Array(hashBuffer))
		.map((x) => x.toString(16).padStart(2, "0"))
		.join("");
}
