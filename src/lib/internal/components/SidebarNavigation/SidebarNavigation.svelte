<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import Button from "$lib/components/input/Button/Button.svelte";
	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte.ts";
	import { focusTrap } from "$lib/engines/focusEngine.svelte.ts";
	import { shortcutTrap, useShortcut } from "$lib/engines/shortcutEngine.svelte.ts";
	import { navigationData, type NavigationItem } from "$lib/internal/navigationData.svelte.ts";
	import { m } from "$lib/paraglide/messages.js";
	import { token } from "$lib/styles/designTokens.ts";

	import { styles } from "./SidebarNavigation.css.ts";

	let expandedItems = $state<string[]>([]);

	/**
	 * Toggles the expanded/collapsed state of a navigation item
	 * @param href The navigation target URL serving as the unique identifier
	 */
	function toggleExpand(href: string) {
		if (expandedItems.includes(href)) {
			expandedItems = expandedItems.filter((h) => h !== href);
		} else {
			expandedItems = [...expandedItems, href];
		}
	}

	/**
	 * Handles the click on the main navigation button, expanding its children
	 * and navigating to the specified URL.
	 * @param item The navigation item triggered
	 */
	async function handleItemClick(item: NavigationItem) {
		if (item.children) {
			toggleExpand(item.href);
		}

		// eslint-disable-next-line svelte/no-navigation-without-resolve
		await goto(item.href, { invalidateAll: true });
	}

	useShortcut(
		"escape",
		() => {
			appState.sidebarOpen = false;
		},
		{
			name: "Close sidebar",
			description: "Closes the sidebar navigation on tiny screens",
			preventDefault: true,
			active: () => appState.isMobile
		}
	);
	useShortcut("ctrl+[", () => (appState.sidebarOpen = !appState.sidebarOpen), {
		name: "Toggle sidebar",
		description: "Closes or opens the sidebar.",
		preventDefault: true
	});
</script>

{#snippet navTree(items: NavigationItem[], depth: number)}
	{#each items as item (item.pageName)}
		{@const hasChildren = !!item.children?.length}
		{@const isExpanded = expandedItems.includes(item.href)}
		{@const isActive = page.url.pathname === item.href}

		<div
			class={styles.navItemWrapper}
			style="padding-left: {depth * 1}rem; padding-top: {token.global.spacing.small}">
			{#if hasChildren}
				<IconButton
					tip={isExpanded ? m.docs_sidebar_collapse() : m.docs_sidebar_expand()}
					icon={isExpanded ? "keyboard_arrow_down" : "keyboard_arrow_right"}
					onclick={(e) => {
						e.stopPropagation();
						toggleExpand(item.href);
					}}></IconButton>
			{/if}

			<Button
				type="button"
				stretchwidth
				alignContent="left"
				appearance={isActive ? "primary" : "subtle"}
				onclick={() => handleItemClick(item)}>
				{item.pageName}
			</Button>
		</div>

		{#if hasChildren && isExpanded}
			{@render navTree(item.children!, depth + 1)}
		{/if}
	{/each}
{/snippet}

<aside
	class={styles.baseSidebarNavigation[appState.isMobile ? "mobile" : "desktop"]}
	use:focusTrap={appState.isMobile}
	use:shortcutTrap={appState.isMobile}>
	<div class={styles.navigation}>
		<LinkButton
			opennewtab
			appearance="subtle"
			stretchwidth
			href="https://home.davidnet.net"
			alignContent="left">
			Davidnet Home
		</LinkButton>
		{@render navTree(navigationData, 0)}
	</div>
	{#if appState.isMobile}
		<div class={styles.bottom}>
			<Button
				iconbefore="close"
				stretchwidth
				alignContent="center"
				onclick={() => {
					appState.sidebarOpen = !appState.sidebarOpen;
				}}>
				{m.docs_sidebar_close()}
			</Button>
		</div>
	{/if}
</aside>
