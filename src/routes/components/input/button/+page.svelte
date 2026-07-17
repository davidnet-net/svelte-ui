<script lang="ts">
	import { Divider } from "$lib";
	import Tab from "$lib/components/navigation/Tab/Tab.svelte";
	import TabPanel from "$lib/components/navigation/TabPanel/TabPanel.svelte";
	import Tabs from "$lib/components/navigation/Tabs/Tabs.svelte";
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Changelog from "$lib/internal/components/Changelog/Changelog.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import Playground from "$lib/internal/components/Playground/Playground.svelte";
	import { token } from "$lib/styles";

	import * as styles from "./page.css";

	let activeTab = $state("examples");
</script>

<Tabs bind:selected={activeTab}>
	<Header heading="Button" paragraph="The most used component for interacting with a page.">
		{#snippet tabs()}
			<Tab value="examples">Examples</Tab>
			<Tab value="changelog">Changelog</Tab>
		{/snippet}
	</Header>

	<div class={styles.pageContainer}>
		<TabPanel value="examples">
			<div>
				<h2>Default</h2>
				<p class={styles.paragraph}>
					Use default buttons for standard actions that aren't the primary action for a page or
					container. They are styled with subtle borders and neutral background states.
				</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "default", children: "Default button" }}
					height="100px" />
			</div>

			<div>
				<h2>Primary</h2>
				<p class={styles.paragraph}>
					Use primary buttons to highlight the main call to action on a page. Only one primary
					button should be visible in a section.
				</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "primary", children: "Primary button" }}
					height="100px" />
			</div>

			<div>
				<h2>Subtle</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "subtle", children: "Subtle button" }}
					height="100px" />
			</div>

			<div>
				<h2>Warning</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "warning", children: "Warning button" }}
					height="100px" />
			</div>

			<div>
				<h2>Danger</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "danger", children: "Danger button" }}
					height="100px" />
			</div>

			<div>
				<h2>Discover</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "discover", children: "Discover button" }}
					height="100px" />
			</div>

			<div>
				<h2>Loading</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "primary", loading: true, children: "Submitting..." }}
					height="100px" />
			</div>

			<div>
				<h2>Selected</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ selected: true, children: "Selected button" }}
					height="100px" />
			</div>

			<div>
				<h2>Stretch width</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ stretchwidth: true, children: "Stretched button" }}
					height="100px" />
			</div>

			<div>
				<h2>Icon before</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ iconbefore: "star", children: "Icon before button" }}
					height="100px" />
			</div>

			<div>
				<h2>Icon after</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ iconafter: "star", children: "Icon after button" }}
					height="100px" />
			</div>
		</TabPanel>

		<TabPanel value="changelog">
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
		</TabPanel>
	</div>
</Tabs>
