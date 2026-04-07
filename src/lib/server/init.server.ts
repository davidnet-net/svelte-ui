import { INTERNAL_SECRET } from "$env/static/private";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { isValidUrl } from "$lib/utils/networking";

async function checkDDSEnvironmentVariables() {
	if (!isValidUrl(PUBLIC_BACKEND_URL)) {
		throw new Error(`Invalid PUBLIC_BACKEND_URL: ${PUBLIC_BACKEND_URL}.`);
	}
	if (INTERNAL_SECRET.length !== 64) {
		throw new Error(
			`Invalid INTERNAL_SECRET: ${INTERNAL_SECRET}. Please ensure it is a 64-character RANDOM string.`
		);
	}
}

export async function initDDSServerMagic() {
	try {
		console.log("[DDS SERVER INIT]: Starting init.");
		await checkDDSEnvironmentVariables();
		console.log("[DDS SERVER INIT]: ENVCHECK [OK].");
		console.log("[DDS SERVER INIT]: Init finished.");
	} catch (error) {
		console.error("[DDS SERVER INIT]: Failed to initialize server: ", error);
		throw error;
	}
}
