import { existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

const BASE_DIR = "static/downloads";
const resultDIR = "src/lib/internal/manifests";

/**
 * Structure of the final download manifest.
 */
interface DownloadManifest {
	externalContext: Record<string, number>;
	internalContext: Record<string, number>;
	instructions: Record<string, number>;
}

/**
 * Scans a directory and maps filenames to their file size using Bun's native file API.
 * @param subDir - The subdirectory to scan within BASE_DIR.
 * @returns Dictionary mapping filenames to file size in bytes.
 */
const scanDir = (subDir: string): Record<string, number> => {
	const fullPath = path.join(process.cwd(), BASE_DIR, subDir);
	if (!existsSync(fullPath)) return {};

	return readdirSync(fullPath).reduce((acc: Record<string, number>, name: string) => {
		const file = Bun.file(path.join(fullPath, name));
		acc[name] = file.size;
		return acc;
	}, {});
};

/**
 * Main execution function with timing.
 */
const run = async (): Promise<void> => {
	const start = performance.now();

	const manifest: DownloadManifest = {
		externalContext: scanDir("llm-external-context"),
		internalContext: scanDir("llm-internal-context"),
		instructions: scanDir("llm-custom-instructions")
	};

	const targetDir = path.join(process.cwd(), resultDIR);
	if (!existsSync(targetDir)) {
		mkdirSync(targetDir, { recursive: true });
	}

	const targetFile = path.join(targetDir, "downloads-manifest.json");
	await Bun.write(targetFile, JSON.stringify(manifest, null, 2));

	const duration = (performance.now() - start).toFixed(2);
	console.log(`✅ Downloads manifest generated in ${duration}ms`);
};

await run();
