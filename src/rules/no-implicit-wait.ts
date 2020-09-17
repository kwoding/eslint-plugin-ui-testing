import { createRule } from '../utils/utils';

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow implicit wait',
      recommended: 'error',
    },
    messages: {
      noImplicitWait: 'Avoid implicit wait, use explicit wait instead',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    return {
      'CallExpression[callee.object.name=/^(browser)$/][callee.property.name=/^(setTimeout)$/] Identifier[name=\'implicit\']': function rule(
        node,
      ) {
        context.report({
          node,
          messageId: 'noImplicitWait',
        });
      },
    };
  },
});
