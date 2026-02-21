<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLFormAttributes } from "svelte/elements";

	interface Props extends HTMLFormAttributes {
		children: Snippet;
		/** *
		 * @default "80%"
		 */
		width?: string;
	}

	let { children, width = "80%", ...rest }: Props = $props();
</script>

<form style="width: {width}" {...rest}>
	{@render children()}
</form>
