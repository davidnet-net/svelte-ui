<script lang="ts">
	import { PUBLIC_BACKEND_URL } from "$env/static/public";
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
	import { postFetch } from "$lib/utils";
	import { sleep } from "$lib/utils/sleep";

	interface Props {
		isOpen: boolean;
	}

	let { isOpen = $bindable(false) }: Props = $props();

	// Mirrors the server-side cap in davidnet-backend/src/routes/support/feedback.ts - this is
	// just for immediate UX feedback, the server re-validates authoritatively.
	const MAX_ATTACHMENTS_TOTAL_BYTES = 50 * 1024 * 1024;
	const ATTACHMENT_ACCEPT =
		"image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm,video/quicktime";

	let feedbackMessageInvalid = $state("");
	let feedbackValue = $state("");
	let isSubmitting = $state(false);
	let feedbackFinished = $state(false);
	let feedbackFailed = $state(false);
	let attachmentFileList = $state<FileList | null>(null);

	const attachmentFiles = $derived(Array.from(attachmentFileList ?? []));
	const totalAttachmentBytes = $derived(attachmentFiles.reduce((sum, f) => sum + f.size, 0));
	const attachmentsTooLarge = $derived(totalAttachmentBytes > MAX_ATTACHMENTS_TOTAL_BYTES);

	function formatBytes(bytes: number): string {
		if (!bytes) return "0 KB";
		const units = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
	}

	function removeAttachment(index: number) {
		const dt = new DataTransfer();
		attachmentFiles.forEach((file, i) => {
			if (i !== index) dt.items.add(file);
		});
		attachmentFileList = dt.files;
	}

	function resetAttachments() {
		attachmentFileList = null;
	}

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

		if (attachmentsTooLarge) {
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

		// multipart/form-data now rather than a plain JSON body, so the validated payload travels
		// as one JSON-encoded field alongside the raw attachment files.
		const submission = new FormData();
		submission.append("payload", JSON.stringify(data));
		for (const file of attachmentFiles) {
			submission.append("attachments", file);
		}

		const result = await postFetch(
			PUBLIC_BACKEND_URL + "/support/send-feedback",
			submission,
			undefined,
			true
		);

		await sleep(500);

		if (result.success) {
			feedbackFinished = true;
		} else {
			feedbackFinished = true;
			feedbackFailed = true;
		}
	}
</script>

{#if isOpen && !feedbackFinished && authState.isLoggedIn}
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
				<Field
					label={library_messages.lib_component_feedback_label_attachments()}
					name="attachments"
					invalid={attachmentsTooLarge ? library_messages.lib_component_feedback_attachments_too_large() : ""}>
					<input
						type="file"
						accept={ATTACHMENT_ACCEPT}
						multiple
						bind:files={attachmentFileList}
						disabled={isSubmitting} />
				</Field>

				{#if attachmentFiles.length > 0}
					<Flex direction="column" gap="xsmall" marginTop="small">
						{#each attachmentFiles as file, index}
							<Flex
								alignItems="center"
								gap="small"
								style="padding: 6px 8px; background: {token.theme.color.surface
									.raised}; border-radius: 6px;">
								<span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
									{file.name}
								</span>
								<span style="color: {token.theme.color.text.tertiary}; font-size: 0.8rem;">
									{formatBytes(file.size)}
								</span>
								<Button
									appearance="subtle"
									iconbefore="close"
									disabled={isSubmitting}
									onclick={() => removeAttachment(index)}>
									{library_messages.lib_component_feedback_remove_attachment()}
								</Button>
							</Flex>
						{/each}
						<span
							style="font-size: 0.8rem; color: {attachmentsTooLarge
								? token.theme.color.text.danger
								: token.theme.color.text.tertiary}">
							{formatBytes(totalAttachmentBytes)} / {formatBytes(MAX_ATTACHMENTS_TOTAL_BYTES)}
						</span>
					</Flex>
				{/if}
			</Form>
		</Flex>
		{#snippet actions()}
			<Button
				disabled={isSubmitting}
				onclick={() => {
					resetAttachments();
					isOpen = false;
				}}>
				{library_messages.lib_common_cancel()}
			</Button>
			<Button
				form="feedback-form"
				type="submit"
				appearance="primary"
				loading={isSubmitting}
				disabled={feedbackValue.length > 2000 || attachmentsTooLarge}>
				{library_messages.lib_common_submit()}
			</Button>
		{/snippet}
	</Modal>
{:else if isOpen && feedbackFailed}
	<Modal title={library_messages.lib_component_feedback_title()}>
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<Icon icon="chat_error" size="giant" color="danger" />
			<span style="font-size: {token.global.font.size.large}; text-align: center">
				Failed to send feedback.
			</span>
		</Flex>
		{#snippet actions()}
			<Button
				appearance="primary"
				onclick={() => {
					feedbackFinished = false;
					isSubmitting = false;
					feedbackValue = "";
					resetAttachments();
					isOpen = false;
				}}>
				{library_messages.lib_common_close()}
			</Button>
		{/snippet}
	</Modal>
{:else if isOpen && !authState.isLoggedIn}
	<Modal title={library_messages.lib_component_feedback_title()}>
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<Icon icon="chat_error" size="giant" color="danger" />
			<span style="font-size: {token.global.font.size.large}; text-align: center">
				You must be logged in to send feedback.
			</span>
		</Flex>
		{#snippet actions()}
			<Button
				appearance="primary"
				onclick={() => {
					feedbackFinished = false;
					isSubmitting = false;
					feedbackValue = "";
					resetAttachments();
					isOpen = false;
				}}>
				{library_messages.lib_common_close()}
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
					feedbackFinished = false;
					isSubmitting = false;
					feedbackValue = "";
					resetAttachments();
					isOpen = false;
				}}>
				{library_messages.lib_common_close()}
			</Button>
		{/snippet}
	</Modal>
{/if}
