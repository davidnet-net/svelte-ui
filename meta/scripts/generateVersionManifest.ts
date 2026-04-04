import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

interface VersionManifest {
	version: string;
	commitHash: string;
	commitUrl: string;
	buildTime: string;
}

const CONFIG = {
	repoBaseUrl: "https://github.com/davidnet-net/svelte-ui/commit",
	outputFile: "./src/lib/internal/manifests/version-manifest.json",
	packageJsonPath: "./package.json"
} as const;

const getGitInfo = (args: string[]): string => {
	try {
		const { stdout } = Bun.spawnSync(["git", ...args]);
		return stdout.toString().trim();
	} catch {
		return "unknown";
	}
};

const run = async (): Promise<void> => {
	const start = performance.now();

	try {
		// 1. Get version from package.json
		const pkgFile = Bun.file(CONFIG.packageJsonPath);
		const pkg = await pkgFile.json();
		const version = pkg.version || "0.0.0";

		// 2. Get Git metadata
		const commitHash = getGitInfo(["rev-parse", "HEAD"]);
		const shortHash = getGitInfo(["rev-parse", "--short", "HEAD"]);
		const commitUrl = `${CONFIG.repoBaseUrl}/${commitHash}`;

		// 3. Build the manifest object
		const manifest: VersionManifest = {
			version,
			commitHash: shortHash,
			commitUrl,
			buildTime: new Date().toISOString()
		};

		// 4. Ensure directory exists and write file
		const outputDir = resolve(CONFIG.outputFile, "..");
		if (!existsSync(outputDir)) {
			mkdirSync(outputDir, { recursive: true });
		}

		await Bun.write(CONFIG.outputFile, JSON.stringify(manifest, null, 2));

		const duration = (performance.now() - start).toFixed(2);
		console.log(`✅ Version manifest generated in ${duration}ms (${version}@${shortHash})`);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		console.error("❌ Error generating version manifest:", errorMessage);
		process.exit(1);
	}
};

await run();
