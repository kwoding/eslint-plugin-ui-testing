import { resolve } from 'path';
import { TSESLint } from '@typescript-eslint/experimental-utils';

export const createRuleTester = (): TSESLint.RuleTester => new TSESLint.RuleTester({
  parser: resolve('./node_modules/@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2015,
  },
});
