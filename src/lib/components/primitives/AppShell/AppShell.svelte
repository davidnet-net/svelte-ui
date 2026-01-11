<script lang="ts">
	import "$lib/styles/global.css.ts";

	import { type Snippet } from "svelte";

	import Button from "$lib/components/input/Button/Button.svelte";

	import { currentTheme, setTheme } from "../../../engines/themeEngine.svelte.ts";
	import Flex from "../Flex/Flex.svelte";
	import { styles } from "./AppShell.css.ts";

	// Props
	interface Props {
		children: Snippet;
		banners?: Snippet;
	}

	let { children, banners }: Props = $props();
</script>

<div class="appshell {currentTheme.themeObject} {styles.base}">
	<div class={styles.container}>
		{@render banners?.()}

		<Flex height="100%" width="100%" direction="column">
			<nav class={styles.nav}>
				<Button onclick={() => setTheme("dark")}>Dark</Button>
				<Button onclick={() => setTheme("light")}>Light</Button>
			</nav>
			<Flex height="100%" width="100%" direction="row">
				<main style="overflow: auto; height: 100%; width: 100%;">
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
				<!--TODO Add LinkButton to help-->
			</Flex>
		</div>
	</noscript>
</div>
