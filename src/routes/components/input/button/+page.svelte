<script lang="ts">
	import { Divider } from "$lib";
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Changelog from "$lib/internal/components/Changelog/Changelog.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import { token } from "$lib/styles";

	import * as styles from "./page.css";
</script>

<Header heading="Button" paragraph="The most used component for interacting with an page." />

<div class={styles.pageContainer}>
	<Flex direction="column" gap="medium">
		<div>
			<h3
				style="padding-bottom: {token.global.spacing.small}; font-size: {token.global.font.size
					.large}">
				<Anchor
					href="https://github.com/davidnet-net/svelte-ui/blob/main/src/lib/components/input/Button/Button.svelte">
					Button.svelte
				</Anchor>
			</h3>
			<Changelog
				gitpath="src/lib/components/input/Button/Button.svelte"
				repoUrl="https://github.com/davidnet-net/svelte-ui" />
		</div>
		<Divider />
		<div>
			<h3
				style="padding-bottom: {token.global.spacing.small}; font-size: {token.global.font.size
					.large}">
				<Anchor
					href="https://github.com/davidnet-net/svelte-ui/blob/main/src/lib/components/input/Button/Button.css.ts">
					Button.css.ts
				</Anchor>
			</h3>
			<Changelog
				gitpath="src/lib/components/input/Button/Button.css.ts"
				repoUrl="https://github.com/davidnet-net/svelte-ui" />
		</div>
	</Flex>
</div>
