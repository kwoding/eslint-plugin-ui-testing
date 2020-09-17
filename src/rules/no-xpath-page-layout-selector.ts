import { TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule, getArgumentValue } from '../utils/utils';

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow xpath selector tied to page layout',
      recommended: 'error',
    },
    messages: {
      noXpathPageLayoutSelector: 'Avoid xpath selector tied to page layout',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    return {
      'CallExpression[callee.name=/^[$]$/]': function rule(node: TSESTree.Literal) {
        const xpathPattern = new RegExp('^([/]|[(]|(../)|(./)|(\\*/))');
        const recommendedXpathPattern = new RegExp('^[(]?//[^/]*/?[^/]*$');
        const value = getArgumentValue(node);

        if (xpathPattern.test(value) && !recommendedXpathPattern.test(value)) {
          context.report({
            node,
            messageId: 'noXpathPageLayoutSelector',
          });
        }
      },
    };
  },
});
