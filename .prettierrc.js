require('dotenv').config();

const { SOLC_VERSION } = process.env;

module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  bracketSameLine: false,
  printWidth: 80,
  useTabs: false,
  quoteProps: 'as-needed',
  plugins: ['prettier-plugin-solidity'],
  overrides: [
    {
      files: '*.sol',
      options: {
        compiler: SOLC_VERSION || '0.8.28',
        parser: 'slang-solidity',
        printWidth: 120,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: false, // TODO: x check this (in docs, false)
        // semi: true,
        // trailingComma: 'none',
        // arrowParens: 'avoid',
      },
    },
  ],
};
