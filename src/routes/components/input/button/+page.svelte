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
	import * as m from "$lib/paraglide/messages.js";
	import { token } from "$lib/styles";

	import * as styles from "./page.css";

	let activeTab = $state("examples");
</script>

<Tabs bind:selected={activeTab}>
	<Header heading={m.docs_page_name_button()} paragraph={m.docs_page_button_paragraph()}>
		{#snippet tabs()}
			<Tab value="examples">{m.docs_page_button_tab_examples()}</Tab>
			<Tab value="changelog">{m.docs_page_button_tab_changelog()}</Tab>
		{/snippet}
	</Header>

	<div class={styles.pageContainer}>
		<TabPanel value="examples">
			<div>
				<h2>{m.docs_page_button_h2_default()}</h2>
				<p class={styles.paragraph}>
					{m.docs_page_button_default_desc()}
				</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "default", children: m.docs_page_button_demo_default() }}
					height="100px" />
			</div>

			<div>
				<h2>{m.docs_page_button_h2_primary()}</h2>
				<p class={styles.paragraph}>
					{m.docs_page_button_primary_desc()}
				</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "primary", children: m.docs_page_button_demo_primary() }}
					height="100px" />
			</div>

			<div>
				<h2>{m.docs_page_button_h2_subtle()}</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "subtle", children: m.docs_page_button_demo_subtle() }}
					height="100px" />
			</div>

			<div>
				<h2>{m.docs_page_button_h2_warning()}</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "warning", children: m.docs_page_button_demo_warning() }}
					height="100px" />
			</div>

			<div>
				<h2>{m.docs_page_button_h2_danger()}</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "danger", children: m.docs_page_button_demo_danger() }}
					height="100px" />
			</div>

			<div>
				<h2>{m.docs_page_button_h2_discover()}</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "discover", children: m.docs_page_button_demo_discover() }}
					height="100px" />
			</div>

			<div>
				<h2>{m.docs_page_button_h2_loading()}</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ appearance: "primary", loading: true, children: m.docs_page_button_demo_loading() }}
					height="100px" />
			</div>

			<div>
				<h2>{m.docs_page_button_h2_selected()}</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ selected: true, children: m.docs_page_button_demo_selected() }}
					height="100px" />
			</div>

			<div>
				<h2>{m.docs_page_button_h2_stretch()}</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ stretchwidth: true, children: m.docs_page_button_demo_stretch() }}
					height="100px" />
			</div>

			<div>
				<h2>{m.docs_page_button_h2_iconbefore()}</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ iconbefore: "star", children: m.docs_page_button_demo_iconbefore() }}
					height="100px" />
			</div>

			<div>
				<h2>{m.docs_page_button_h2_iconafter()}</h2>
				<p class={styles.paragraph}>?</p>
			</div>
			<div class={styles.showcaseContainer}>
				<Playground
					componentId="Button"
					props={{ iconafter: "star", children: m.docs_page_button_demo_iconafter() }}
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
