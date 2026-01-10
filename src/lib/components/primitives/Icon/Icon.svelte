<script lang="ts">
	import { fontState } from "../../../styles/themeManager.svelte.ts";
	import type { iconType } from "../../../types/Icon.ts";
	import { styles } from "./Icon.css.ts";

	interface Props {
		icon: iconType;
		size?: keyof typeof styles.size;
		color?: keyof typeof styles.color;
	}
	let { icon, size = "inherit", color = "inherit" }: Props = $props();
</script>

<span
	class="{styles.iconType.filled} {styles.size[size]} {styles.color[
		color
	]} {fontState.iconFontsLoaded ? styles.iconLoadedStyle : ''}"
	translate="no"
	aria-hidden="true"
>
	{icon}
</span>
