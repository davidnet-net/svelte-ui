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

	// Strict input block: rejects pasting or typing that causes physical overflow
	function handleInput(e: Event & { currentTarget: EventTarget & HTMLTextAreaElement }) {
		const target = e.currentTarget;

		if (maxRows) {
			// If the content is physically taller than the visual box (+2px for subpixel safety), revert it instantly
			if (target.scrollHeight > target.clientHeight + 2) {
				target.value = lastValidValue;
				value = lastValidValue;
				return;
			}
		}

		const currentVal = target.value;
		value = currentVal;
		lastValidValue = currentVal;

		// Auto-resize ONLY runs if maxRows is NOT active
		if (!maxRows && textareaElement) {
			textareaElement.style.height = "auto";
			textareaElement.style.height = `${textareaElement.scrollHeight}px`;
		}

		if (restProps.oninput) {
			restProps.oninput(e);
		}
	}

	// Intercepts holding "Enter" to strictly prevent adding more lines than allowed
	function handleKeydown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }) {
		if (maxRows && e.key === "Enter") {
			const newlines = (value.match(/\n/g) || []).length;
			if (newlines >= maxRows - 1) {
				e.preventDefault(); // Block the Enter key instantly
			}
		}

		if (restProps.onkeydown) {
			restProps.onkeydown(e);
		}
	}

	// Sync valid value tracking safely
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
    onkeydown={handleKeydown}
    id={finalID}
    name={finalName}
    required={finalRequired}
    aria-invalid={isInvalid}
    rows={maxRows ?? restProps.rows}
    class={headless
        ? undefined
        : `${styles.baseTextArea} ${isInvalid ? styles.invalid : ""} ${focusring} ${styles.size.smart}`}
    style="{maxRows ? 'resize: none; overflow: hidden; ' : ''}{restProps.style || ''}"
    {...restProps}></textarea>
