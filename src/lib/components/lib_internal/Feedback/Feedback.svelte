<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import Modal from "$lib/components/messaging/Modal/Modal.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import { token } from "$lib/styles/designTokens";

	interface Props {
		isOpen: boolean;
	}

	let { isOpen = $bindable(false) }: Props = $props();
</script>

{#if isOpen}
	<Modal title="Feedback">
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<span
				style="font-size: {token.global.font.size.xmedium}; color: {token.theme.color.text
					.warning}">
				Feedback is currently unavailable.
			</span>
		</Flex>
		{#snippet actions()}
			<Button
				onclick={() => {
					isOpen = false;
				}}>
				Cancel
			</Button>
		{/snippet}
	</Modal>
{/if}
