<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import Skeleton from "$lib/components/loading/Skeleton/Skeleton.svelte";
	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
</script>

<div style="padding: 3rem">
	<Flex>
		<Button onclick={() => {}} iconbefore="add" appearance="primary">Board aanmaken</Button>
		<Button onclick={() => {}} loading>Aanpassen</Button>
		<Button onclick={() => {}} disabled>Disabled</Button>
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
	<IconButton tip="yapper" icon="home" onclick={() => {}} />
</div>
