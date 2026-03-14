<script lang="ts">
	import Header from "$lib/internal/components/Header/Header.svelte";
	import NavigationData from "$lib/internal/components/NavigationData.svelte";
	import TokenTree from "$lib/internal/components/TokenTree/TokenTree.svelte";

	import { token } from "../../../../lib/styles/designTokens.ts";
	import * as m from "../../../../paraglide/messages.js";
	import { styles } from "./page.css.ts";

	console.log(token);
</script>

<NavigationData />

<Header
	heading={m.docs_page_design_tokens_library_header_heading()}
	paragraph={m.docs_page_design_tokens_library_header_paragraph()} />

<div class={styles.pageContainer}>
	<h2>{m.docs_page_foundations_subheading_design_tokens()}</h2>
	<TokenTree node={token} />
</div>
