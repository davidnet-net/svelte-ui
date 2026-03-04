import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * TSDoc: Configuration for the Changelog Generator
 */
const CONFIG = {
	outputFile: "src/lib/internal/manifests/changelog-manifest.json",
	maxCommits: 11
};

/**
 * Fetches all files tracked by git to respect .gitignore naturally
 */
const getTrackedFiles = () => {
	try {
		return (
			execSync("git ls-files")
				.toString()
				.trim()
				.split("\n")
				// Filter out non-source files to keep the manifest lean
				.filter(
					(file) =>
						!file.includes("package-lock.json") &&
						!file.includes("node_modules") &&
						(file.endsWith(".svelte") || file.endsWith(".ts") || file.endsWith(".js"))
				)
		);
	} catch (e) {
		console.error("Failed to get tracked files.", e);
		return [];
	}
};

/**
 * Main execution: Uses a single-line format to ensure valid JSON parsing
 */
const run = () => {
	const files = getTrackedFiles();
	const manifest = {};

	console.log(`🚀 Generating changelog for ${files.length} tracked files...`);

	for (const file of files) {
		try {
			const logCommand = `git log -n ${CONFIG.maxCommits} --pretty=format:'%H||%s||%aI' -- "${file}"`;
			const output = execSync(logCommand).toString().trim();

			if (output) {
				manifest[file] = output
					.split("\n")
					.filter((line) => line.trim() !== "")
					.map((line) => {
						const [h, s, d] = line.split("||");
						return { h, s, d }; // JavaScript handles the string encoding safely here
					});
			}
		} catch (err) {
			console.log(err);
			// Skip files with no history (e.g., untracked new files)
		}
	}

	if (existsSync(CONFIG.outputFile)) {
		mkdirSync(path.dirname(CONFIG.outputFile), { recursive: true });
	}

	writeFileSync(CONFIG.outputFile, JSON.stringify(manifest));
	console.log(`✅ Manifest created at ${CONFIG.outputFile}`);
};

run();
