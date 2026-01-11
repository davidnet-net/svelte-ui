<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import Skeleton from "$lib/components/loading/Skeleton/Skeleton.svelte";
	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import KeyboardTip from "$lib/components/messaging/KeyboardTip/KeyboardTip.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";

	import { getShortcuts, useShortcut } from "../lib/engines/shortcutEngine.svelte.ts";

	function helpFunc() {
		alert("help");
	}
	const helpShortcut = useShortcut("shift+?", helpFunc, {
		preventDefault: false,
		name: "Help",
		description: "Shows the help alert"
	});

	// Extra shortcuts requested
	const boomShortcut = useShortcut("ctrl+b", () => alert("Boom!"), {
		name: "Self Destruct",
		description: "Triggers a fake explosion",
		preventDefault: true
	});

	const refreshShortcut = useShortcut("alt+r", () => alert("Refresh!"), {
		name: "Refresh",
		description: "Fake refresh action",
		preventDefault: true
	});

	// Dynamic shortcut registration test
	let dynamicCombo = $state("");
	useShortcut(
		() => dynamicCombo,
		() => alert("Dynamic shortcut triggered!"),
		{
			name: "Dynamic Action",
			description: "This shortcut is registered on demand via the test button"
		}
	);

	function toggleDynamic() {
		dynamicCombo = dynamicCombo === "ctrl+d" ? "" : "ctrl+d";
	}

	// Reactive list of all registered shortcuts
	let shortcuts = $derived(getShortcuts());
</script>

<div style="padding: 3rem">
	<Flex>
		<Button onclick={() => console.log("click")} iconbefore="add" appearance="primary"
			>Board aanmaken</Button
		>
		<Button onclick={() => console.log("click")} loading>Aanpassen</Button>
		<Button onclick={() => console.log("click")} disabled>Disabled</Button>
		<LinkButton opennewtab href="https://davidnet.net">LinkButton</LinkButton>

		<Button onclick={toggleDynamic} appearance={dynamicCombo ? "primary" : "subtle"}>
			{dynamicCombo ? "Disable Ctrl+D" : "Enable Ctrl+D"}
		</Button>
	</Flex>

	<Loader size="xhuge" />
	<br />
	<Loader size="huge" />
	<br />
	<Loader size="xlarge" />
	<br />
	<Loader size="large" />
	<br />
	<Loader size="medium" />
	<br />
	<Loader size="small" />
	<br />
	<Skeleton height="50px" />

	<div style="display: flex; gap: 8px; margin-top: 1rem;">
		<IconButton
			appearance="danger"
			tip="Delete card from list"
			icon="delete_forever"
			onclick={() => {
				alert("Alles ontploft");
			}}
		/>
		<IconButton
			keyboardTip={helpShortcut.keys}
			tip="About tooltips"
			onclick={() => helpFunc()}
			icon="help"
		/>
		<IconButton
			keyboardTip={boomShortcut.keys}
			tip={boomShortcut.original}
			onclick={() => alert("Boom!")}
			icon="explosion"
		/>
		<IconButton
			keyboardTip={refreshShortcut.keys}
			tip={refreshShortcut.original}
			onclick={() => alert("Refresh!")}
			icon="refresh"
		/>
	</div>

	<h3>Registered Keybinds:</h3>
	<div style="display: grid; grid-template-columns: auto auto 1fr; gap: 1rem; max-width: 600px;">
		{#each shortcuts as shortcut, i (i)}
			{#if shortcut.id}
				<div style="font-weight: bold;">
					<KeyboardTip keyboardTip={shortcut.display} />
				</div>
				<div>{shortcut.name || "Unnamed"}</div>
				<div style="color: #666;">{shortcut.description || ""}</div>
			{/if}
		{/each}
	</div>
</div>
