<script lang="ts">
	import { maxWidth } from "./../../primitives/Flex/Flex.css.ts";
	import { Flex, Dropdown, Button } from "$lib";
	import { token } from "$lib/styles/designTokens";
	import { m as library_messages } from "$lib/paraglide/messages.js";
	import CompactHorizontalCard from "../CompactHorizontalCard/CompactHorizontalCard.svelte";

	let workspaceSwitcherOpen = $state(false);
</script>

<div style="width: 100%; margin: {token.global.spacing.small}">
	<Flex width="fit-content" direction="column" gap="small">
		<Dropdown isOpen={workspaceSwitcherOpen} stretchWidthTrigger>
			{#snippet trigger()}
				<Button
					iconbefore="interactive_space"
					stretchwidth
					alignContent="left"
					onclick={() => {
						workspaceSwitcherOpen = !workspaceSwitcherOpen;
					}}
					appearance="default">
					Switch workspace
				</Button>
			{/snippet}
			<Button appearance="subtle" alignContent="left">Test 1</Button>
			<Button appearance="subtle" alignContent="left">Test 2</Button>
		</Dropdown>

		<CompactHorizontalCard title="Home" icon="home" href="https://home.davidnet.net" />
		<CompactHorizontalCard title="Account" icon="for_you" href="https://account.davidnet.net" />
		<CompactHorizontalCard title="Docs" icon="docs" href="https://docs.davidnet.net" />
		<CompactHorizontalCard title="Kanban" icon="view_kanban" href="https://kanban.davidnet.net" />
	</Flex>
</div>
