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
		class: className = "",
		...rest
	}: Props = $props();

	const target = $derived(opennewtab || external ? "_blank" : rest.target);
	const rel = $derived(opennewtab || external ? "noopener noreferrer" : rest.rel);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	class={className}
	href={disabled ? undefined : href}
	{target}
	{rel}
	aria-disabled={disabled}
	{...rest}
>
	{@render children()}
</a>
