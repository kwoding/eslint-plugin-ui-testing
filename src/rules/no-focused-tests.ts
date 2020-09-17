import { createRule } from '../utils/utils';

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow focused tests',
      recommended: 'warn',
    },
    messages: {
      noFocusedTests: 'Avoid focused tests',
    },
    schema: [],
    type: 'suggestion',
  },
  defaultOptions: [],
  create(context) {
    return {
      'CallExpression[callee.object.name=/^(describe|it|test)$/] Identifier[name=/^(only)$/]': function rule(
        node,
      ) {
        context.report({ node, messageId: 'noFocusedTests' });
      },
      'CallExpression[callee.object.object.name=/^(describe|it|test)$/] Identifier[name=/^(only)$/]': function rule(
        node,
      ) {
        context.report({ node, messageId: 'noFocusedTests' });
      },
      'CallExpression[callee.name=/^(fdescribe|fit|ftest)$/]': function rule(node) {
        context.report({ node, messageId: 'noFocusedTests' });
      },
    };
  },
});
