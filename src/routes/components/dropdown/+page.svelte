<script>
	import Button from "$lib/components/input/Button/Button.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
</script>

<Flex direction="column" alignItems="center" justifyContent="center">
	<div class="dropdown-wrapper">
		<Button
			appearance="default"
			onclick={() => {
				console.log("");
			}}
			iconafter="keyboard_arrow_down">
			Open dropdown
		</Button>
	</div>
</Flex>
