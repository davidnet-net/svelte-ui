<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import Dropdown from "$lib/components/input/Dropdown/Dropdown.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";

	import * as styles from "./page.css";

	let testDropdownOpen = $state(false);
	let testDropdownOpen2 = $state(false);
</script>

<Header heading="Dropdown" paragraph="A dropdown displays a list of options for selection." />

<div class={styles.pageContainer}>
	<Dropdown isOpen={testDropdownOpen}>
		{#snippet trigger()}
			<Button
				onclick={() => {
					testDropdownOpen = !testDropdownOpen;
				}}
				appearance="discover">
				Open or close
			</Button>
		{/snippet}
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
	</Dropdown>

	<Dropdown isOpen={testDropdownOpen2}>
		{#snippet trigger()}
			<Button
				onclick={() => {
					testDropdownOpen2 = !testDropdownOpen2;
				}}
				appearance="discover">
				large
			</Button>
		{/snippet}
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
		<Button appearance="subtle">Test 1</Button>
		<Button appearance="subtle">Test 2</Button>
	</Dropdown>
</div>
