<script lang="ts">
	import { getContext } from "svelte";
	import { fade } from "svelte/transition";

	import { toast } from "$lib/engines";
	import { m } from "$lib/paraglide/messages.js";
	import { focusring } from "$lib/styles/global.css";
	import type { fieldContextType } from "$lib/types/Form";

	import IconButton from "../IconButton/IconButton.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import Skeleton from "$lib/components/loading/Skeleton/Skeleton.svelte";
	import Spinner from "$lib/components/loading/Spinner/Spinner.svelte";
	import { styles } from "./ImageUpload.css";

	interface Props {
		value?: string | null;
		onUpload: (file: File) => Promise<string | null>;
		onRemove?: () => void;
		accept?: string;
		maxSizeBytes?: number;
		disabled?: boolean;
		alt?: string;
		id?: string;
		name?: string;
	}

	let {
		value = $bindable(null),
		onUpload,
		onRemove,
		accept = "image/jpeg,image/png,image/webp,image/avif,image/gif",
		maxSizeBytes = 5 * 1024 * 1024,
		disabled = false,
		alt = m.lib_component_imageupload_default_alt(),
		id = undefined,
		name = undefined
	}: Props = $props();

	const fieldContext = getContext<fieldContextType | undefined>("field-context");
	const finalID = $derived(id ?? fieldContext?.fieldID);
	const finalName = $derived(name ?? fieldContext?.name);

	let inputElement: HTMLInputElement | undefined = $state();
	let dragActive = $state(false);
	let uploading = $state(false);
	let previewLoaded = $state(false);

	$effect(() => {
		if (!value) {
			previewLoaded = false;
			return;
		}
		previewLoaded = false;
		const img = new Image();
		img.src = value;
		if (img.complete) {
			previewLoaded = true;
		} else {
			img.onload = () => {
				previewLoaded = true;
			};
		}
	});

	async function handleFile(file: File) {
		if (!file.type.startsWith("image/")) {
			toast(
				m.lib_component_imageupload_unsupported_title(),
				m.lib_component_imageupload_unsupported_content(),
				"broken_image",
				4000,
				"danger"
			);
			return;
		}
		if (file.size > maxSizeBytes) {
			toast(
				m.lib_component_imageupload_too_large_title(),
				m.lib_component_imageupload_too_large_content({
					mb: Math.round(maxSizeBytes / (1024 * 1024))
				}),
				"broken_image",
				4000,
				"danger"
			);
			return;
		}

		uploading = true;
		try {
			const url = await onUpload(file);
			if (url) {
				value = url;
			} else {
				toast(
					m.lib_component_imageupload_failed_title(),
					m.lib_component_imageupload_failed_content(),
					"broken_image",
					4000,
					"danger"
				);
			}
		} catch {
			toast(
				m.lib_component_imageupload_failed_title(),
				m.lib_component_imageupload_failed_content(),
				"broken_image",
				4000,
				"danger"
			);
		} finally {
			uploading = false;
		}
	}

	function onInputChange(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (file) handleFile(file);
		(e.target as HTMLInputElement).value = "";
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		dragActive = false;
		if (disabled || uploading) return;
		const file = e.dataTransfer?.files?.[0];
		if (file) handleFile(file);
	}

	function openPicker() {
		if (disabled || uploading) return;
		inputElement?.click();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			openPicker();
		}
	}

	function clear(e: MouseEvent) {
		e.stopPropagation();
		value = null;
		onRemove?.();
	}
</script>

<input
	bind:this={inputElement}
	type="file"
	{accept}
	id={finalID}
	name={finalName}
	class={styles.hiddenInput}
	onchange={onInputChange}
	tabindex={-1} />

{#if value}
	<div class={styles.previewContainer}>
		{#if !previewLoaded}
			<Skeleton />
		{:else}
			<img in:fade={{ duration: 200 }} class={styles.previewImage} src={value} {alt} />
		{/if}
		<div class={styles.removeButton}>
			<IconButton
				icon="delete"
				appearance="danger"
				tip={m.lib_component_imageupload_remove_tip()}
				disabled={disabled || uploading}
				onclick={clear} />
		</div>
	</div>
{:else}
	<div
		role="button"
		tabindex="0"
		aria-label={m.lib_component_imageupload_upload_alt()}
		class="{styles.dropzone} {dragActive ? styles.dragOver : ''} {disabled
			? styles.state.disabled
			: styles.state.idle} {focusring}"
		onclick={openPicker}
		onkeydown={onKeydown}
		ondragover={(e) => {
			e.preventDefault();
			if (!disabled && !uploading) dragActive = true;
		}}
		ondragleave={() => (dragActive = false)}
		ondrop={onDrop}>
		{#if uploading}
			<Spinner size="medium" />
		{:else}
			<Icon icon="add_photo_alternate" size="giant" />
			<span>{m.lib_component_imageupload_click_or_drop()}</span>
		{/if}
	</div>
{/if}
