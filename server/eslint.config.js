const globals = require('globals');
const pluginJs = require('@eslint/js');
const eslintPluginPrettier = require('eslint-plugin-prettier/recommended');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    plugins: {
      pluginJs: pluginJs.configs.recommended,
      prettier: eslintPluginPrettier,
    },
  },
  {
    ignores: ['node_modules', 'public', 'build', 'coverage'],
  },
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    rules: {
      'no-unused-vars': 'warn',
      camelcase: ['error', { ignoreDestructuring: true, properties: 'never' }],
      'prefer-const': [
        'error',
        { destructuring: 'any', ignoreReadBeforeAssign: false },
      ],
      'capitalized-comments': ['error', 'always'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-destructuring': ['error', { array: true, object: true }],
    },
  },
];
