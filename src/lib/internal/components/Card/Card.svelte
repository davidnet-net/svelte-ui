<script lang="ts">
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import type { iconType } from "$lib/types/Icon.ts";

	import { styles } from "./Card.css.ts";

	interface Props {
		title: string;
		description?: string;
		href: string;
		download?: boolean;
		icon?: iconType;
		//image?: string;
		//darkimage?: string;
		external?: boolean;
	}

	let {
		title,
		description = "",
		href,
		download = false,
		external = false,
		icon = "indeterminate_question_box"
	}: Props = $props();
</script>

<Anchor {href} download={download || undefined} {external}>
	<div class={styles.baseCard}>
		<div class={styles.illustrationContainer}>
			<Icon size="xhuge" {icon} />
		</div>
		<div class={styles.contentContainer}>
			<h3>{title}</h3>
			{description}
		</div>
	</div>
</Anchor>
