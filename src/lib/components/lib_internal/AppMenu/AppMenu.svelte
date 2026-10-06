<script lang="ts">
	import { Flex, Dropdown, Button, identityState, authState, switchWorkspace } from "$lib";
	import { m } from "$lib/paraglide/messages.js";
	import { token } from "$lib/styles/designTokens";
	import CompactHorizontalCard from "../CompactHorizontalCard/CompactHorizontalCard.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";

	let workspaceSwitcherOpen = $state(false);
</script>

<div style="width: 100%; margin: {token.global.spacing.small}">
	<Flex width="fit-content" direction="column" gap="small">
		<Dropdown isOpen={workspaceSwitcherOpen} stretchWidthTrigger>
			{#snippet trigger()}
				<Button
					disabled={!authState.isLoggedIn}
					iconbefore="interactive_space"
					stretchwidth
					alignContent="left"
					onclick={() => {
						workspaceSwitcherOpen = !workspaceSwitcherOpen;
					}}
					appearance="default">
					{m.lib_component_appmenu_switch_workspace()}
				</Button>
			{/snippet}

			<Flex direction="column" height="fit-content" gap="small" padding="xsmall">
				{#each identityState.workspaces ?? [] as workspace}
					<Button
						iconbefore={workspace.type === "personal" ? "for_you" : "enterprise"}
						appearance="subtle"
						selected={workspace.id === identityState.user?.lastActiveWorkspaceId}
						onclick={async () => {
							if (workspace.id === identityState.user?.lastActiveWorkspaceId) return;
							await switchWorkspace(workspace.id, workspace.name);
							workspaceSwitcherOpen = false;
						}}
						stretchwidth
						alignContent="left">
						{workspace.name}
					</Button>
				{/each}
			</Flex>
			<br />
			<LinkButton href="#" disabled iconbefore="add"
				>{m.lib_component_appmenu_add_organization()}</LinkButton>
		</Dropdown>

		<CompactHorizontalCard title={m.lib_component_appmenu_home()} icon="home" href="https://home.davidnet.net" />
		<CompactHorizontalCard
			title={m.lib_component_appmenu_account()}
			icon="for_you"
			href="https://account.davidnet.net" />
		<CompactHorizontalCard title={m.lib_component_appmenu_docs()} icon="docs" href="https://docs.davidnet.net" />
		<CompactHorizontalCard
			title={m.lib_component_appmenu_kanban()}
			icon="view_kanban"
			href="https://kanban.davidnet.net" />
		<CompactHorizontalCard title={m.lib_component_appmenu_quiz()} icon="quiz" href="https://quiz.davidnet.net" />
	</Flex>
</div>
