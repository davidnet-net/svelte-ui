<script lang="ts">
	import { onMount } from "svelte";

	import Banner from "$lib/components/messaging/Banner/Banner.svelte";
	import Link from "$lib/components/navigation/Link/Link.svelte";
	import AppShell from "$lib/components/primitives/AppShell/AppShell.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import { fontState, setTheme, type themeNames } from "$lib/engines/themeEngine.svelte";
	import * as m from "$lib/paraglide/messages.js";

	let { children } = $props();
	let hasRenderedAtleastOnce = $state(false);

	function initializeFromQueryParams() {
		const urlParams = new URLSearchParams(window.location.search);

		const queryTheme = urlParams.get("theme");
		const queryMobile = urlParams.get("isMobile");
		const queryId = urlParams.get("id");
		const queryHideNav = urlParams.get("hideNavigation");
		const queryAppStateRaw = urlParams.get("appState");

		if (queryTheme) {
			setTheme(queryTheme as themeNames);
			fontState.iconFontsLoaded = true;
			fontState.interFontLoaded = true;
			fontState.momoTrustDisplayFontLoaded = true;
		}

		appState.hideNavigation = queryHideNav !== "false";

		if (queryMobile !== null) {
			appState.isMobile = queryMobile === "true";
		}

		if (queryAppStateRaw) {
			try {
				const parsedAppStateMutations = JSON.parse(decodeURIComponent(queryAppStateRaw));
				Object.assign(appState, parsedAppStateMutations);
			} catch (err) {
				console.error(
					"[Simulation Layout] Failed to parse query parameter appState object context:",
					err
				);
			}
		}

		if (queryId) {
			hasRenderedAtleastOnce = true;
		}
	}

	const isIframe = typeof window !== "undefined" && window.parent !== window;

	onMount(() => {
		const handleMessage = (event: MessageEvent) => {
			const { type, payload } = event.data;

			console.debug("[Simulation Layout] Received message:", type, payload);

			switch (type) {
				case "SIMULATION_SET_THEME":
					setTheme(payload as themeNames);
					fontState.iconFontsLoaded = true;
					fontState.interFontLoaded = true;
					fontState.momoTrustDisplayFontLoaded = true;
					break;

				case "SIMULATION_MUTATE_APP_STATE":
					Object.assign(appState, payload);
					break;

				case "RENDER_AUTOMATED_PREVIEW":
					hasRenderedAtleastOnce = true;
					break;

				default:
					console.warn("[Simulation Layout] Ignored unhandled message type:", type);
			}
		};

		window.addEventListener("message", handleMessage);

		if (isIframe) {
			window.parent.postMessage({ type: "SIMULATION_READY" }, window.location.origin);
		} else {
			console.debug(
				"[Simulation Layout] Standalone execution context detected. Parsing query parameters..."
			);
			initializeFromQueryParams();
		}

		console.log("[Simulation Layout] Simulation runner is ready and listening for messages.");
		return () => window.removeEventListener("message", handleMessage);
	});
</script>

<AppShell appName="Simulation" shortAppName="SIM" paraglideRuntime={null} disableInit>
	{#snippet banners()}
		{#if !isIframe}
			<Banner appearance="warning" iconVariant="outlined" icon="computer">
				{m.docs_page_simulation_runner_sandbox_warning()}<Link opennewtab href="/tools/simulation">
					{m.docs_page_simulation_runner_learn_more()}
				</Link>
			</Banner>{/if}

		{#if !hasRenderedAtleastOnce}
			<Banner appearance="discover" icon="all_match">
				{m.docs_page_simulation_runner_ready()}
			</Banner>
		{/if}
	{/snippet}

	{@render children()}
</AppShell>
