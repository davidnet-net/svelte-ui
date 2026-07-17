<script>
	import { setContext } from "svelte";

	// Allow two-way binding so the parent can control or read the active tab
	let { selected = $bindable(), children } = $props();

	// Share a reactive getter/setter object with all child components
	setContext("tabs", {
		get selected() {
			return selected;
		},
		set selected(val) {
			selected = val;
		}
	});
</script>

<div class="design-system-tabs">
	{@render children()}
</div>
