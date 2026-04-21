<script lang="ts">
	import { setContext, type Snippet } from "svelte";

	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import { generateUUIDv7 } from "$lib/utils/crypto";

	import { styles } from "./Field.css";

	interface Props {
		children: Snippet;
		label: string;
		name: string;
		required?: boolean;
		invalid?: string;
		overidelabel?: boolean;
		fieldID?: string;
	}
	let {
		children,
		label,
		name,
		required,
		invalid,
		overidelabel,
		fieldID = $bindable(generateUUIDv7() as string)
	}: Props = $props();

	let statusbar = $state<{ snippet: Snippet | undefined }>({ snippet: undefined });
	let invalidOveride = $state<{ invalid: string | undefined }>({ invalid: undefined });

	setContext("field-context", {
		get fieldID() {
			return fieldID;
		},
		get name() {
			return name;
		},
		get required() {
			return required;
		},
		get invalid() {
			return invalid;
		},
		statusbar,
		invalidOveride
	});
</script>

<div class={styles.baseField}>
	{#if !overidelabel}
		<label class={styles.label} for={fieldID}>
			{label}
			{#if required}
				<span class={styles.requiredMark}>*</span>
			{/if}
		</label>
	{/if}
	{@render children()}
	<div class={styles.statusbar}>
		{#if invalidOveride.invalid || invalid}
			<span class={styles.invalidMessage}>
				<Icon icon="report" />
				{invalidOveride.invalid || invalid}
			</span>
		{/if}

		{#if statusbar.snippet}
			<div class={styles.statusRight}>
				{@render statusbar.snippet()}
			</div>
		{/if}
	</div>
</div>
