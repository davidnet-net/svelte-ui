<script lang="ts">
	import { Blanket } from "$lib/components/overlays";
	import { focusTrap, shortcutTrap, useShortcut } from "$lib/engines";

	let isOpen = $state(false);

	function onclose() {
		isOpen = false;
	}

	function open() {
		isOpen = true;
	}

	// 1. Global shortcut to OPEN the palette (active only when closed)
	useShortcut("ctrl+k", open, {
		name: "Open Command Palette",
		preventDefault: true,
		active: () => !isOpen
	});

	// 2. Local shortcut to CLOSE the palette with Escape (active only when open)
	useShortcut("escape", onclose, {
		name: "Close Command Palette",
		preventDefault: true,
		active: () => isOpen
	});

	// 3. Mobile back button and history state management when open
	$effect(() => {
		if (!isOpen) return;

		history.pushState({ commandPaletteOpen: true }, "");

		const handlePopState = () => {
			isOpen = false;
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
			if (history.state?.commandPaletteOpen) {
				history.back();
			}
		};
	});
</script>

{#if isOpen}
	<Blanket onclick={onclose}>
		<div use:focusTrap={true} use:shortcutTrap role="dialog" aria-modal="true"></div>
	</Blanket>
{/if}
