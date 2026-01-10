<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import Skeleton from "$lib/components/loading/Skeleton/Skeleton.svelte";
	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import KeyboardTip from "$lib/components/messaging/KeyboardTip/KeyboardTip.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";

	import { useShortcut } from "../lib/engines/shortcutEngine.svelte.ts";

	function helpFunc() {
		alert("help");
	}
	const helpShortcut = useShortcut("shift+?", helpFunc, { preventDefault: false });
</script>

<div style="padding: 3rem">
	<Flex>
		<Button onclick={() => console.log("click")} iconbefore="add" appearance="primary"
			>Board aanmaken</Button
		>
		<Button onclick={() => console.log("click")} loading>Aanpassen</Button>
		<Button onclick={() => console.log("click")} disabled>Disabled</Button>
		<LinkButton opennewtab href="https://davidnet.net">LinkButton</LinkButton>
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
	<br />
	<KeyboardTip keyboardTip={helpShortcut.keys} />
</div>
