import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { execSync } from "child_process";
import { defineConfig } from "vite";

import pkg from "./package.json" with { type: "json" };

const pkgVersion = pkg.version;
const rawRepoUrl = typeof pkg.repository === "string" ? pkg.repository : pkg.repository.url;

const repoUrl = rawRepoUrl.replace(/^git\+/, "").replace(/\.git$/, "");

const commitHash = execSync("git rev-parse HEAD").toString().trim();
const commitUrl = `${repoUrl}/commit/${commitHash}`;

export default defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/paraglide",
			emitTsDeclarations: true,
			strategy: ["localStorage", "preferredLanguage", "baseLocale"],
			localStorageKey: "language"
		}),
		sveltekit(),
		vanillaExtractPlugin()
	],
	define: {
		__DDS_INFO__: {
			version: JSON.stringify(pkgVersion), // Added version
			commitHash: JSON.stringify(commitHash),
			commitUrl: JSON.stringify(commitUrl),
			buildTime: JSON.stringify(new Date().toISOString())
		}
	}
});
