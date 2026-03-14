import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { playwright } from "@vitest/browser-playwright";
import { execSync } from "child_process";
import path from "path";
import { defineConfig } from "vitest/config";

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

	esbuild: {
		drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : []
	},

	resolve: {
		alias: {
			$lib: path.resolve("./src/lib")
		}
	},

	define: {
		__DDS_INFO__: {
			version: JSON.stringify(pkgVersion),
			commitHash: JSON.stringify(commitHash),
			commitUrl: JSON.stringify(commitUrl),
			buildTime: JSON.stringify(new Date().toISOString())
		}
	},

	test: {
		expect: { requireAssertions: true },

		projects: [
			{
				extends: "./vite.config.ts",

				test: {
					name: "client",

					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: "chromium", headless: true }]
					},

					include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
					exclude: ["src/lib/server/**"]
				}
			},

			{
				extends: "./vite.config.ts",

				test: {
					name: "server",
					environment: "node",
					include: ["src/**/*.{test,spec}.{js,ts}"],
					exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"]
				}
			}
		]
	}
});
