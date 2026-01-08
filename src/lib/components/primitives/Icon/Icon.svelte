<script lang="ts">
	import type { iconType } from "../../../types/Icon.ts";
	import { styles } from "./Icon.css.ts";

	interface Props {
		icon: iconType;
		size: keyof typeof styles.size;
	}
	let { icon, size }: Props = $props();
</script>

<span class="{styles.iconType.filled} {styles.size[size]}" translate="no" aria-hidden="true">
	{icon}
</span>
