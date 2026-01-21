<script lang="ts">
	import "$lib/styles/global.css.ts";

	import { onMount, type Snippet } from "svelte";

	import Button from "$lib/components/input/Button/Button.svelte";
	import IconLinkButton from "$lib/components/input/IconLinkButton/IconLinkButton.svelte";
	import { token } from "$lib/styles/designTokens.ts";

	import { currentTheme, setTheme } from "../../../engines/themeEngine.svelte.ts";
	import { createTranslationEngine } from "../../../engines/translationEngine.svelte.ts";
	import Anchor from "../Anchor/Anchor.svelte";
	import Flex from "../Flex/Flex.svelte";
	import { styles } from "./AppShell.css.ts";

	interface Props {
		children: Snippet;

		/** *
		 * @example
		 * ```svelte
		 * <AppShell>
		 * {#snippet banners()}
		 * <Banner>Alert!</Banner>
		 * {/snippet}
		 * </AppShell>
		 * ```
		 */
		banners?: Snippet;

		/**
		 * @remarks Make sure to add an <footer> element
		 */
		footer?: Snippet;

		/**
		 * @remarks Make sure to import * as paraglideRuntime from "../paraglide/runtime.js"
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		paraglideRuntime: any;
	}

	let { children, banners, footer, paraglideRuntime }: Props = $props();

	onMount(async () => {
		console.groupCollapsed("Davidnet Design System - information");
		console.log("version: " + __DDS_INFO__.version);
		console.log("commitUrl: " + __DDS_INFO__.commitUrl);
		console.log("commitHash: " + __DDS_INFO__.commitHash);
		console.log("buildTime: " + __DDS_INFO__.buildTime);
		console.groupEnd();

		// Some notes:
		// Read caches first of engines after rerun after auth completed???
		// Keep lastcommunicated value or smth that you dont refresh if newer then 10m

		try {
			console.debug("[AppShell] Configuring translationEngine.");
			createTranslationEngine(paraglideRuntime);
		} catch (err: unknown) {
			const error = err instanceof Error ? err : new Error(String(err));
			console.error("[AppShell] Could not configure translationEngine \n\n", error);
		}

		console.debug("[AppShell] Configuring theme engine.");
		setTheme("dark");
	});
</script>

<div class="appshell {currentTheme.themeObject} {styles.base}">
	<div class={styles.container}>
		<div class={styles.maincontainer}>
			{@render banners?.()}

			<Flex height="100%" width="100%" direction="column">
				<nav class={styles.nav}>
					<div class={styles.navLeft}>
						<IconLinkButton
							icon="apps"
							tip="Davidnet Home"
							href="https://home.davidnet.net"
							appearance="subtle" />
						<Anchor href="/">Davidnet Design System</Anchor>
					</div>
					<div class={styles.navCenter}>
						{#if import.meta.env.DEV}<span style="color: {token.theme.color.text.warning}">
								Davidnet Development Build
							</span>{:else}Davidnet{/if}
					</div>
					<div class={styles.navRight}>
						<Button onclick={() => setTheme("dark")}>Dark</Button>
						<Button onclick={() => setTheme("light")}>Light</Button>
					</div>
				</nav>
				<main style="overflow: auto; width: 100%; flex: 1;">
					{@render children()}
				</main>
			</Flex>
		</div>
		{@render footer?.()}
	</div>

	<noscript>
		<div class={styles.noscriptoverlay}>
			<Flex direction="column" alignItems="center" justifyContent="center" gap="medium">
				<div style="text-align: center;">
					<h1>Javascript is disabled</h1>
					<p>Please enable javascript to use Davidnet.</p>
				</div>
				<!--TODO Add LinkButton to help-->
			</Flex>
		</div>
	</noscript>
</div>
