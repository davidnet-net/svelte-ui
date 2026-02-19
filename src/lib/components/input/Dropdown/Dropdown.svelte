<script lang="ts">
	import type { Snippet } from "svelte";

	import { focusTrap } from "$lib/engines/focusEngine.svelte";
	import { shortcutTrap, useShortcut } from "$lib/engines/shortcutEngine.svelte";
	import { floatingPosition, type Placement } from "$lib/utils/floating.svelte";

	import { styles } from "./Dropdown.css";

	interface Props {
		children: Snippet;
		trigger: Snippet;
		isOpen?: boolean;
		/**
		 * The preferred placement of the dropdown relative to the trigger.
		 * If omitted, the optimal placement will be calculated automatically.
		 */
		placement?: Placement;
		/**
		 * If true, the dropdown will strictly adhere to the provided `placement`,
		 * disabling automatic viewport collision detection and flipping.
		 */
		forcePlacement?: boolean;

		offset?: number;
	}

	let {
		children,
		trigger,
		isOpen = $bindable(false),
		placement = "bottom-start",
		forcePlacement = false,
		offset = 12
	}: Props = $props();

	let triggerContainer = $state<HTMLElement | null>(null);

	useShortcut(
		"escape",
		() => {
			isOpen = false;
		},
		{
			name: "Close dropdown",
			preventDefault: true,
			active: () => isOpen
		}
	);
</script>

<div class={styles.baseDropdown} bind:this={triggerContainer}>
	{@render trigger()}

	{#if isOpen && triggerContainer}
		<div
			use:shortcutTrap
			use:focusTrap
			class={styles.dropdownContent}
			use:floatingPosition={{ trigger: triggerContainer, placement, forcePlacement, offset }}>
			{@render children()}
		</div>
	{/if}
</div>
