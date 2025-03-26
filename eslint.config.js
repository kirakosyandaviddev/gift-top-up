import {defineConfig} from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
  {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {globals: globals.browser},
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {js},
    extends: ['plugin:react/recommended', 'standard-with-typescript'],
    rules: {
      quotes: [
        'error',
        'single',
        {avoidEscape: true, allowTemplateLiterals: true},
      ],

      'react/jsx-quotes': ['error', 'double'],
      'import/imports-first': 'error',
      'object-curly-spacing': ['error', 'never'],
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      quotes: 'off',
      'react/jsx-quotes': ['error', 'double'],
    },
  },
]);
