<script lang="ts">
	import { PUBLIC_ACCOUNT_FRONTEND_URL } from "$env/static/public";
	import Button from "$lib/components/input/Button/Button.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import Modal from "$lib/components/messaging/Modal/Modal.svelte";
	import VisuallyHidden from "$lib/components/messaging/VisuallyHidden/VisuallyHidden.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import { m as library_messages } from "$lib/paraglide/messages.js";

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();
</script>

<Modal title={library_messages.lib_component_settings_modal_title()} onclose={onClose}>
	<Flex direction="column" gap="small">
		<span>{library_messages.lib_component_settings_modal_example_setting()}</span>
	</Flex>
	{#snippet actions()}
		<LinkButton href={PUBLIC_ACCOUNT_FRONTEND_URL + "/account/settings/preferences"}>
			{library_messages.lib_component_settings_modal_all_settings()}
		</LinkButton>
		<Button onclick={onClose} appearance="primary">
			{library_messages.lib_common_close()}
			<VisuallyHidden>{library_messages.lib_component_settings_modal_close_alt()}</VisuallyHidden>
		</Button>
	{/snippet}
</Modal>
