<script lang="ts">
	import "$lib/styles/global.css.ts";

	import { onMount, type Snippet } from "svelte";

	import interUrl from "$lib/assets/fonts/Inter-4.1/InterVariable.woff2";
	import momoTrustDisplayUrl from "$lib/assets/fonts/Momo_Trust_Display/MomoTrustDisplay-Regular.woff2";
	import DNLogo from "$lib/assets/images/DNLogo.png";
	import Button from "$lib/components/input/Button/Button.svelte";
	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import IconLinkButton from "$lib/components/input/IconLinkButton/IconLinkButton.svelte";
	import Banner from "$lib/components/messaging/Banner/Banner.svelte";
	import Toaster from "$lib/components/messaging/Toaster/Toaster.svelte";
	import Blanket from "$lib/components/overlays/Blanket/Blanket.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte.ts";
	import { init } from "$lib/engines/initEngine.svelte.ts";
	import { useShortcut } from "$lib/engines/shortcutEngine.svelte.ts";
	import { currentTheme, setTheme } from "$lib/engines/themeEngine.svelte.ts";
	import { token } from "$lib/styles/designTokens.ts";

	import Anchor from "../Anchor/Anchor.svelte";
	import Flex from "../Flex/Flex.svelte";
	import Icon from "../Icon/Icon.svelte";
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

		sidebar?: Snippet;

		/**
		 * @remarks Make sure to add an <footer> element
		 * @remarks Also include an link to home.davidnet.net
		 */
		footer?: Snippet;

		appName: string;
		shortAppName: string;

		/**
		 * Not recommended to turn off
		 * @default true
		 */
		disableInit?: boolean;

		/**
		 * @remarks Make sure to import * as paraglideRuntime from "../paraglide/runtime.js"
		 * @remarks pass as null or undefined when using disableInit
		 *
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		paraglideRuntime: any;
	}

	let {
		children,
		banners,
		sidebar,
		footer,
		appName,
		shortAppName,
		disableInit = false,
		paraglideRuntime
	}: Props = $props();

	onMount(() => {
		if (!disableInit) {
			init(paraglideRuntime);
		}
	});

	const toggleSidebar = useShortcut(
		"ctrl+[",
		() => (appState.sidebarOpen = !appState.sidebarOpen),
		{
			name: "Toggle sidebar",
			description: "Closes or opens the sidebar.",
			preventDefault: true
		}
	);
</script>

<svelte:head>
	<link rel="icon" href={DNLogo} />
	<link
		rel="preload"
		href={momoTrustDisplayUrl}
		as="font"
		type="font/woff2"
		crossorigin="anonymous" />
	<link rel="preload" href={interUrl} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<div class="appshell {currentTheme.themeObject} {styles.base}" id="appshell">
	<div class={styles.container}>
		<div class={styles.maincontainer}>
			{#if import.meta.env.DEV && !appState.viteConnected}
				<Banner icon="sync_problem" appearance="danger">
					<b>Vite connection lost.</b>
					Hot Module Reloading will be unavailable until reconnected.
				</Banner>
			{/if}
			{#if appState.isOffline}
				<Banner icon="cloud_alert" appearance="danger">
					<b>Connection lost.</b>
					We have lost the connection with Davidnet. Please check your internet connection.
				</Banner>
			{/if}
			{@render banners?.()}

			<Flex height="100%" width="100%" direction="column">
				{#if !appState.hideNavigation}
					<nav class={styles.nav}>
						<div class={styles.navLeft}>
							{#if sidebar && appState.sidebarOpen}
								<IconButton
									icon="left_panel_close"
									tip="Close sidebar"
									appearance="subtle"
									keyboardTip={toggleSidebar.keys}
									iconstyle="filled"
									onclick={() => {
										appState.sidebarOpen = !appState.sidebarOpen;
									}} />
							{:else if sidebar}
								<IconButton
									icon="left_panel_open"
									tip="Open sidebar"
									appearance="subtle"
									keyboardTip={toggleSidebar.keys}
									iconstyle="outlined"
									onclick={() => {
										appState.sidebarOpen = !appState.sidebarOpen;
									}} />
							{:else}
								<IconLinkButton
									icon="apps"
									tip="Davidnet Home"
									href="https://home.davidnet.net"
									opennewtab
									appearance="subtle" />
							{/if}
							<Anchor href="/">
								{#if appState.isMobile}
									{shortAppName}
								{:else}
									{appName}
								{/if}
							</Anchor>
						</div>
						<div class={styles.navCenter}>
							{#if !appState.isMobile}
								<Anchor href="https://davidnet.net">
									{#if import.meta.env.DEV}
										<span
											style="color: {token.theme.color.text
												.warning}; vertical-align: middle; display: flex; align-items: center; gap: {token
												.global.spacing.xsmall}">
											<Icon icon="construction" />
											Davidnet Development Build
											<Icon icon="construction" />
										</span>
									{:else}
										Davidnet
									{/if}
								</Anchor>
							{/if}
						</div>
						<div class={styles.navRight}>
							<Button onclick={() => setTheme("dark")}>D - Temp</Button>
							<Button onclick={() => setTheme("light")}>L - Temp</Button>
						</div>
					</nav>
				{/if}
				<div class={styles.contentRow}>
					{#if appState.sidebarOpen && !appState.hideNavigation}
						{#if appState.isMobile}
							<Blanket centerContent={false} onclick={() => (appState.sidebarOpen = false)}>
								<div class={styles.sidebarWrapper}>
									{@render sidebar?.()}
								</div>
							</Blanket>
						{:else}
							<div class={styles.sidebarWrapper}>
								{@render sidebar?.()}
							</div>
						{/if}
					{/if}
					<div class={styles.mainScrollArea}>
						<main class={styles.childrenWrapper}>
							{@render children()}
						</main>
						{#if !appState.hideNavigation}
							<div class={styles.footerWrapper}>
								{@render footer?.()}
							</div>
						{/if}
					</div>
				</div>
			</Flex>
		</div>
	</div>
	<Toaster />
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
