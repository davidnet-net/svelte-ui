<script lang="ts">
	import { Flex } from "$lib/components/primitives";
	import { token } from "$lib/styles/designTokens";
</script>

<div style="width: 100%; margin: {token.global.spacing.small}">
	<Flex width="fit-content" direction="column" gap="small">
		<span>You do not have any notifications!</span>
	</Flex>
</div>
