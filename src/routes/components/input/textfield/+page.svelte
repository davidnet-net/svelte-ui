<script lang="ts">
	import Field from "$lib/components/input/Field/Field.svelte";
	import TextField from "$lib/components/input/TextField/TextField.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
</script>

<Header heading="TextField" paragraph="A textfield allows entering single-line text." />

<Flex alignItems="center" justifyContent="center" height="100%">
	<Flex width="300px" height="fit-content">
		<Field required label="Password:" name="password" invalid={undefined}>
			<TextField placeholder="Enter your password" type="password" disabled={false} />
		</Field>
	</Flex>
</Flex>
