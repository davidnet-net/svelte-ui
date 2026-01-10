<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Loader from "$lib/components/primitives/Spinner/Spinner.svelte";
	import Skeleton from "$lib/components/primitives/Skeleton/Skeleton.svelte";

	//import { token } from "../lib/styles/designTokens.ts";
</script>

<div style="padding: 3rem">
	<Flex>
		<Button iconbefore="add" appearance="primary">Board aanmaken</Button>
		<Button loading>Aanpassen</Button>
		<Button disabled>Disabled</Button>
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
</div>
