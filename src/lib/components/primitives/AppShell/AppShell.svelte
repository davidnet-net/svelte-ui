<script lang="ts">
	import { currentTheme, setTheme } from "../../../styles/themeManager.svelte.ts";
	import { type Snippet } from "svelte";
	import "$lib/styles/global.css.ts";
	import { styles } from "./AppShell.css.ts";
	import Flex from "../Flex/Flex.svelte";
	import Button from "$lib/components/input/Button/Button.svelte";

	// Props
	interface Props {
		children: Snippet;
		banners?: Snippet;
	}

	let { children, banners }: Props = $props();
</script>

<div class="appshell {currentTheme.themeObject} {styles.base}">
	<div class="main-content">
		{@render banners?.()}

		<Flex height="100%" width="100%" direction="column">
			<nav class={styles.nav}>
				<Button onclick={() => setTheme("dark")}>Dark</Button>
				<Button onclick={() => setTheme("light")}>Light</Button>
			</nav>
			<Flex height="100%" width="100%" direction="row">
				<main style="width: 50%">
					{@render children()}
				</main>
			</Flex>
		</Flex>
	</div>

	<noscript>
		<div class={styles.noscriptoverlay}>
			<Flex direction="column" alignItems="center" justifyContent="center" gap="medium">
				<div style="text-align: center;">
					<h1>Javascript is disabled</h1>
					<p>Please enable javascript to use Davidnet.</p>
				</div>
				<Button appearance="primary">Help</Button>
			</Flex>
		</div>
	</noscript>
</div>
