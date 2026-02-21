<script lang="ts">
	import { DDS_INFO } from "$lib";
	import Button from "$lib/components/input/Button/Button.svelte";
	import Field from "$lib/components/input/Field/Field.svelte";
	import Form from "$lib/components/input/Form/Form.svelte";
	import TextArea from "$lib/components/input/TextArea/TextArea.svelte";
	import Modal from "$lib/components/messaging/Modal/Modal.svelte";
	import Link from "$lib/components/navigation/Link/Link.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import { authState, identity } from "$lib/engines/identityEngine.svelte";
	import { token } from "$lib/styles/designTokens";
	import { sleep } from "$lib/utils/sleep";

	interface Props {
		isOpen: boolean;
	}

	let { isOpen = $bindable(false) }: Props = $props();

	let feedbackMessageInvalid = $state("");
	let feedbackValue = $state("");
	let isSubmitting = $state(false);
	let feedbackFinished = $state(false);
	async function submitFeedback(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
		event.preventDefault();
		isSubmitting = true;

		const formData = new FormData(event.currentTarget);
		const message = formData.get("message");

		// Validate message.
		if (!message) {
			isSubmitting = false;
			return;
		}

		if (message.toString().length > 2000) {
			isSubmitting = false;
			return;
		}

		// Remove sensitive data from identity snapshot
		const identitySnapshot = $state.snapshot(identity);
		const { jwt, ...safeIdentity } = identitySnapshot || {};
		void jwt;

		const data = {
			message: message.toString(),
			appState: $state.snapshot(appState),
			DDS_INFO: DDS_INFO,
			safeIdentity: safeIdentity,
			referrer: document.referrer,
			authState: $state.snapshot(authState),
			timestamp: new Date().toISOString(),
			URL: window.location.href,
			userAgent: navigator.userAgent,
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight,
				pixelRatio: window.devicePixelRatio
			}
		};

		console.debug(data);

		//isSubmitting = false;

		await sleep(1000);

		feedbackFinished = true; // If failure just show submit screen again with error!
	}
</script>

{#if isOpen && !feedbackFinished}
	<Modal title="Feedback">
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<Form id="feedback-form" autocomplete="off" onsubmit={submitFeedback}>
				<div
					style="color: {token.theme.color.text.secondary}; font-size: {token.global.font.size
						.small}">
					Help us improve! Share your feedback, bugs or feature ideas below. Need help? Visit our <Link
						href="https://davidnet.net/help">
						help center
					</Link> instead.
				</div>
				<Field
					required
					label="Enter your feedback here:"
					name="message"
					invalid={feedbackMessageInvalid}>
					<TextArea bind:value={feedbackValue} maxlength={2000} disabled={isSubmitting} />
				</Field>
			</Form>
		</Flex>
		{#snippet actions()}
			<Button
				disabled={isSubmitting}
				onclick={() => {
					isOpen = false;
				}}>
				Cancel
			</Button>
			<Button
				form="feedback-form"
				type="submit"
				appearance="primary"
				loading={isSubmitting}
				disabled={feedbackValue.length > 2000}>
				Submit
			</Button>
		{/snippet}
	</Modal>
{:else if isOpen && feedbackFinished}
	<Modal title="Feedback">
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<Icon icon="mark_chat_read" size="giant" color="success" />
			<span style="font-size: {token.global.font.size.large}">
				Your feedback has been submitted!
			</span>
		</Flex>
		{#snippet actions()}
			<Button
				appearance="primary"
				onclick={() => {
					isOpen = false;
					feedbackFinished = false;
					isSubmitting = false;
					feedbackValue = "";
				}}>
				Close
			</Button>
		{/snippet}
	</Modal>
{/if}
