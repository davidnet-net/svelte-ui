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

	const fieldContext = getContext<fieldContextType | undefined>("field-context");

	const finalID = $derived(id ?? fieldContext?.fieldID);
	const finalName = $derived(name ?? fieldContext?.name);
	const finalRequired = $derived(required ?? fieldContext?.required ?? false);

	const isInvalid = $derived(
		invalid !== undefined
			? !!invalid
			: !!fieldContext?.invalid || !!fieldContext?.invalidOveride?.invalid
	);

	// Strict row enforcement on input (handles typing & pasting)
	function handleInput(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		let val = target.value;

		if (maxRows) {
			const lines = val.split("\n");
			if (lines.length > maxRows) {
				// Truncate excess lines if pasted or typed past limit
				val = lines.slice(0, maxRows).join("\n");
				value = val;
				target.value = val;
			} else {
				value = val;
			}
		} else {
			value = val;
		}

		// Auto-resize height
		if (textareaElement) {
			textareaElement.style.height = "auto";
			textareaElement.style.height = `${textareaElement.scrollHeight}px`;
		}

		if (restProps.oninput) {
			restProps.oninput(e);
		}
	}

	// Prevent pressing 'Enter' when maxRows limit is reached
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" && maxRows) {
			const lines = value.split("\n");
			if (lines.length >= maxRows) {
				e.preventDefault(); // Block adding a new line
			}
		}

		if (restProps.onkeydown) {
			restProps.onkeydown(e);
		}
	}

	// Initial height sync
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

<textarea
	bind:this={textareaElement}
	{value}
	oninput={handleInput}
	onkeydown={handleKeydown}
	id={finalID}
	name={finalName}
	required={finalRequired}
	aria-invalid={isInvalid}
	class={headless
		? undefined
		: `${styles.baseTextArea} ${isInvalid ? styles.invalid : ""} ${focusring} ${styles.size.smart}`}
	{...restProps}>
</textarea>
