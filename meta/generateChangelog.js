import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

/**
 * TSDoc: Configuration for the Changelog Generator
 */
const CONFIG = {
	outputFile: "src/lib/changelog-manifest.json",
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
			// We use a single line with specific delimiters to make parsing bulletproof
			// %H: Full Hash, %s: Subject, %aI: ISO Date
			const logCommand = `git log -n ${CONFIG.maxCommits} --pretty=format:'{"h":"%H","s":"%s","d":"%aI"}' -- "${file}"`;
			const output = execSync(logCommand).toString().trim();

			if (output) {
				// Split by newline and parse each line as an individual JSON object
				manifest[file] = output
					.split("\n")
					.filter((line) => line.trim() !== "")
					.map((line) => {
						try {
							return JSON.parse(line);
						} catch (e) {
							console.warn(`⚠️ Failed to parse log line for ${file}: ${line}`, e);
							// Handle cases where commit messages have unescaped quotes
							return { h: "", s: "", d: "" };
						}
					});
			}
		} catch (err) {
			console.log(err);
			// Skip files with no history (e.g., untracked new files)
		}
	}

	writeFileSync(CONFIG.outputFile, JSON.stringify(manifest));
	console.log(`✅ Manifest created at ${CONFIG.outputFile}`);
};

run();
