<!--TODO: Set URL for fonts to design.davidnet.net or an other CDN
-->

<script lang="ts">
    import { onMount } from "svelte";

    export let defaultTheme: string = "light";
    export let HideMenu: boolean = true;
    let currentTheme = defaultTheme;

    const THEME_KEY = "theme";

    function getStoredTheme(): string | null {
        return localStorage.getItem(THEME_KEY);
    }

    function setStoredTheme(theme: string) {
        localStorage.setItem(THEME_KEY, theme);
    }

    function applyTheme(theme: string) {
        const url = new URL(`../../themes/gen/${theme}.css`, import.meta.url).href;

        let link = document.getElementById("theme-css") as HTMLLinkElement | null;
        if (link) link.remove();

        link = document.createElement("link");
        link.id = "theme-css";
        link.rel = "stylesheet";
        link.href = url;
        document.head.appendChild(link);
    }

    function changeTheme(theme: string) {
        currentTheme = theme;
        setStoredTheme(theme);
        applyTheme(theme);
    }

    function LoadFonts() {
        const remoteUrl = "https://design.davidnet.net/fonts/fonts.css";
        const localUrl = "/fonts/fonts.css";

        let link = document.getElementById("fonts-css") as HTMLLinkElement | null;
        if (link) link.remove();

        link = document.createElement("link");
        link.id = "fonts-css";
        link.rel = "stylesheet";
        link.href = remoteUrl;

        // Fallback als laden remote css mislukt
        link.onerror = () => {
            console.warn(
                `Assuming in dev environment, Could not load design.davidnet.net fonts, Falling back to local.`
            );
            link?.remove();

            // Voeg fallback link toe
            const fallbackLink = document.createElement("link");
            fallbackLink.id = "fonts-css";
            fallbackLink.rel = "stylesheet";
            fallbackLink.href = localUrl;
            document.head.appendChild(fallbackLink);
        };

        document.head.appendChild(link);
    }

    onMount(() => {
        const saved = getStoredTheme();
        currentTheme = saved ?? defaultTheme;
        applyTheme(currentTheme);
        LoadFonts();
    });
</script>

{#if !HideMenu}
    <select
        bind:value={currentTheme}
        on:change={(e) => changeTheme((e.target as HTMLSelectElement).value)}
    >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
{/if}