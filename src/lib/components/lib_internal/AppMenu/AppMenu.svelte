<script lang="ts">
	import {
		Flex,
		Dropdown,
		Button,
		identityState,
		putFetch,
		authBeat,
		toast,
		type UUIDv7Type,
		authState
	} from "$lib";
	import { token } from "$lib/styles/designTokens";
	import CompactHorizontalCard from "../CompactHorizontalCard/CompactHorizontalCard.svelte";
	import { PUBLIC_BACKEND_URL } from "$env/static/public";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";

	let workspaceSwitcherOpen = $state(false);

	async function switchWorkspace(workspaceID: string, name: string) {
		const result = await putFetch(
			PUBLIC_BACKEND_URL + "/workspaces/select",
			{
				workspaceId: workspaceID
			},
			undefined,
			true
		);

		if (result.code === "WORKSPACE_NOT_FOUND") {
			await authBeat();
			toast(
				"Workspace doesn't exist",
				"We reloaded your workspaces for you!",
				undefined,
				3000,
				"danger"
			);
			workspaceSwitcherOpen = false;
			return;
		}

		if (result.code === "FORBIDDEN") {
			await authBeat();
			toast(
				"You don't have access to this workspace!",
				"We reloaded your workspaces for you!",
				undefined,
				3000,
				"danger"
			);
			workspaceSwitcherOpen = false;
			return;
		}

		if (result.success) {
			if (identityState.user) {
				identityState.user.lastActiveWorkspaceId = workspaceID as UUIDv7Type & {
					__brand: "workspaceID";
				};
			}
			toast("Workspace switched!", name, undefined, 3000);
			workspaceSwitcherOpen = false;
		}
	}
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
					Switch workspace
				</Button>
			{/snippet}

			<Flex direction="column" height="fit-content" gap="small" padding="xsmall">
				{#each identityState.workspaces ?? [] as workspace}
					<Button
						iconbefore={workspace.type === "personal" ? "for_you" : "enterprise"}
						appearance="subtle"
						selected={workspace.id === identityState.user?.lastActiveWorkspaceId}
						onclick={() => {
							if (workspace.id === identityState.user?.lastActiveWorkspaceId) return;
							switchWorkspace(workspace.id, workspace.name);
						}}
						stretchwidth
						alignContent="left">
						{workspace.name}
					</Button>
				{/each}
			</Flex>
			<br />
			<LinkButton href="#" disabled iconbefore="add">Add organization</LinkButton>
		</Dropdown>

		<CompactHorizontalCard title="Home" icon="home" href="https://home.davidnet.net" />
		<CompactHorizontalCard title="Account" icon="for_you" href="https://account.davidnet.net" />
		<CompactHorizontalCard title="Docs" icon="docs" href="https://docs.davidnet.net" />
		<CompactHorizontalCard title="Kanban" icon="view_kanban" href="https://kanban.davidnet.net" />
		<CompactHorizontalCard title="Quiz" icon="quiz" href="https://quiz.davidnet.net" />
	</Flex>
</div>
