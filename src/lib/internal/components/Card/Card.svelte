<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";

	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import { focusring } from "$lib/styles/global.css";
	import type { iconType } from "$lib/types/Icon.ts";

	import { styles } from "./Card.css";

	interface Props extends HTMLAnchorAttributes {
		title: string;
		description?: string;
		icon?: iconType;
		//image?: string;
		//darkimage?: string;
		external?: boolean;
	}

	let {
		title,
		description = "",
		external = false,
		icon = "indeterminate_question_box",
		...rest
	}: Props = $props();
</script>

<Anchor {external} {...rest}>
	<div class="{styles.baseCard} {focusring}">
		<div class={styles.illustrationContainer}>
			<Icon size="xhuge" {icon} />
		</div>
		<div class={styles.contentContainer}>
			<h3>{title}</h3>
			{description}
		</div>
	</div>
</Anchor>
