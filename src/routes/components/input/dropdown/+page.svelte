<script lang="ts">
	import Button from "$lib/components/input/Button/Button.svelte";
	import Dropdown from "$lib/components/input/Dropdown/Dropdown.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import * as m from "$lib/paraglide/messages.js";

	import * as styles from "./page.css";

	let testDropdownOpen = $state(false);
	let testDropdownOpen2 = $state(false);
</script>

<Header heading={m.docs_page_name_dropdown()} paragraph={m.docs_page_components_card_dropdown_description()} />

<div class={styles.pageContainer}>
	<Dropdown isOpen={testDropdownOpen}>
		{#snippet trigger()}
			<Button
				onclick={() => {
					testDropdownOpen = !testDropdownOpen;
				}}
				appearance="discover">
				{m.docs_page_dropdown_open_close()}
			</Button>
		{/snippet}
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
	</Dropdown>

	<Dropdown isOpen={testDropdownOpen2}>
		{#snippet trigger()}
			<Button
				onclick={() => {
					testDropdownOpen2 = !testDropdownOpen2;
				}}
				appearance="discover">
				{m.docs_page_dropdown_large()}
			</Button>
		{/snippet}
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_1()}</Button>
		<Button appearance="subtle">{m.docs_page_dropdown_test_2()}</Button>
	</Dropdown>
</div>
