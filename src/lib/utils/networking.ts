/**
 * Validates if a string is a properly formatted absolute URL.
 * * @param {string} urlString - The string to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidUrl = (urlString: string): boolean => {
	try {
		new URL(urlString);
		return true;
	} catch {
		return false;
	}
};
