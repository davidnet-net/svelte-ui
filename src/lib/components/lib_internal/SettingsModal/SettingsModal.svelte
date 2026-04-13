<script lang="ts">
    import Button from "$lib/components/input/Button/Button.svelte";
    import LinkButton from "$lib/components/input/Button/LinkButton.svelte";
    import VisuallyHidden from "$lib/components/messaging/VisuallyHidden/VisuallyHidden.svelte";
	import Modal from "$lib/components/messaging/Modal/Modal.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
</script>

<Modal title="Quick settings" onclose={onClose}>
	<Flex direction="column" gap="small">
        <span>Example setting</span>
	</Flex>
	{#snippet actions()}
        <LinkButton href="https://account.davidnet.net/account/settings/preferences">All settings</LinkButton>
		<Button onclick={onClose} appearance="primary">Close <VisuallyHidden>Quick settings modal</VisuallyHidden></Button>
	{/snippet}
</Modal