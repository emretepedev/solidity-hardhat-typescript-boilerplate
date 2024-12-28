/** @type {import('eslint').Linter} */
module.exports = {
  env: {
    browser: false,
    es2020: true,
    mocha: true,
    node: true,
  },

  root: true,

  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },

  plugins: ['@typescript-eslint', 'json', 'promise', 'import', 'prettier'],

  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:json/recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'node/no-missing-import': 'off',
    'node/no-unpublished-import': 'off',
    'prettier/prettier': 'warn',
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'sort-vars': ['warn', { ignoreCase: true }],
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
  },

  overrides: [
    {
      files: '**/*.js',
      rules: {
        'node/no-unpublished-require': 'off',
        'node/no-missing-require': 'off',
      },
    },
  ],

  ignorePatterns: ['dist', '**/*.d.ts'],
};
