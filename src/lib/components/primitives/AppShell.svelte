<script lang="ts">
	import { currentTheme, setTheme } from '../../styles/themeManager.svelte.ts';
	import type { Snippet } from "svelte";
	import "$lib/styles/reset.css.ts";

	// Props
	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="appshell {currentTheme.themeObject}">
	{@render children()}

	<button onclick={()=>{
		setTheme("dark");
	}}>dark</button>

	<button onclick={()=>{
		setTheme("light");
	}}>light</button>
</div>
