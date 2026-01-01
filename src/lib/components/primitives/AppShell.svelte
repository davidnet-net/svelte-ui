<script lang="ts">
	import { token } from "../../styles/schema.css.ts";
	import { darkTheme } from "../../styles/themes/dark.css.ts";
	import { lightTheme } from "../../styles/themes/light.css.ts";
	import type { Snippet } from "svelte";
	import "$lib/styles/reset.css.ts";

	// Props
	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();

	// Variables
	let theme = $state(lightTheme);
</script>

<div class="appshell {theme}">
	{@render children()}
</div>
