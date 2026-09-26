// Limiares iguais aos do Training Control (app/eslint.config.js).
// Código novo: error, sem allowlist. Fronteiras: docs/PLANO.md.
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');

const complexityRulesError = {
  complexity: ['error', 5],
  'max-lines': [
    'error',
    { max: 200, skipBlankLines: true, skipComments: true },
  ],
  'max-lines-per-function': [
    'error',
    { max: 40, skipBlankLines: true, skipComments: true },
  ],
  'max-depth': ['error', 3],
  'max-params': ['error', 2],
};

const sourceFiles = [
  'apps/web/**/*.{js,jsx,ts,tsx}',
  'apps/bff/**/*.{js,jsx,ts,tsx}',
  'packages/contract/**/*.{js,jsx,ts,tsx}',
];

const domainFiles = ['apps/bff/src/domain/**/*.{js,jsx,ts,tsx}'];

const routeFiles = [
  'apps/bff/src/use-cases/**/*.{js,jsx,ts,tsx}',
  'apps/bff/src/**/*.controller.ts',
];

const outsideBff = [
  'apps/web/**/*.{js,jsx,ts,tsx}',
  'packages/contract/**/*.{js,jsx,ts,tsx}',
];

/** @type {import('eslint').Linter.Config[]} */
module.exports = defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
    ],
  },
  {
    files: sourceFiles,
    rules: complexityRulesError,
  },
  {
    files: ['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    files: domainFiles,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'axios', message: 'Domínio não importa HTTP.' },
            { name: 'node-fetch', message: 'Domínio não importa HTTP.' },
            { name: 'undici', message: 'Domínio não importa HTTP.' },
            { name: 'got', message: 'Domínio não importa HTTP.' },
          ],
          patterns: [
            {
              group: ['@nestjs/*', '@nestjs/**'],
              message: 'Domínio não importa Nest.',
            },
            {
              group: ['node:http', 'node:https', 'node:http2'],
              message: 'Domínio não importa HTTP.',
            },
            {
              regex: '(^|/)client(/|$)',
              message: 'Domínio não importa o cliente da API externa.',
            },
          ],
        },
      ],
    },
  },
  {
    files: routeFiles,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '(^|/)client(/|$)',
              message:
                'Rotas não importam o cliente HTTP. Dependem da porta do caso de uso.',
            },
          ],
        },
      ],
    },
  },
  {
    files: outsideBff,
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/rickandmortyapi\\.com/i]',
          message: 'Só o BFF chama a Rick and Morty API.',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: 'rickandmortyapi',
              message: 'Só o BFF chama a Rick and Morty API.',
            },
          ],
        },
      ],
    },
  },
]);
