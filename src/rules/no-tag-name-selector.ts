import { TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule } from '../utils/utils';

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      description: 'Disallow tag name selector',
      recommended: 'error',
    },
    messages: {
      noTagNameSelector: 'Avoid tag name selector, use css selector instead',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    return {
      'CallExpression[callee.name=/^[$]$/] Literal[value]': function rule(node: TSESTree.Literal) {
        const tagNamePattern = new RegExp('<[0-9a-zA-Z-]+[ /]*>');

        if (tagNamePattern.test(`${node.value}`)) {
          context.report({ node, messageId: 'noTagNameSelector' });
        }
      },
    };
  },
});
