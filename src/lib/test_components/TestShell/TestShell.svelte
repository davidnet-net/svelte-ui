<script lang="ts">
	import "$lib/styles/global.css.ts";

	import { onMount, type Snippet } from "svelte";

	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte.ts";
	import { currentTheme, setTheme } from "$lib/engines/themeEngine.svelte.ts";

	import { styles } from "./TestShell.css.ts";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		console.groupCollapsed("Davidnet Design System - information");
		console.log("version: " + __DDS_INFO__.version);
		console.log("commitUrl: " + __DDS_INFO__.commitUrl);
		console.log("commitHash: " + __DDS_INFO__.commitHash);
		console.log("buildTime: " + __DDS_INFO__.buildTime);
		console.groupEnd();

		console.debug("[AppShell] Configuring theme engine.");
		setTheme("dark");

		// Is mobile
		const mediaQuery = window.matchMedia("(max-width: 768px)");
		appState.isMobile = mediaQuery.matches;

		const handler = (e: MediaQueryListEvent) => {
			appState.isMobile = e.matches;
		};
		mediaQuery.addEventListener("change", handler);

		return () => {
			mediaQuery.removeEventListener("change", handler);
		};
	});

	console.log("TestShell Mounted");
</script>

<div class="appshell {currentTheme.themeObject} {styles.base}" id="appshell">
	<div class={styles.container}>
		<div class={styles.maincontainer}>
			<Flex height="100%" width="100%" direction="column">
				<div class={styles.contentRow}>
					<div class={styles.mainScrollArea}>
						<main class={styles.childrenWrapper}>
							{@render children()}
						</main>
					</div>
				</div>
			</Flex>
		</div>
	</div>

	<noscript>
		<div class={styles.noscriptoverlay}>
			<Flex direction="column" alignItems="center" justifyContent="center" gap="medium">
				<div style="text-align: center;">
					<h1>Javascript is disabled</h1>
					<p>Please enable javascript to use Davidnet.</p>
				</div>
			</Flex>
		</div>
	</noscript>
</div>
