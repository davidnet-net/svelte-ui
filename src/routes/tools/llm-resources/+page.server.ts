import manifest from "$lib/internal/manifests/downloads-manifest.json";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const mapFiles = (files: Record<string, number> = {}) =>
		Object.entries(files).map(([name, size]) => ({
			name,
			size
		}));

	return {
		externalContextFiles: mapFiles(manifest.externalContext),
		internalContextFiles: mapFiles(manifest.internalContext),
		instructionFiles: mapFiles(manifest.instructions)
	};
};
