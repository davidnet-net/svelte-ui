<script lang="ts">
	export let direction: "column" | "row" | "column-reverse" | "row-reverse" = "column";
	export let gap: string = "0px";
	export let height: string = "fit-content";
	export let width: string = "fit-content";
	export let justifycontent: string = "center";
	export let alignitems: string = "center";
	export let overflow: "visible" | "hidden" | "scroll" | "auto" = "visible";
	export let wrap: "nowrap" | "wrap" | "wrap-reverse" = "nowrap";
</script>

<div
	style="
		display: flex;
		flex-direction: {direction};
		gap: {gap};
		height: {height};
		width: {width};
		justify-content: {justifycontent};
		align-items: {alignitems};
		overflow: {overflow};
		flex-wrap: {wrap};
	"
>
	<slot />
</div>
