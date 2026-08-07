import { PUBLIC_ACCOUNT_FRONTEND_URL, PUBLIC_BACKEND_URL } from "$env/static/public";
import { isValidUrl } from "$lib/utils/networking";

async function checkDDSEnvironmentVariables() {
	if (!isValidUrl(PUBLIC_BACKEND_URL)) {
		throw new Error(`Invalid PUBLIC_BACKEND_URL: ${PUBLIC_BACKEND_URL}.`);
	}
	if (!isValidUrl(PUBLIC_ACCOUNT_FRONTEND_URL)) {
		throw new Error(`Invalid PUBLIC_ACCOUNT_FRONTEND_URL: ${PUBLIC_ACCOUNT_FRONTEND_URL}.`);
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
