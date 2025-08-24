<script lang="ts">
	export let id: string = "textarea-" + Math.random().toString(36).substring(2, 8);
	export let label: string;
	export let placeholder: string = "";
	export let value: string = "";
	export let disabled: boolean = false;
	export let invalid: boolean = false;
	export let invalidMessage: string = "Invalid";
	export let required: boolean = false;
	export let onEnter: (event: KeyboardEvent) => void = () => {};
	export let width: string = "100%";
	export let resize: "none" | "vertical" | "horizontal" | "both" = "none";
	export let autoGrow: boolean = true;
	export let maxLength: number | null = null; // optional character limit

	let textareaEl: HTMLTextAreaElement;

	function adjustHeight() {
		if (autoGrow && textareaEl) {
			textareaEl.style.height = "auto";
			textareaEl.style.height = textareaEl.scrollHeight + "px";
		}
	}
</script>

<div class="textarea-root" style="width: {width};">
	<label for={id}>
		{label}
		{#if required}
			<span aria-hidden="true" style="color: red;">*</span>
		{/if}
	</label>

	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<textarea
		bind:this={textareaEl}
		{id}
		{placeholder}
		{disabled}
		{required}
		maxlength={maxLength}
		style="resize: {resize}; overflow: hidden;"
		aria-required={required}
		aria-invalid={invalid}
		aria-describedby={invalid ? id + "-error" : undefined}
		bind:value
		on:input={adjustHeight}
		on:keydown={(event) => {
			if (event.key === "Enter" && onEnter) {
				onEnter(event);
			}
		}}
	/>

	<!-- Error message or placeholder -->
	{#if invalid}
		<div id={id + "-error"} class="error-message">
			<span class="material-symbols-outlined" aria-hidden="true">error</span>
			{invalidMessage}
		</div>
	{:else}
		<div class="error-placeholder"></div>
	{/if}

	<!-- Character counter if maxLength is set -->
	{#if maxLength !== null && maxLength == value.length}
		<div class="max-char-counter">{value.length}/{maxLength}</div>
	{:else if maxLength !== null}
		<div class="char-counter">{value.length}/{maxLength}</div>
	{/if}
</div>

<svelte:window on:load={adjustHeight} />

<style>
	.textarea-root {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	label {
		font-size: 0.875rem;
		font-weight: 500;
	}

	textarea {
		all: unset;
		border: 1px solid transparent;
		border-radius: 8px;
		cursor: text;
		padding: 0.5rem;
		font-family: var(--token-font-main);
		background-color: var(--token-color-surface-raised-normal);
		transition: border-color 0.2s;
		min-height: 2.5rem;
	}

	textarea:focus {
		border-color: var(--token-color-primary);
		outline: none;
	}

	textarea[aria-invalid="true"] {
		border-color: var(--token-color-text-danger);
	}

	.error-message {
		display: flex;
		align-items: center;
		color: var(--token-color-text-danger);
		gap: var(--token-space-1);
		min-height: 1.4rem;
		width: 100%;
		white-space: normal;
		overflow-wrap: break-word;
		vertical-align: middle;
	}

	.error-placeholder {
		min-height: 1.4rem;
	}

	.char-counter {
		font-size: 0.75rem;
		color: var(--token-color-text-secondary);
		text-align: right;
	}

	.max-char-counter {
		font-size: 0.75rem;
		color: var(--token-color-text-danger);
		text-align: right;
	}
</style>
