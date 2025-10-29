	<!-- DECEPERATED DO NOT USE -->
	<!-- DECEPERATED DO NOT USE -->
	<!-- DECEPERATED DO NOT USE -->
	<!-- DECEPERATED DO NOT USE -->
	<!-- DECEPERATED DO NOT USE -->
	 
<script lang="ts">
	export let direction: "column" | "row" | "column-reverse" | "row-reverse" = "column";
</script>

<div style="flex-direction: {direction};">
	<slot />
</div>

<style>
	div {
		display: flex;
		height: 100%;
		width: 100%;
	}
</style>
