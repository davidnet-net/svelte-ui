import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Scenario {
	id: string;
	theme: string;
	name: string;
	props: Record<string, unknown>;
	appState: Record<string, unknown>;
	action?: "hover" | "pressed";
}

// Load scenarios dynamically from e2e/scenarios
const scenariosDir = path.join(__dirname, "scenarios");
const testSuite: Scenario[] = [];

if (fs.existsSync(scenariosDir)) {
	const files = fs.readdirSync(scenariosDir);
	for (const file of files) {
		if (file.endsWith(".json") && !file.endsWith(".schema.json")) {
			const filePath = path.join(scenariosDir, file);
			try {
				const content = fs.readFileSync(filePath, "utf-8");
				const data = JSON.parse(content) as { scenarios?: Scenario[] } | null;
				if (data && Array.isArray(data.scenarios)) {
					testSuite.push(...data.scenarios);
				} else {
					console.warn(`Warning: Scenario file ${file} does not contain a scenarios array.`);
				}
			} catch (error) {
				console.error(`Error reading/parsing scenario file ${file}:`, error);
			}
		}
	}
} else {
	console.error(`Scenarios directory not found at: ${scenariosDir}`);
}

test.describe("Visual Regression Testing (Simulation)", () => {
	for (const scenario of testSuite) {
		test(`Component: ${scenario.id} | Scenario: ${scenario.name}`, async ({ page }) => {
			// Construct the runner query parameters
			const queryParams = new URLSearchParams({
				id: scenario.id,
				theme: scenario.theme,
				isMobile: "false",
				appState: JSON.stringify(scenario.appState),
				props: JSON.stringify(scenario.props)
			});

			const runnerUrl = `/tools/simulation/runner?${queryParams.toString()}`;

			// Navigate to the runner URL (using Playwright's config baseURL)
			console.debug(`[Visual Regression]: Navigating to ${runnerUrl}`);
			await page.goto(runnerUrl);

			// Wait for the application to be fully mounted and any initial loading indicators to disappear.
			// The runner rendering is complete when the "Ready to simulate" banner is absent or the component mounts.
			// Let's wait for network activity to settle.
			await page.waitForLoadState("networkidle");

			// We can target the component container or take a snapshot of the full viewport/page.
			// Capturing the full page (which contains the component perfectly centered on its themed background)
			// gives us a complete view of how it fits, how fonts render, and the layout.
			// Alternatively, you can target the first child element of the centering Flex wrapper (the component itself).
			const component = page.locator("main button");

			// We wait for the component to be visible
			await expect(component).toBeVisible();

			if (scenario.action === "hover") {
				await component.hover();
			} else if (scenario.action === "pressed") {
				await component.hover();
				await page.mouse.down();
			}

			// Take screenshot and compare with baseline
			// Playwright automatically handles comparing the screenshot to a baseline image matching the browser profile
			await expect(page).toHaveScreenshot(`${scenario.name}.png`, {
				maxDiffPixelRatio: 0.01 // allow 1% pixel diff due to minor rendering fluctuations (anti-aliasing, etc.)
			});
		});
	}
});
