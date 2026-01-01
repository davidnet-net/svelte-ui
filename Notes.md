CSS in TS
npm install @vanilla-extract/css @vanilla-extract/recipes @vanilla-extract/vite-plugin

vite
import { sveltekit } from '@sveltejs/kit/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
plugins: [
sveltekit(),
vanillaExtractPlugin() // Add this plugin
]
});
