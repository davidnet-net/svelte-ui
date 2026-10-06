<script lang="ts">
	import { page } from "$app/state";
	import { Icon } from "$lib";
	import Button from "$lib/components/input/Button/Button.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import * as m from "$lib/paraglide/messages.js";
	import { token } from "$lib/styles/designTokens";

	import { styles } from "./error.css";
</script>

<svelte:head>
	<title>{m.docs_page_error_title({ message: page.error?.message ?? "" })}</title>
</svelte:head>

<div class={styles.pageContainer}>
	{#if page.status === 404}
		<div class={styles.backgroundContainer}>
			<div class={styles.background}>
				<div class={styles.iconBackground}>
					<Icon icon="not_listed_location" size="inherit" color="danger" />
				</div>
				{#if !appState.isMobile}
					<h1 class={styles.errorHeader}>{page.error?.message}</h1>
				{/if}
			</div>
		</div>
		{#if appState.isMobile}
			<h1
				style="transform: translateY(-6vw); padding-bottom: {token.global.spacing.large};"
				class={styles.errorHeader}>
				{page.error?.message}
			</h1>
		{/if}
		<div class={styles.buttonContainer}>
			<Button appearance="primary" iconbefore="arrow_back" onclick={() => history.back()}>
				{m.docs_common_back()}
			</Button>
			<LinkButton href="/">{m.docs_common_home()}</LinkButton>
		</div>
	{:else}
		<div class={styles.backgroundContainer}>
			<div class={styles.background}>
				<div class={styles.iconBackground}>
					<Icon icon="release_alert" size="inherit" color="danger" />
				</div>
				{#if !appState.isMobile}
					<h1 class={styles.errorHeader}>{page.error?.message}</h1>
				{/if}
			</div>
		</div>
		{#if appState.isMobile}
			<h1
				style="transform: translateY(-6vw); padding-bottom: {token.global.spacing.large};"
				class={styles.errorHeader}>
				{page.error?.message}
			</h1>
		{/if}
		<div class={styles.buttonContainer}>
			<Button iconbefore="arrow_back" onclick={() => history.back()}>{m.docs_common_back()}</Button>
			<Button appearance="primary" onclick={() => window.location.reload()}
				>{m.docs_common_reload()}</Button>
			<LinkButton href="/">{m.docs_common_home()}</LinkButton>
		</div>
	{/if}
</div>
