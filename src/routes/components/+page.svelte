<script lang="ts">
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import * as m from "$lib/paraglide/messages.js";

	import { styles } from "./page.css";
</script>

<Header
	heading={m.docs_page_components_header_heading()}
	paragraph={m.docs_page_components_header_paragraph()} />

<div class={styles.pageContainer}>
	<h2>{m.docs_page_components_subheading_primitives()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="/components/primitives/anchor"
			title="Anchor"
			description={m.docs_page_components_card_anchor_description()} />
		<Card
			href="/components/primitives/appshell"
			title="AppShell"
			description={m.docs_page_components_card_appshell_description()} />
		<Card
			href="/components/primitives/avatar"
			title="Avatar"
			description={m.docs_page_components_card_avatar_description()} />
		<Card
			href="/components/primitives/divider"
			title="Divider"
			description={m.docs_page_components_card_divider_description()} />
		<Card
			href="/components/primitives/flex"
			title="Flex"
			description={m.docs_page_components_card_flex_description()} />
		<Card
			href="/components/primitives/icon"
			title="Icon"
			description={m.docs_page_components_card_icon_description()} />
		<Card
			href="/components/primitives/codesnippet"
			title="CodeSnippet"
			description={m.docs_page_components_card_codesnippet_description()} />
	</Flex>

	<h2>{m.docs_page_components_subheading_input()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="/components/input/button"
			title="Button"
			description={m.docs_page_components_card_button_description()} />
		<Card
			href="/components/input/checkbox"
			title="Checkbox"
			description={m.docs_page_components_card_checkbox_description()} />
		<Card
			href="/components/input/dropdown"
			title="Dropdown"
			description={m.docs_page_components_card_dropdown_description()} />
		<Card
			href="/components/input/iconbutton"
			title="IconButton"
			description={m.docs_page_components_card_iconbutton_description()} />
		<Card
			href="/components/input/iconlinkbutton"
			title="IconLinkButton"
			description={m.docs_page_components_card_iconlinkbutton_description()} />
		<Card
			href="/components/input/linkbutton"
			title="LinkButton"
			description={m.docs_page_components_card_linkbutton_description()} />
		<Card
			href="/components/input/textarea"
			title="TextArea"
			description={m.docs_page_components_card_textarea_description()} />
		<Card
			href="/components/input/textfield"
			title="TextField"
			description={m.docs_page_components_card_textfield_description()} />
	</Flex>

	<h2>{m.docs_page_components_subheading_loading()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="/components/loading/skeleton"
			title="Skeleton"
			description={m.docs_page_components_card_skeleton_description()} />
		<Card
			href="/components/loading/spinner"
			title="Spinner"
			description={m.docs_page_components_card_spinner_description()} />
	</Flex>

	<h2>{m.docs_page_components_subheading_messaging()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="/components/messaging/banner"
			title="Banner"
			description={m.docs_page_components_card_banner_description()} />
		<Card
			href="/components/messaging/keyboardtip"
			title="KeyboardTip"
			description={m.docs_page_components_card_keyboardtip_description()} />
		<Card
			href="/components/messaging/modal"
			title="Modal"
			description={m.docs_page_components_card_modal_description()} />
		<Card
			href="/components/messaging/toast"
			title="Toast"
			description={m.docs_page_components_card_toast_description()} />
		<Card
			href="/components/messaging/toaster"
			title="Toaster"
			description={m.docs_page_components_card_toaster_description()} />
		<Card
			href="/components/messaging/visuallyhidden"
			title="VisuallyHidden"
			description={m.docs_page_components_card_visuallyhidden_description()} />
	</Flex>

	<h2>{m.docs_page_components_subheading_overlays()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="/components/overlays/blanket"
			title="Blanket"
			description={m.docs_page_components_card_blanket_description()} />
		<Card
			href="/components/overlays/tooltip"
			title="Tooltip"
			description={m.docs_page_components_card_tooltip_description()} />
	</Flex>
</div>
