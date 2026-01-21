<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	interface Props extends HTMLAnchorAttributes {
		children: Snippet;

		/**
		 * Opens link in new tab.
		 * @default false
		 */
		opennewtab?: boolean;

		external?: boolean;

		disabled?: boolean;
	}

	let {
		children,
		opennewtab = false,
		external = false,
		disabled = false,
		href,
		...rest
	}: Props = $props();

	const target = $derived(opennewtab || external ? "_blank" : rest.target);
	const rel = $derived(opennewtab || external ? "noopener noreferrer" : rest.rel);
</script>

<!-- LINK element for decoration. Anchor as primitive -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a href={disabled ? undefined : href} {target} {rel} aria-disabled={disabled} {...rest}>
	{@render children()}
</a>

<style>
	/* By using the element selector 'a', the specificity is very low (0,0,1).
		Classes or direct styling gets priority
    */
	a {
		text-decoration: none;
		color: inherit;
	}
</style>
