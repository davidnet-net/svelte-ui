<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import { generateUUIDv7 } from "$lib/utils/crypto";

	import { styles } from "./Field.css";

	// Extend HTMLAttributes so any div attribute (style, class, etc.) can be passed down
	interface Props extends HTMLAttributes<HTMLDivElement> {
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
		fieldID = $bindable(generateUUIDv7() as string),
		...restProps // Capture remaining div attributes
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

<!-- Spread restProps onto the root div -->
<div class={styles.baseField} {...restProps}>
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
