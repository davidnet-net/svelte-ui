import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { getFetch } from "$lib/utils";
import { authState } from "./identityEngine.svelte";

export async function enforceLegalAcceptance() {
	// 1. Alleen uitvoeren in de browser en als de gebruiker daadwerkelijk is ingelogd
	if (typeof window === "undefined" || !authState.isLoggedIn || import.meta.env.DEV) {
		return;
	}

	// 2. Skip de check op opgegeven domeinen
	const hostname = window.location.hostname;
	if (hostname === "account.davidnet.net" || hostname === "davidnet.net") {
		return;
	}

	// 3. Voorkom een oneindige redirect-loop als we al op de accept-pagina zijn
	if (window.location.pathname.startsWith("/legal/accept")) {
		return;
	}

	try {
		const legalRes = await getFetch(
			`${PUBLIC_BACKEND_URL}/legal/status`,
			undefined,
			undefined,
			true // true betekent dat de auth headers (Bearer) worden meegestuurd
		);

		if (legalRes && legalRes.success && legalRes.needsAcceptance) {
			console.debug("[identityEngine]: Nieuwe legal terms gevonden, redirect...");

			const currentUrl = window.location.href;
			window.location.href = `https://davidnet.net/legal/accept?continue=${encodeURIComponent(currentUrl)}`;
		}
	} catch (error) {
		console.error("[identityEngine]: Fout bij het controleren van legal status", error);
	}
}
