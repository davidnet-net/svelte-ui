<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import Avatar from "$lib/components/primitives/Avatar/Avatar.svelte";
	import Divider from "$lib/components/primitives/Divider/Divider.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import { token } from "$lib/styles/designTokens";

	import ShortcutsModal from "../ShortcutsModal/ShortcutsModal.svelte";

	interface Props {
		isAvatarLoading: boolean;
		username: string;
		email: string;
		profilePictureURL: string;
	}

	let { isAvatarLoading, username, email, profilePictureURL }: Props = $props();

	let isShortcutModalOpen = $state(false);
</script>

<div style="width: 100%; margin: {token.global.spacing.small}">
	<Flex width="fit-content" direction="column" gap="small">
		<span
			style="color: {token.theme.color.text.tertiary}; font-weight: {token.global.font.weight
				.bold}; font-size: {token.global.font.size.small}">
			Account
		</span>

		<Flex alignItems="center" gap="medium" marginBottom="small">
			<Avatar src={profilePictureURL} size="huge" loading={isAvatarLoading} />
			<Flex direction="column">
				<span
					style="font-size: {token.global.font.size.medium}; font-weight: {token.global.font.weight
						.bold}">
					{username}
				</span>
				<span
					style="font-size: {token.global.font.size.small}; font-weight: {token.global.font.weight
						.bold}; color: {token.theme.color.text.secondary}">
					{email}
				</span>
			</Flex>
		</Flex>

		<LinkButton
			alignContent="left"
			opennewtab
			stretchwidth
			appearance="subtle"
			href="https://account.davidnet.net">
			Switch account
		</LinkButton>
		<LinkButton
			alignContent="left"
			opennewtab
			stretchwidth
			appearance="subtle"
			href="https://account.davidnet.net">
			Manage account
		</LinkButton>
		<LinkButton
			alignContent="left"
			opennewtab
			stretchwidth
			appearance="subtle"
			href="https://account.davidnet.net">
			Preferences
		</LinkButton>
		<Divider color="tertiary" thickness="standard" />
		<LinkButton
			alignContent="left"
			opennewtab
			stretchwidth
			appearance="subtle"
			href="https://davidnet.net/help">
			Help
		</LinkButton>
		<Button
			stretchwidth
			alignContent="left"
			appearance="subtle"
			onclick={() => {
				isShortcutModalOpen = !isShortcutModalOpen;
			}}>
			Active shortcuts
		</Button>
		<Divider color="tertiary" thickness="standard" />
		<LinkButton
			alignContent="left"
			opennewtab
			stretchwidth
			appearance="subtle"
			href="https://account.davidnet.net/logout">
			Logout
		</LinkButton>
	</Flex>
</div>

{#if isShortcutModalOpen}
	<ShortcutsModal onClose={() => (isShortcutModalOpen = false)} />
{/if}
