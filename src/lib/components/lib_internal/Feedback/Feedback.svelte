<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import Field from "$lib/components/input/Field/Field.svelte";
	import Form from "$lib/components/input/Form/Form.svelte";
	import TextArea from "$lib/components/input/TextArea/TextArea.svelte";
	import Modal from "$lib/components/messaging/Modal/Modal.svelte";
	import Link from "$lib/components/navigation/Link/Link.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import { authState, identityState } from "$lib/engines/identityEngine.svelte";
	import manifest from "$lib/internal/manifests/version-manifest.json";
	import { m as library_messages } from "$lib/paraglide/messages.js";
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

		// Remove sensitive data from token snapshot
		const tokenSnapshot = $state.snapshot(identityState.token);
		const safeToken = tokenSnapshot ? { ...tokenSnapshot, raw: undefined } : undefined;

		const safeIdentity = {
			token: safeToken,
			user: $state.snapshot(identityState.user),
			preferences: $state.snapshot(identityState.preferences),
			privacy: $state.snapshot(identityState.privacy)
		};

		const data = {
			message: message.toString(),
			appState: $state.snapshot(appState),
			DDS_INFO: manifest,
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

		// Do some magic fetches

		//isSubmitting = false;

		await sleep(500);

		feedbackFinished = true; // If failure just show submit screen again with error!
	}
</script>

{#if isOpen && !feedbackFinished}
	<Modal title={library_messages.lib_component_feedback_title()}>
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<Form id="feedback-form" autocomplete="off" onsubmit={submitFeedback}>
				<div
					style="color: {token.theme.color.text.secondary}; font-size: {token.global.font.size
						.small}">
					{library_messages.lib_component_feedback_intro()}<Link href="https://davidnet.net/help">
						{library_messages.lib_component_feedback_help_center()}
					</Link>{library_messages.lib_component_feedback_intro_suffix()}
				</div>
				<Field
					required
					label={library_messages.lib_component_feedback_label_message()}
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
				{library_messages.lib_common_cancel()}
			</Button>
			<Button
				form="feedback-form"
				type="submit"
				appearance="primary"
				loading={isSubmitting}
				disabled={feedbackValue.length > 2000}>
				{library_messages.lib_common_submit()}
			</Button>
		{/snippet}
	</Modal>
{:else if isOpen && feedbackFinished}
	<Modal title={library_messages.lib_component_feedback_title()}>
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<Icon icon="mark_chat_read" size="giant" color="success" />
			<span style="font-size: {token.global.font.size.large}; text-align: center">
				{library_messages.lib_component_feedback_success_message()}
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
				{library_messages.lib_common_close()}
			</Button>
		{/snippet}
	</Modal>
{/if}
