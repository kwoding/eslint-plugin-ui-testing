import { createRule } from '../utils/utils';

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      description: 'Disallow disabled tests',
      recommended: 'warn',
    },
    messages: {
      noDisabledTests: 'Avoid disabled tests',
    },
    schema: [],
    type: 'suggestion',
  },
  defaultOptions: [],
  create(context) {
    return {
      'CallExpression[callee.object.name=/^(describe|it|test)$/] Identifier[name=/^(skip)$/]': function rule(
        node,
      ) {
        context.report({ node, messageId: 'noDisabledTests' });
      },
      'CallExpression[callee.object.object.name=/^(describe|it|test)$/] Identifier[name=/^(skip)$/]': function rule(
        node,
      ) {
        context.report({ node, messageId: 'noDisabledTests' });
      },
      'CallExpression[callee.name=/^(xdescribe|xit|xtest)$/]': function rule(node) {
        context.report({ node, messageId: 'noDisabledTests' });
      },
    };
  },
});
