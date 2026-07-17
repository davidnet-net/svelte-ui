<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import KeyboardTip from "$lib/components/messaging/KeyboardTip/KeyboardTip.svelte";
	import Modal from "$lib/components/messaging/Modal/Modal.svelte";
	import VisuallyHidden from "$lib/components/messaging/VisuallyHidden/VisuallyHidden.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import { getShortcuts } from "$lib/engines/shortcutEngine.svelte";
	import { m as library_messages } from "$lib/paraglide/messages.js";

	interface Props {
		onClose: () => void;
	}

	const shortcuts = getShortcuts();

	let { onClose }: Props = $props();
</script>

<Modal title={library_messages.lib_component_shortcuts_modal_title()} onclose={onClose}>
	<Flex direction="column" gap="small">
		{#each shortcuts as shortcut (shortcut.id)}
			<Flex gap="small">
				<KeyboardTip keyboardTip={shortcut.display} />
				<span>{shortcut.description}</span>
			</Flex>
		{/each}
	</Flex>
	{#snippet actions()}
		<Button onclick={onClose}>
			{library_messages.lib_common_close()}
			<VisuallyHidden>{library_messages.lib_component_shortcuts_modal_close_alt()}</VisuallyHidden>
		</Button>
	{/snippet}
</Modal>
