<script lang="ts">
	import { currentTheme, setTheme } from "../../../styles/themeManager.svelte.ts";
	import type { Snippet } from "svelte";
	import "$lib/styles/reset.css.ts";
	import { styles } from "./AppShell.css.ts";

	// Props
	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="appshell {currentTheme.themeObject}">
	<nav class={styles.nav}>
		<button
			onclick={() => {
				setTheme("dark");
			}}>dark</button
		>

		<button
			onclick={() => {
				setTheme("light");
			}}>light</button
		>
	</nav>

	{@render children()}
</div>
