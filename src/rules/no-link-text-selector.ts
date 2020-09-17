import { TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule } from '../utils/utils';

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow link text selector',
      recommended: 'error',
    },
    messages: {
      noLinkTextSelector: 'Avoid link text selector, use css selector instead',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    return {
      'CallExpression[callee.name=/^[$]$/] Literal[value]': function rule(node: TSESTree.Literal) {
        const linkTextPattern = new RegExp('^((=)|(\\*=))');

        if (linkTextPattern.test(`${node.value}`)) {
          context.report({ node, messageId: 'noLinkTextSelector' });
        }
      },
    };
  },
});
