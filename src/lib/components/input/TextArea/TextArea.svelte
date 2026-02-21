<script lang="ts">
	import { getContext } from "svelte";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	import { focusring } from "$lib/styles/global.css";
	import type { fieldContextType } from "$lib/types/Form";

	import { styles } from "./TextArea.css";

	interface Props extends HTMLTextareaAttributes {
		value?: string;
		invalid?: string;
		maxlength?: number;
	}

	let {
		value = $bindable(""),
		id = undefined,
		name = undefined,
		required = undefined,
		invalid = undefined,
		maxlength = undefined,
		...restProps
	}: Props = $props();

	let textareaElement: HTMLTextAreaElement | undefined = $state();

	const fieldContext = getContext<fieldContextType | undefined>("field-context");

	const finalID = $derived(id ?? fieldContext?.fieldID);
	const finalName = $derived(name ?? fieldContext?.name);
	const finalRequired = $derived(required ?? fieldContext?.required ?? false);

	const isInvalid = $derived(
		invalid !== undefined
			? !!invalid
			: !!fieldContext?.invalid || !!fieldContext?.invalidOveride?.invalid
	);

	$effect(() => {
		void value;

		if (textareaElement) {
			textareaElement.style.height = "auto";
			textareaElement.style.height = `${textareaElement.scrollHeight}px`;
		}
	});

	let counterState: "normal" | "near" | "max" = $derived.by(() => {
		if (!maxlength) return "normal";

		const max = Number(maxlength);
		const ratio = value.length / max;

		if (ratio > 1) return "max";
		if (ratio >= 0.9) return "near";
		return "normal";
	});

	$effect(() => {
		if (fieldContext) {
			if (fieldContext.statusbar) {
				fieldContext.statusbar.snippet = statusbar;
			}

			if (fieldContext.invalidOveride && maxlength) {
				const diff = value.length - Number(maxlength);
				if (diff > 0) {
					fieldContext.invalidOveride.invalid = `Limit exceeded by ${diff} character${diff > 1 ? "s" : ""}.`;
				} else {
					fieldContext.invalidOveride.invalid = undefined;
				}
			}
		}

		return () => {
			if (fieldContext?.statusbar) fieldContext.statusbar.snippet = undefined;
			if (fieldContext?.invalidOveride) fieldContext.invalidOveride.invalid = undefined;
		};
	});
</script>

{#snippet statusbar()}
	{#if maxlength}
		<span class={styles.counter[counterState]}>
			{value.length} / {maxlength}
		</span>
	{/if}
{/snippet}

<textarea
	bind:this={textareaElement}
	bind:value
	id={finalID}
	name={finalName}
	required={finalRequired}
	aria-invalid={isInvalid}
	class="{styles.baseTextArea} {isInvalid ? styles.invalid : ''} {focusring} {styles.size.smart}"
	{...restProps}>
</textarea>
