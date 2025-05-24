import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
    {
        files: ['**/*.{js,ts,svelte}'],
        ignores: ['node_modules/**', 'dist/**'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                extraFileExtensions: ['.svelte']
            }
        },
        plugins: {
            svelte: sveltePlugin,
            '@typescript-eslint': tsPlugin
        },
        rules: {
            'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
            'no-console': 'off',
            'eqeqeq': 'error',
            'curly': 'error',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'comma-dangle': ['error', 'never'],
            'no-trailing-spaces': 'error',
            'brace-style': ['error', '1tbs']
        }
    },
    {
        files: ['**/*.svelte'],
        processor: 'svelte/svelte',
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: tsParser
            }
        }
    }
];
