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
		<h3 class={styles.modalHeading}>Be bold</h3>
		Motivate teams to do their best work. Offer best practices to get users going in the right direction.
		Be bold and offer just enough help to get the work started, and then get out of the way. Give accurate
		information so users can make educated decisions. Know your user's struggles and desired outcomes
		and give just enough information to let them get where they need to go.
		<h3 class="{styles.modalHeading} {styles.modalHeadingSpacing}">Be optimistic</h3>
		Focusing on the details gives people confidence in our apps. Weave a consistent story across our fabric
		and be diligent about vocabulary across all messaging by being brand conscious across apps to create
		a seamless flow across all the things. Let people know that they can jump in and start working expecting
		to find a dependable experience across all the things. Keep teams in the loop about what is happening
		by informing them of relevant features, apps and opportunities for success. Be on the journey with
		them and highlight the key points that will help them the most - right now. Be in the moment by focusing
		attention on the important bits first.
		<h3 class="{styles.modalHeading} {styles.modalHeadingSpacing}">Be practical, with a wink</h3>
		Keep our own story short and give teams just enough to get moving. Get to the point and be direct.
		Be concise - we tell the story of how we can help, but we do it directly and with purpose. Be on the
		lookout for opportunities and be quick to offer a helping hand. At the same time realize that nobody
		likes a nosy neighbor. Give the user just enough to know that something awesome is around the corner
		and then get out of the way. Write clear, accurate, and concise text that makes interfaces more usable
		and consistent - and builds trust. We strive to write text that is understandable by anyone, anywhere,
		regardless of their culture or language so that everyone feels they are part of the team.
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
