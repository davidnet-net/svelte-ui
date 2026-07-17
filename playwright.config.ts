import { defineConfig } from "@playwright/test";

export default defineConfig({
	webServer: {
		command: "bun run build && bun run preview",
		port: 4173,
		reuseExistingServer: !process.env.CI
	},
	use: {
		baseURL: "http://localhost:4173",
		screenshot: "only-on-failure"
	},
	testDir: "e2e"
});
