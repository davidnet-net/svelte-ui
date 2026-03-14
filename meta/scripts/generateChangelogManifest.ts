import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const CONFIG = {
	outputFile: "src/lib/internal/manifests/changelog-manifest.json",
	maxCommits: "11"
} as const;

/**
 * Represents a single commit entry in the changelog.
 */
interface CommitEntry {
	h: string; // Hash
	s: string; // Subject
	d: string; // Date
}

type ChangelogManifest = Record<string, CommitEntry[]>;

/**
 * Fetches all files tracked by git to respect .gitignore naturally using Bun.spawnSync
 * @returns Array of tracked file paths.
 */
const getTrackedFiles = (): string[] => {
	try {
		const proc = Bun.spawnSync(["git", "ls-files"], { stdout: "pipe" });
		if (!proc.success) return [];

		return proc.stdout
			.toString()
			.trim()
			.split("\n")
			.filter(
				(file: string) =>
					!file.includes("package-lock.json") &&
					!file.includes("node_modules") &&
					(file.endsWith(".svelte") || file.endsWith(".ts") || file.endsWith(".js"))
			);
	} catch (e) {
		console.error("Failed to get tracked files.", e);
		return [];
	}
};

/**
 * Main execution: Uses a single-line format to ensure valid JSON parsing,
 * optimized with Bun native APIs and timing.
 */
const run = async (): Promise<void> => {
	const start = performance.now();
	const files = getTrackedFiles();
	const manifest: ChangelogManifest = {};

	console.log(`🚀 Generating changelog for ${files.length} tracked files...`);

	for (const file of files) {
		try {
			const proc = Bun.spawnSync(
				["git", "log", "-n", CONFIG.maxCommits, "--pretty=format:%H||%s||%aI", "--", file],
				{ stdout: "pipe" }
			);

			if (proc.success && proc.stdout.length > 0) {
				const output = proc.stdout.toString().trim();

				manifest[file] = output
					.split("\n")
					.filter((line: string) => line.trim() !== "")
					.map((line: string): CommitEntry => {
						const [h, s, d] = line.split("||");
						return { h, s, d };
					});
			}
		} catch {
			// Skip files with no history
		}
	}

	const outputDir = path.dirname(CONFIG.outputFile);
	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}

	await Bun.write(CONFIG.outputFile, JSON.stringify(manifest));

	const duration = (performance.now() - start).toFixed(2);
	console.log(`✅ Changelog manifest created in ${duration}ms`);
};

await run();
