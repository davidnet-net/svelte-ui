import fs from "node:fs";
import path from "node:path";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const manifestPath = path.resolve("static/downloads/manifest.json");

	if (!fs.existsSync(manifestPath)) {
		return { externalContextFiles: [], internalContextFiles: [], instructionFiles: [] };
	}

	const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

	const mapFiles = (files: Record<string, number>) =>
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
