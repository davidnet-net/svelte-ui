<script lang="ts">
	import { getContext } from "svelte";
	import type { HTMLInputAttributes } from "svelte/elements";

	import { focusring } from "$lib/styles/global.css";
	import type { fieldContextType } from "$lib/types/Form";

	import { styles } from "./Checkbox.css";

	interface Props extends Omit<HTMLInputAttributes, "type" | "checked"> {
		checked?: boolean;
		invalid?: string | boolean;
	}

	let {
		checked = $bindable(false),
		id = undefined,
		name = undefined,
		required = undefined,
		invalid = undefined,
		...restProps
	}: Props = $props();

	const fieldContext = getContext<fieldContextType | undefined>("field-context");

	const finalID = $derived(id ?? fieldContext?.fieldID);
	const finalName = $derived(name ?? fieldContext?.name);
	const finalRequired = $derived(required ?? fieldContext?.required ?? false);

	const isInvalid = $derived(
		invalid !== undefined
			? !!invalid
			: !!fieldContext?.invalid || !!fieldContext?.invalidOveride?.invalid
	);
</script>

<div class="{styles.checkboxContainer} {isInvalid ? styles.invalid : ''}">
	<input
		bind:checked
		type="checkbox"
		id={finalID}
		name={finalName}
		required={finalRequired}
		aria-invalid={isInvalid}
		class="{styles.baseCheckbox} {focusring}"
		{...restProps} />
</div>
