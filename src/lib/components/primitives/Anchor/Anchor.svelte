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

		/**
		 * Marks the link as external.
		 * @default false
		 */
		external?: boolean;

		/**
		 * Disables the link.
		 * @default false
		 */
		disabled?: boolean;

		/**
		 * @deprecated
		 * @default false
		 */
		UNSAFE_showExitPage?: boolean;
	}

	let {
		children,
		opennewtab = false,
		external = false,
		disabled = false,
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		UNSAFE_showExitPage = false,
		href,
		...rest
	}: Props = $props();

	const target = $derived(opennewtab || external ? "_blank" : rest.target);
	const rel = $derived(opennewtab || external ? "noopener noreferrer" : rest.rel);

	const finalHref = $derived(
		disabled
			? undefined
			: external && UNSAFE_showExitPage && href
				? `https://design.davidnet.net/exit?href=${encodeURIComponent(href)}`
				: href
	);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a href={finalHref} {target} {rel} aria-disabled={disabled} {...rest}>
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
