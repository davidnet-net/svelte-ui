import fs from "node:fs";
import path from "node:path";

import type { PageServerLoad } from "./$types";

interface FileMetadata {
	name: string;
	size: number;
}

export const load: PageServerLoad = async () => {
	async function getFiles(dir: string): Promise<FileMetadata[]> {
		const dirPath = path.join(process.cwd(), dir);

		if (!fs.existsSync(dirPath)) {
			return [];
		}

		const filenames = fs.readdirSync(dirPath);

		return filenames.map((name) => {
			const stats = fs.statSync(path.join(dirPath, name));
			return {
				name,
				size: stats.size
			};
		});
	}

	return {
		contextFiles: await getFiles("src/lib/internal/assets/downloads/llm-context"),
		instructionFiles: await getFiles("src/lib/internal/assets/downloads/llm-custom-instructions")
	};
};
