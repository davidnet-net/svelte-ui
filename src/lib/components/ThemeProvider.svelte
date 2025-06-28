<script lang="ts">
  import { onMount } from 'svelte';

  export let defaultTheme: string = 'light';
  export const HideMenu: boolean = true;
  let currentTheme = defaultTheme;

  const THEME_KEY = 'theme';

  function getStoredTheme(): string | null {
    return localStorage.getItem(THEME_KEY);
  }

  function setStoredTheme(theme: string) {
    localStorage.setItem(THEME_KEY, theme);
  }

  function applyTheme(theme: string) {
    const url = new URL(`../../themes/gen/${theme}.css`, import.meta.url).href;

    let link = document.getElementById('theme-css') as HTMLLinkElement | null;
    if (link) link.remove();

    link = document.createElement('link');
    link.id = 'theme-css';
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }

  function changeTheme(theme: string) {
    currentTheme = theme;
    setStoredTheme(theme);
    applyTheme(theme);
  }

  onMount(() => {
    const saved = getStoredTheme();
    currentTheme = saved ?? defaultTheme;
    applyTheme(currentTheme);
  });
</script>

{#if HideMenu}
  <select bind:value={currentTheme} on:change={(e) => changeTheme((e.target as HTMLSelectElement).value)}>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
{/if}
