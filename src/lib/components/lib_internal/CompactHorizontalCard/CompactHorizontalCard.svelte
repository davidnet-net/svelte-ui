<script lang="ts">
	import { Anchor, Icon, type iconType } from "$lib";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	import { styles } from "./CompactHorizontalCard.css";
	import { focusring } from "$lib/styles";

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
			<Icon size="huge" {icon} />
		</div>
		<div class={styles.contentContainer}>
			<h3>{title}</h3>
			{description}
		</div>
	</div>
</Anchor>
