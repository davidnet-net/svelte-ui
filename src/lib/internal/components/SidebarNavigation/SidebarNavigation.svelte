<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import Button from "$lib/components/input/Button/Button.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import { token } from "$lib/styles/designTokens.ts";

	import { appState } from "../../../engines/appStateEngine.svelte.ts";
	import { useShortcut, useTrap } from "../../../engines/shortcutEngine.svelte.ts";
	import { styles } from "./SidebarNavigation.css.ts";

	interface NavigationItem {
		pageName: string;
		href: string;
		children?: NavigationItem[];
	}

	const navigationData: NavigationItem[] = [
		{
			pageName: "Davidnet Design System",
			href: "/"
		},
		{
			pageName: "Foundations",
			href: "/foundations",
			children: [
				{
					pageName: "Design tokens",
					href: "/foundations/design_tokens",
					children: [
						{
							pageName: "Design token libary",
							href: "/foundations/design_tokens/libary"
						}
					]
				}
			]
		}
	];

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

	if (appState.isMobile) {
		useTrap();
		useShortcut(
			"escape",
			() => {
				appState.sidebarOpen = !appState.sidebarOpen;
			},
			{
				name: "Close overlay",
				description: "",
				preventDefault: true
			}
		);
	}
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
				appearance={isActive ? "primary" : undefined}
				onclick={() => handleItemClick(item)}>
				{#if hasChildren}
					{#if isExpanded}
						<Icon icon="keyboard_arrow_down" />
					{:else}
						<Icon icon="keyboard_arrow_right" />
					{/if}
				{/if}

				{item.pageName}
			</Button>
		</div>

		{#if hasChildren && isExpanded}
			{@render navTree(item.children!, depth + 1)}
		{/if}
	{/each}
{/snippet}

<aside class={styles.baseSidebarNavigation[appState.isMobile ? "mobile" : "desktop"]}>
	<div class={styles.navigation}>
		<LinkButton opennewtab stretchwidth href="https://home.davidnet.net" alignContent="left">
			Davidnet Home
		</LinkButton>
		{@render navTree(navigationData, 0)}
	</div>
	{#if appState.isMobile}
		<div class={styles.bottom}>
			<Button
				iconbefore="close"
				stretchwidth
				alignContent="left"
				onclick={() => {
					appState.sidebarOpen = !appState.sidebarOpen;
				}}>
				Close sidebar
			</Button>
		</div>
	{/if}
</aside>
