<script lang="ts">
	import { currentTheme, setTheme } from "../../../styles/themeManager.svelte.ts";
	import type { Snippet } from "svelte";
	import "$lib/styles/reset.css.ts";
	import { styles } from "./AppShell.css.ts";
	import Flex from "../Flex/Flex.svelte";
	import Banner from "$lib/components/messaging/Banner/Banner.svelte";

	// Props
	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="appshell {currentTheme.themeObject} {styles.base}">
	<Banner icon="warning" appearance="information">Hello, <b>bold</b> testing going on here!</Banner>
	<Flex height="100%" width="100%" direction="column">
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
		<Flex height="100%" width="100%" direction="row">
			<main style="width: 50%">
				{@render children()}
			</main>
			<div class="sidepanel {styles.sidepanel}"></div>
		</Flex>
	</Flex>
</div>
