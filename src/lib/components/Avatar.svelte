<script lang="ts">
	import { goto } from "$app/navigation";
	import { IconButton, IconDropdown, LinkIconButton } from "$lib/index.js";

	export let src: string | null = null;
	export let owner = false;
	export let id: string | null = null;
	export let name: string | null = null;
	export let presence: "online" | "offline" | "busy" | "focus" | null = null;
	export let admin: boolean = false;
</script>

<div class="avatar-wrapper">
	<div class="avatar">
		{#if owner && src && id}
			<IconDropdown
				appearance="subtle"
				icon={src}
				alt="Your profile."
				hidearrow
				roundimage
				actions={[
					{
						label: "View profile",
						onClick: () => {
							window.location.href = "https://account.davidnet.net/profile/" + id;
						}
					},
					{
						label: "Manage account",
						onClick: () => {
							window.location.href = "https://account.davidnet.net/";
						}
					},
					{
						label: "Change presence",
						onClick: () => {
							//
						}
					},
					...(admin
						? [
								{
									label: "Admin",
									onClick: () => goto("/admin")
								}
							]
						: []),
					{
						label: "Help & Support",
						onClick: () => {
							window.location.href = "https://davidnet.net/help/";
						}
					},
					{
						label: "Notifications",
						onClick: () => {
							window.location.href = "https://account.davidnet.net/notifications/";
						}
					},
					{
						label: "Log out",
						onClick: () => {
							window.location.href = "https://account.davidnet.net/logout/";
						}
					}
				]}
			/>
		{:else if src && id && name}
			<LinkIconButton alt="{name}'s profile" href="https://account.davidnet.net/profile/{id}" icon={src} roundimage anonymous />
		{:else}
			<IconButton loading alt="Avatar loading" onClick={() => {}} icon="no_accounts" />
		{/if}
	</div>
	{#if presence}
		<span class="presence-dot {presence}"> </span>
	{/if}
</div>

<style>
	.avatar-wrapper {
		position: relative;
		display: inline-block;
	}

	.avatar {
		margin: 0rem var(--token-space-2);
	}

	.presence-dot {
		position: absolute;
		bottom: 5px;
		right: 15px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		border: 1px solid var(--token-color-text-default-normal);
		background-color: green;
	}

	.presence-dot.online {
		background-color: #22c55e; /* green */
	}
	.presence-dot.busy {
		background-color: #ef4444; /* red */
	}
	.presence-dot.focus {
		background-color: #f59e0b; /* yellow */
	}
	.presence-dot.offline {
		background-color: #9ca3af; /* gray */
	}
</style>
