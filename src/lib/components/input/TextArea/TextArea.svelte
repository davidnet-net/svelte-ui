<script lang="ts">
	import { getContext } from "svelte";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	import { m as library_messages } from "$lib/paraglide/messages.js";
	import { focusring } from "$lib/styles/global.css";
	import type { fieldContextType } from "$lib/types/Form";

	import { styles } from "./TextArea.css";

	interface Props extends HTMLTextareaAttributes {
		value?: string;
		invalid?: string;
		maxlength?: number;
		headless?: boolean;
		maxRows?: number;
	}

	let {
		value = $bindable(""),
		id = undefined,
		name = undefined,
		required = undefined,
		invalid = undefined,
		maxlength = undefined,
		headless = false,
		maxRows = undefined,
		...restProps
	}: Props = $props();

	let textareaElement: HTMLTextAreaElement | undefined = $state();
	let lastValidValue = value;

	const fieldContext = getContext<fieldContextType | undefined>("field-context");

	const finalID = $derived(id ?? fieldContext?.fieldID);
	const finalName = $derived(name ?? fieldContext?.name);
	const finalRequired = $derived(required ?? fieldContext?.required ?? false);

	const isInvalid = $derived(
		invalid !== undefined
			? !!invalid
			: !!fieldContext?.invalid || !!fieldContext?.invalidOveride?.invalid
	);

	// Strict visual height enforcement for maxRows.
	// Typed to match Svelte's expected HTMLTextareaAttributes event signature.
	function handleInput(e: Event & { currentTarget: EventTarget & HTMLTextAreaElement }) {
		const target = e.currentTarget;
		const currentVal = target.value;

		value = currentVal;

		if (maxRows && textareaElement) {
			const computed = window.getComputedStyle(textareaElement);
			let lineHeight = parseFloat(computed.lineHeight);
			if (isNaN(lineHeight)) {
				lineHeight = parseFloat(computed.fontSize) * 1.2 || 20;
			}

			const paddingTop = parseFloat(computed.paddingTop) || 0;
			const paddingBottom = parseFloat(computed.paddingBottom) || 0;
			const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;

			// If the text exceeds the height of maxRows (due to wrapping or enters), revert it
			if (textareaElement.scrollHeight > maxHeight) {
				value = lastValidValue;
				target.value = lastValidValue;
				return;
			}
		}

		lastValidValue = currentVal;

		if (restProps.oninput) {
			restProps.oninput(e);
		}
	}

	// Sync valid value tracking
	$effect(() => {
		if (value !== lastValidValue) {
			lastValidValue = value;
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
					fieldContext.invalidOveride.invalid =
						diff === 1
							? library_messages.lib_common_characterlimit_one()
							: library_messages.lib_common_characterlimit_other({ diff });
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

<!-- prettier-ignore -->
<textarea
    bind:this={textareaElement}
    {value}
    oninput={handleInput}
    id={finalID}
    name={finalName}
    required={finalRequired}
    aria-invalid={isInvalid}
    class={headless
        ? undefined
        : `${styles.baseTextArea} ${isInvalid ? styles.invalid : ""} ${focusring} ${styles.size.smart}`}
    style="resize: none; overflow: hidden; {restProps.style || ''}"
    {...restProps}></textarea>
