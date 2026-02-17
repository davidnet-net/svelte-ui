export type UUIDv7Type = string;

/**
 * Generates a RFC 9562 compliant UUIDv7.
 * Layout: [48 bits timestamp] [4 bits version] [12 bits random] [2 bits variant] [62 bits random]
 */
export function generateUUIDv7(): UUIDv7Type {
	const bytes = new Uint8Array(16);
	crypto.getRandomValues(bytes);

	const timestamp = Date.now();

	// Timestamp (48 bits) - Indices 0 to 5
	bytes[0] = (timestamp / 0x10000000000) & 0xff;
	bytes[1] = (timestamp / 0x100000000) & 0xff;
	bytes[2] = (timestamp / 0x1000000) & 0xff;
	bytes[3] = (timestamp / 0x10000) & 0xff;
	bytes[4] = (timestamp / 0x100) & 0xff;
	bytes[5] = timestamp & 0xff;

	// Version 7 (0111) - Index 6
	// We clear the high 4 bits and set them to 7 (0111)
	bytes[6] = (bytes[6] & 0x0f) | 0x70;

	// Variant 10 (10xx xxxx) - Index 8
	// We clear the high 2 bits and set them to 2 (10)
	bytes[8] = (bytes[8] & 0x3f) | 0x80;

	// Correct UUID dash formatting: 8-4-4-4-12
	return Array.from(bytes)
		.map((b, i) => {
			const hex = b.toString(16).padStart(2, "0");
			if (i === 4 || i === 6 || i === 8 || i === 10) return "-" + hex;
			return hex;
		})
		.join("");
}
