<script lang="ts">
	import Header from "$lib/internal/components/Header/Header.svelte";
	import TokenTree from "$lib/internal/components/TokenTree/TokenTree.svelte";

	import { token } from "../../../../lib/styles/designTokens.ts";
	import * as m from "../../../../paraglide/messages.js";
	import { styles } from "./page.css.ts";

	console.log(token);
</script>

<Header
	heading={m.page_design_tokens_libary_header_heading()}
	paragraph={m.page_design_tokens_libary_header_paragraph()} />

<div class={styles.pageContainer}>
	<h2>{m.page_foundations_subheading_design_tokens()}</h2>
	<TokenTree node={token} />
</div>
