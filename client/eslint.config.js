import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';

export default [
  pluginJs.configs.recommended,
  eslintReact.configs.flat.recommended,
  prettierPlugin,
  {
    plugins: {
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
    },
  },
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  {
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: eslintReact.configs.recommended.parserOptions,
    },
  },
  {
    ignores: ['node_modules', 'public', 'build', 'coverage'],
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
      'prefer-destructuring': ['error', { array: true, object: true }],
      'no-unused-vars': 'warn',
      'no-import-assign': 'error',
      camelcase: ['error', { ignoreDestructuring: true, properties: 'never' }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prettier/prettier': ['error', { singleQuote: true }],
    },
  },
];
