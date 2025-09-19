// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname, // makes relative paths work
});

export default [
  js.configs.recommended,

  // bring in airbnb-base (old style) into flat config
  ...compat.extends('airbnb-base'),

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // your overrides
      'no-console': 'off',
      'no-plusplus': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
    },
  },
];
