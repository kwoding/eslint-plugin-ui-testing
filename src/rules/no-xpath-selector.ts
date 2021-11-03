import { TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule, getArgumentValue } from '../utils/utils';

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      description: 'Disallow xpath selector',
      recommended: 'warn',
    },
    messages: {
      noXpathSelector: 'Avoid xpath selector, use css selector instead',
    },
    schema: [],
    type: 'suggestion',
  },
  defaultOptions: [],
  create(context) {
    return {
      'CallExpression[callee.name=/^[$]$/]': function rule(node: TSESTree.Literal) {
        const xpathPattern = new RegExp('^([/]|[(]|(../)|(./)|(\\*/))');

        if (xpathPattern.test(getArgumentValue(node))) {
          context.report({
            node,
            messageId: 'noXpathSelector',
          });
        }
      },
    };
  },
});
