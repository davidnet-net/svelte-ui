<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import Button from "$lib/components/input/Button/Button.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";

	import { styles } from "./SidebarNavigation.css.ts";

	interface NavigationItem {
		pageName: string;
		href: string;
		children?: NavigationItem[];
	}

	const navigationData: NavigationItem[] = [
		{
			pageName: "Home",
			href: "/"
		},
		{
			pageName: "Foundations",
			href: "/foundations",
			children: [
				{
					pageName: "Some Child Page",
					href: "/foundations/somechildpage"
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
</script>

{#snippet navTree(items: NavigationItem[], depth: number)}
	{#each items as item (item.pageName)}
		{@const hasChildren = !!item.children?.length}
		{@const isExpanded = expandedItems.includes(item.href)}
		{@const isActive = page.url.pathname === item.href}

		<div style="padding-left: {depth * 1}rem">
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

<aside class={styles.baseSidebarNavigation}>
	{@render navTree(navigationData, 0)}
</aside>
