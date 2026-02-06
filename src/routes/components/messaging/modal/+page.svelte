<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import Modal from "$lib/components/messaging/Modal/Modal.svelte";

	import { styles } from "./page.css";

	let modalOpen = $state(false);
</script>

{#if modalOpen}
	<Modal
		title="Delete card?"
		onclose={() => {
			modalOpen = false;
		}}>
		<h3 class={styles.modalHeading}>Yap yap yap</h3>
		Yap yappington yap yap yap yappers. Yap yap yap yap yap yap yap yap yap yap yap yap. Yap yap yap yap
		yap yap yap yap yap yap yap yap yap, yap yap yap yap yap yap. Yap yap yap yap yap yap yap yap yap
		yap yap yap. Yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap
		yap yap yap yap.
		<h3 class="{styles.modalHeading} {styles.modalHeadingSpacing}">Yap yap yappington</h3>
		Yap yap yap yap yap yap yap yap yap yap yap. Yap yap yap yap yap yap yap yap yap yap yap yap yap yap
		yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap
		yap. Yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap. Yap yap yap
		yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap. Yap yap yap yap yap yap yap yap
		yap yap yap - yap yap. Yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap.
		<h3 class="{styles.modalHeading} {styles.modalHeadingSpacing}">Yap yap yap, yap yap yap</h3>
		Yap yap yap yap yap yap yap yap yap yap yap. Yap yap yap yap yap yap yap yap yap. Yap yap yap - yap
		yap yap yap yap yap yap yap yap, yap yap yap yap yap yap yap. Yap yap yap yap yap yap yap yap yap
		yap. Yap yap yap yap yap yap yap yap yap yap yap yap yap yap. Yap yap yap yap yap yap yap yap yap
		yap yap yap yap yap. Yap yap, yap yap, yap yap yap yap yap yap yap yap yap yap yap - yap yap yap.
		Yap yap yap yap yap yap yap yap yap yap yap yap, yap yap yap yap yap yap yap yap yap yap yap yap yap
		yap yap yap.
		{#snippet actions()}
			<Button
				onclick={() => {
					modalOpen = false;
				}}>
				Cancel
			</Button>
			<Button
				appearance="primary"
				onclick={() => {
					alert("Alerted");
				}}>
				Send alert
			</Button>
		{/snippet}
	</Modal>
{/if}

<Button
	onclick={() => {
		modalOpen = !modalOpen;
	}}>
	Toggle button
</Button>
