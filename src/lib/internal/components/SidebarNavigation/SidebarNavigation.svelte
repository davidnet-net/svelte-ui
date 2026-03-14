<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import Button from "$lib/components/input/Button/Button.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import { navigationData, type NavigationItem } from "$lib/internal/navigationData.svelte.ts";
	import { token } from "$lib/styles/designTokens.ts";

	import { appState } from "../../../engines/appStateEngine.svelte.ts";
	import { focusTrap } from "../../../engines/focusEngine.svelte.ts";
	// Migrated: Import the new actions
	import { shortcutTrap, useShortcut } from "../../../engines/shortcutEngine.svelte.ts";
	import { styles } from "./SidebarNavigation.css.ts";

	let expandedItems = $state<string[]>([]);

	async function handleItemClick(item: NavigationItem) {
		if (item.children) {
			if (expandedItems.includes(item.href)) {
				expandedItems = expandedItems.filter((h) => h !== item.href);
			} else {
				expandedItems = [...expandedItems, item.href];
			}
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

		<div style="padding-left: {depth * 1}rem; padding-top: {token.global.spacing.small}">
			<Button
				type="button"
				stretchwidth
				alignContent="left"
				appearance={isActive ? "primary" : "subtle"}
				iconbefore={hasChildren
					? isExpanded
						? "keyboard_arrow_down"
						: "keyboard_arrow_right"
					: undefined}
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
				Close sidebar
			</Button>
		</div>
	{/if}
</aside>
