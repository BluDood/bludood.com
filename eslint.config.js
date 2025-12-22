import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['node_modules/', 'build/', '.svelte-kit/']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    rules: {
      'svelte/no-navigation-without-resolve': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'svelte/require-each-key': 'off'
    }
  }
])
