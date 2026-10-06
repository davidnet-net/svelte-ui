<script lang="ts">
	import { PUBLIC_BACKEND_URL } from "$env/static/public";
	import {
		authState,
		Button,
		Field,
		Flex,
		Form,
		Icon,
		Modal,
		postFetch,
		sleep,
		TextArea
	} from "$lib";
	import { m } from "$lib/paraglide/messages.js";
	import { token } from "$lib/styles";

	interface Props {
		isOpen: boolean;
		reportType: "profile" | "short" | "game";
		reportedId: string;
	}

	let { isOpen = $bindable(false), reportType, reportedId }: Props = $props();

	let reasonValue = $state("");
	let reasonInvalid = $state("");
	let isSubmitting = $state(false);
	let reportFinished = $state(false);
	let reportFailed = $state(false);

	async function submitReport(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
		event.preventDefault();

		if (!reasonValue || reasonValue.trim().length === 0) {
			reasonInvalid = m.lib_component_reportmodal_error_empty();
			return;
		}

		if (reasonValue.length > 2000) {
			reasonInvalid = m.lib_component_reportmodal_error_too_long();
			return;
		}

		reasonInvalid = "";
		isSubmitting = true;

		const payload = {
			reportType,
			reportedId,
			reason: reasonValue.trim()
		};

		const result = await postFetch(
			PUBLIC_BACKEND_URL + "/support/moderation/report",
			payload,
			undefined,
			true
		);

		await sleep(500);

		if (result.success) {
			reportFinished = true;
		} else {
			reportFinished = true;
			reportFailed = true;
		}
	}

	function resetModal() {
		reportFinished = false;
		reportFailed = false;
		isSubmitting = false;
		reasonValue = "";
		reasonInvalid = "";
		isOpen = false;
	}
</script>

{#if isOpen && !reportFinished && authState.isLoggedIn}
	<Modal
		title={m.lib_component_reportmodal_title({
			type:
				reportType === 'profile'
					? m.lib_component_reportmodal_title_profile()
					: reportType === 'short'
						? m.lib_component_reportmodal_title_short()
						: m.lib_component_reportmodal_title_game()
		})}>
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<Form id="report-form" autocomplete="off" onsubmit={submitReport}>
				<div
					style="color: {token.theme.color.text.secondary}; font-size: {token.global.font.size
						.small}; margin-bottom: 8px;">
					{m.lib_component_reportmodal_description({ reportType })}
				</div>
				<Field
					required
					label={m.lib_component_reportmodal_reason_label()}
					name="reason"
					invalid={reasonInvalid}>
					<TextArea bind:value={reasonValue} maxlength={2000} disabled={isSubmitting} />
				</Field>
			</Form>
		</Flex>
		{#snippet actions()}
			<Button
				disabled={isSubmitting}
				onclick={() => {
					isOpen = false;
					reasonValue = "";
					reasonInvalid = "";
				}}>
				{m.lib_common_cancel()}
			</Button>
			<Button
				form="report-form"
				type="submit"
				appearance="primary"
				loading={isSubmitting}
				disabled={reasonValue.trim().length === 0 || reasonValue.length > 2000}>
				{m.lib_component_reportmodal_submit()}
			</Button>
		{/snippet}
	</Modal>
{:else if isOpen && reportFailed}
	<Modal title={m.lib_component_reportmodal_failed_title()}>
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<Icon icon="error" size="giant" color="danger" />
			<span style="font-size: {token.global.font.size.large}; text-align: center">
				{m.lib_component_reportmodal_failed_content()}
			</span>
		</Flex>
		{#snippet actions()}
			<Button appearance="primary" onclick={resetModal}>{m.lib_common_close()}</Button>
		{/snippet}
	</Modal>
{:else if isOpen && !authState.isLoggedIn}
	<Modal title={m.lib_component_reportmodal_auth_title()}>
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<Icon icon="account_circle" size="giant" color="danger" />
			<span style="font-size: {token.global.font.size.large}; text-align: center">
				{m.lib_component_reportmodal_auth_content()}
			</span>
		</Flex>
		{#snippet actions()}
			<Button appearance="primary" onclick={resetModal}>{m.lib_common_close()}</Button>
		{/snippet}
	</Modal>
{:else if isOpen && reportFinished}
	<Modal title={m.lib_component_reportmodal_submitted_title()}>
		<Flex height="100%" gap="medium" justifyContent="center" alignItems="center" direction="column">
			<Icon icon="check_circle" size="giant" color="success" />
			<span style="font-size: {token.global.font.size.large}; text-align: center">
				{m.lib_component_reportmodal_thank_you()}
				<br />
				{m.lib_component_reportmodal_received()}
			</span>
		</Flex>
		{#snippet actions()}
			<Button appearance="primary" onclick={resetModal}>{m.lib_common_close()}</Button>
		{/snippet}
	</Modal>
{/if}
