// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    // Pre .ts a .js súbory
    files: ['**/*.{js,mjs,ts,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-undef': 'off'
    },
  },

  {
    // Pre Vue súbory
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser, // <script setup lang="ts"> sa spracuje cez TS parser
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': ts,
    },
    rules: {
      ...pluginVue.configs['flat/recommended'].rules,
      ...ts.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/!www/**',  'src/env.d.ts']),

  skipFormatting,
])
