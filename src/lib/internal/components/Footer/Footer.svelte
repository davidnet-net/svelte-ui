<script lang="ts">
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";

	import { m } from "../../../../paraglide/messages.js";
	import { styles } from "./Footer.css.ts";
</script>

<footer class={styles.baseFooter}>
	<div class={styles.content}>
		<p class={styles.brand}>Davidnet Design System</p>
		<br />
		<Flex direction="row" width="100%" gap="large">
			<Flex direction="column" gap="small" width="auto">
				<h2 class={styles.heading}>{m.footer_get_started()}</h2>
				<Anchor class={styles.footerLink} href="/foundations">
					{m.page_card_foundations_title()}
				</Anchor>
				<Anchor class={styles.footerLink} href="/components">
					{m.page_card_components_title()}
				</Anchor>
				<Anchor class={styles.footerLink} href="/tools">
					{m.page_card_tools_title()}
				</Anchor>
			</Flex>
		</Flex>
	</div>
	<div class={styles.legal}>
		<Flex width="100%" direction="row" justifyContent="spaceBetween">
			<small>
				&copy; 2025-{new Date().getFullYear()}
				<Anchor href="https://davidnet.net">Davidnet</Anchor>
			</small>
			<Flex width="fit-content" direction="row" gap="medium">
				<small style="vertical-align: middle">
					<Anchor opennewtab href="https://davidnet.net/help">
						{m.footer_help()}
						<Icon icon="open_in_new" />
					</Anchor>
				</small>
				<small style="vertical-align: middle">
					<Anchor opennewtab href="https://davidnet.net/help/contact">
						{m.footer_contact()}
						<Icon icon="open_in_new" />
					</Anchor>
				</small>
				<small style="vertical-align: middle">
					<Anchor opennewtab href="https://github.com/davidnet-net/svelte-ui/blob/main/LICENSE">
						{m.footer_license()}
						<Icon icon="open_in_new" />
					</Anchor>
				</small>
				<small style="vertical-align: middle">
					<Anchor opennewtab href="https://davidnet.net/legal">
						{m.footer_policies()}
						<Icon icon="open_in_new" />
					</Anchor>
				</small>
			</Flex>
		</Flex>
	</div>
</footer>
