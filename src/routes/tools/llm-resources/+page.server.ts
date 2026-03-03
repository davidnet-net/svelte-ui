import fs from "node:fs";
import path from "node:path";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const manifestPath = path.resolve("static/downloads/manifest.json");

	if (!fs.existsSync(manifestPath)) {
		return { contextFiles: [], instructionFiles: [] };
	}

	const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

	const mapFiles = (files: Record<string, number>) =>
		Object.entries(files).map(([name, size]) => ({
			name,
			size
		}));

	return {
		contextFiles: mapFiles(manifest.context),
		instructionFiles: mapFiles(manifest.instructions)
	};
};
