<script lang="ts">
	export let direction: "column" | "row" | "column-reverse" | "row-reverse" = "column";
	export let gap: string = "0px";
	export let height: string = "fit-content";
	export let width: string = "fit-content";
	export let justifycontent: string = "center";
	export let alignitems: string = "center";
	export let wrap: "nowrap" | "wrap" | "wrap-reverse" = "nowrap";
	export let overflowX: "visible" | "hidden" | "scroll" | "auto" = "visible";
	export let overflowY: "visible" | "hidden" | "scroll" | "auto" = "visible";
	export let flex: string | undefined = undefined;
</script>

<div
	class={$$props.class}
	style="
		display: flex;
		flex-direction: {direction};
		gap: {gap};
		height: {height};
		width: {width};
		justify-content: {justifycontent};
		align-items: {alignitems};
		flex-wrap: {wrap};
		overflow-x: {overflowX};
		overflow-y: {overflowY};
		{flex ? `flex: ${flex};` : ''}
	"
>
	<slot />
</div>
