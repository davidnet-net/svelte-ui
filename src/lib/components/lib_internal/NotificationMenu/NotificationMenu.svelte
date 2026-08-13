<script lang="ts">
	import { Flex } from "$lib/components/primitives";
	import { token } from "$lib/styles/designTokens";
	import { m as library_messages } from "$lib/paraglide/messages.js";
</script>

<div style="width: 100%; margin: {token.global.spacing.small}">
	<Flex width="fit-content" direction="column" gap="small">
		<span>{library_messages.lib_component_notification_menu_empty()}</span>
	</Flex>
</div>
