<script>
	import Button from "$lib/components/input/Button/Button.svelte";
	import Dropdown from "$lib/components/input/Dropdown/Dropdown.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";

	let dropdownOpen = $state(false);
</script>

<Flex direction="column" alignItems="center" justifyContent="center">
	<Dropdown isOpen={dropdownOpen}>
		{#snippet trigger()}
			<Button
				appearance="default"
				selected={dropdownOpen}
				onclick={() => {
					dropdownOpen = !dropdownOpen;
				}}
				iconafter="keyboard_arrow_down">
				{dropdownOpen ? "Close" : "Open"} dropdown
			</Button>
		{/snippet}
		<Button
			appearance="subtle"
			onclick={() => {
				dropdownOpen = !dropdownOpen;
			}}
			iconafter="keyboard_arrow_down">
			Close dropdown
		</Button>
		<Button
			appearance="subtle"
			onclick={() => {
				dropdownOpen = !dropdownOpen;
			}}
			iconafter="keyboard_arrow_down">
			Close dropdown
		</Button>
		<Button
			appearance="subtle"
			onclick={() => {
				dropdownOpen = !dropdownOpen;
			}}
			iconafter="keyboard_arrow_down">
			Close dropdown
		</Button>
		<Button
			appearance="subtle"
			onclick={() => {
				dropdownOpen = !dropdownOpen;
			}}
			iconafter="keyboard_arrow_down">
			Close dropdown
		</Button>
		<Button
			appearance="subtle"
			onclick={() => {
				dropdownOpen = !dropdownOpen;
			}}
			iconafter="keyboard_arrow_down">
			Close dropdown
		</Button>
	</Dropdown>
</Flex>
