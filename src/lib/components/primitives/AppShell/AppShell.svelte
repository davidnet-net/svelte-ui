<script lang="ts">
	import "$lib/styles/global.css";

	import { onMount, type Snippet } from "svelte";

	import interUrl from "$lib/assets/fonts/Inter-4.1/InterVariable.woff2";
	import momoTrustDisplayUrl from "$lib/assets/fonts/Momo_Trust_Display/MomoTrustDisplay-Regular.woff2";
	import DNLogo from "$lib/assets/images/DNLogo.png";
	import Dropdown from "$lib/components/input/Dropdown/Dropdown.svelte";
	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import IconLinkButton from "$lib/components/input/IconLinkButton/IconLinkButton.svelte";
	import AccountMenu from "$lib/components/lib_internal/AccountMenu/AccountMenu.svelte";
	import SettingsModal from "$lib/components/lib_internal/SettingsModal/SettingsModal.svelte";
	import Banner from "$lib/components/messaging/Banner/Banner.svelte";
	import Toaster from "$lib/components/messaging/Toaster/Toaster.svelte";
	import Blanket from "$lib/components/overlays/Blanket/Blanket.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import { authState } from "$lib/engines/identityEngine.svelte";
	import { init } from "$lib/engines/initEngine.svelte";
	import { useShortcut } from "$lib/engines/shortcutEngine.svelte";
	import { currentTheme } from "$lib/engines/themeEngine.svelte";
	import { m as library_messages } from "$lib/paraglide/messages.js";
	import { token } from "$lib/styles/designTokens";
	import { focusring } from "$lib/styles/global.css";

	import Anchor from "../Anchor/Anchor.svelte";
	import Avatar from "../Avatar/Avatar.svelte";
	import Flex from "../Flex/Flex.svelte";
	import { styles } from "./AppShell.css";

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
		 * @remarks Make sure to import * as paraglideRuntime from "$lib/paraglide/runtime.js"
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

	interface toggleSidebar {
		readonly keys: string[];
		readonly original: string;
	}
	let toggleSidebar: toggleSidebar | undefined;

	$effect(() => {
		if (sidebar) {
			useShortcut("ctrl+[", () => (appState.sidebarOpen = !appState.sidebarOpen), {
				name: library_messages.lib_component_appshell_shortcuts_toggle_sidebar_name(),
				description: library_messages.lib_component_appshell_shortcuts_toggle_sidebar_description(),
				preventDefault: true
			});
		}
	});

	let isAvatarOpened = $state(false);
	let isQuickSettingsOpened = $state(false);
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
					<b>{library_messages.lib_banners_connection_lost_title()}</b>
					{library_messages.lib_banners_connection_lost_content()}
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
									tip={library_messages.lib_component_appshell_close_sidebar_alt()}
									appearance="subtle"
									keyboardTip={toggleSidebar?.keys}
									iconstyle="filled"
									onclick={() => {
										appState.sidebarOpen = !appState.sidebarOpen;
									}} />
							{:else if sidebar}
								<IconButton
									icon="left_panel_open"
									tip={library_messages.lib_component_appshell_open_sidebar_alt()}
									appearance="subtle"
									keyboardTip={toggleSidebar?.keys}
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
							<Anchor href="/" class={focusring}>
								{#if appState.isMobile}
									{shortAppName}
								{:else}
									{appName}
								{/if}
							</Anchor>
						</div>
						<div class={styles.navCenter}>
							{#if !appState.isMobile}
								<Anchor href="https://davidnet.net" class={focusring}>
									{#if import.meta.env.DEV}
										<span
											style="color: {token.theme.color.text
												.warning}; vertical-align: middle; display: flex; align-items: center; gap: {token
												.global.spacing.xsmall}">
											Davidnet Development Build
										</span>
									{:else}
										Davidnet
									{/if}
								</Anchor>
							{/if}
						</div>
						<div class={styles.navRight}>
							<IconButton
								icon="settings"
								tip={library_messages.lib_component_appshell_settings_alt()}
								onclick={() => {
									isQuickSettingsOpened = true;
								}} />
							<IconButton
								onclick={() => {
									console.debug("Notification btn pressed");
								}}
								icon="notifications"
								tip="Notifications" />
							<Dropdown bind:isOpen={isAvatarOpened} offset={20}>
								{#snippet trigger()}
									<Avatar
										src="https://auth.davidnet.net/profile-picture/1_5865b2b5-45fe-4d44-bfed-23d24fa7ca76.jpg?v=1765968725080"
										size="xlarge"
										alt={library_messages.lib_component_account_menu_alt()}
										onclick={() => {
											isAvatarOpened = !isAvatarOpened;
										}}
										loading={authState.loading} />
								{/snippet}
								<AccountMenu
									isAvatarLoading={authState.loading}
									username="USERNAME"
									email="example@example.org"
									profilePictureURL="https://auth.davidnet.net/profile-picture/1_5865b2b5-45fe-4d44-bfed-23d24fa7ca76.jpg?v=1765968725080" />
							</Dropdown>
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
	{#if isQuickSettingsOpened}
		<SettingsModal onClose={() => (isQuickSettingsOpened = false)} />
	{/if}
</div>
