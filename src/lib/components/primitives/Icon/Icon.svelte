<script lang="ts">
	import { fontState } from "$lib/engines/themeEngine.svelte";
	import type { iconType } from "$lib/types/Icon";

	import { styles } from "./Icon.css";

	interface Props {
		icon: iconType;
		size?: keyof typeof styles.size;
		color?: keyof typeof styles.color;
		type?: keyof typeof styles.iconType;
	}
	let { icon, size = "inherit", color = "inherit", type = "filled" }: Props = $props();
</script>

<span
	class="{styles.iconType[type]} {styles.size[size]} {styles.color[
		color
	]} {fontState.iconFontsLoaded ? styles.iconLoadedStyle : ''}"
	translate="no"
	aria-hidden="true">
	{icon}
</span>
