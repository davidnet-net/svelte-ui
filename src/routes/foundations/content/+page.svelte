<script lang="ts">
	import Header from "$lib/internal/components/Header/Header.svelte";
	import NavigationData from "$lib/internal/components/NavigationData.svelte";
	import * as m from "$lib/paraglide/messages.js";

	import { styles } from "./page.css.ts";
</script>

<NavigationData />

<Header
	heading={m.docs_page_foundations_content_header_heading()}
	paragraph={m.docs_page_foundations_content_header_paragraph()} />

<div class={styles.pageContainer}></div>
