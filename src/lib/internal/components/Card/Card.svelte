<script lang="ts">
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";

	import { styles } from "./Card.css.ts";

	interface Props {
		title: string;
		description?: string;
		href: string;
	}

	let { title, description = "", href }: Props = $props();
</script>

<Anchor {href}>
	<div class={styles.baseCard}>
		<div class={styles.illustrationContainer}>
			<Icon size="xhuge" icon="indeterminate_question_box" />
		</div>
		<div class={styles.contentContainer}>
			<h3>{title}</h3>
			{description}
		</div>
	</div>
</Anchor>
