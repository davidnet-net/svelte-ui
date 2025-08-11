<script lang="ts">
	export let id: string = "input-" + Math.random().toString(36).substring(2, 8);
	export let label: string;
	export let placeholder: string;
	export let type: "text" | "email" | "password" | "url" | "search" | "username" = "text";
	export let value: string = "";
	export let disabled: boolean = false;
	export let invalid: boolean = false;
	export let invalidMessage: string = "Invalid";
	export let required: boolean = false;
	export let onEnter: (event: KeyboardEvent) => void = () => {};
	export let width = "100%";
</script>

<div class="input-root" style="width: {width};">
	<label for={id}>
		{label}
		{#if required}
			<span aria-hidden="true" style="color: red;">*</span>
		{/if}
	</label>
	<input
		{id}
		{type}
		{placeholder}
		{disabled}
		{required}
		aria-required={required}
		aria-invalid={invalid}
		aria-describedby={invalid ? id + "-error" : undefined}
		bind:value
		on:keydown={(event) => {
			if (event.key === "Enter" && onEnter) {
				onEnter(event);
			}
		}}
	/>
	{#if invalid}
		<div id={id + "-error"} class="error-message">
			<span class="material-symbols-outlined" aria-hidden="true">error</span>
			{invalidMessage}
		</div>
	{:else}
		<div class="error-placeholder"></div>
	{/if}
</div>

<style>
	.input-root {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	label {
		font-size: 0.875rem;
		font-weight: 500;
	}

	input {
		all: unset;
		border: 1px solid transparent;
		border-radius: 8px;
		cursor: text;
		padding: 0.5rem;
		font-family: var(--token-font-main);
		background-color: var(--token-color-surface-raised-normal);
		transition: border-color 0.2s;
	}

	input:focus {
		border-color: var(--token-color-primary);
		outline: none;
	}

	input[aria-invalid="true"] {
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

	span.material-symbols-outlined {
		font-size: 1.2rem;
	}
</style>
