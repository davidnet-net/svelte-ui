<script lang="ts">
	import { currentTheme, setTheme } from "../../../styles/themeManager.svelte.ts";
	import type { Snippet } from "svelte";
	import "$lib/styles/reset.css.ts";
	import { styles } from "./AppShell.css.ts";
	import Flex from "../Flex/Flex.svelte";

	// Props
	interface Props {
		children: Snippet;
		banners?: Snippet;
	}

	let { children, banners }: Props = $props();
</script>

<div class="appshell {currentTheme.themeObject} {styles.base}">
	{@render banners?.()}

	<Flex height="100%" width="100%" direction="column">
		<nav class={styles.nav}>
			<button onclick={() => setTheme("dark")}>dark</button>
			<button onclick={() => setTheme("light")}>light</button>
		</nav>
		<Flex height="100%" width="100%" direction="row">
			<main style="width: 50%">
				{@render children()}
			</main>
			<!--* Add sidepanel here *-->
		</Flex>
	</Flex>
</div>
