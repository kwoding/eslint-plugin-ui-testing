import { TSESTree } from '@typescript-eslint/experimental-utils';
import { RuleContext } from '@typescript-eslint/experimental-utils/dist/ts-eslint';
import { createRule } from '../utils/utils';

let actualCommands: string[] = [];

function report(
  context: Readonly<RuleContext<'missingAssertionInTest', [{ assertCommands: string[] }]>>,
  node: never,
) {
  if (!actualCommands.length) {
    context.report({ node, messageId: 'missingAssertionInTest' });
  } else {
    actualCommands = [];
  }
}

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow tests without assertions',
      recommended: 'error',
    },
    messages: {
      missingAssertionInTest: 'Missing assertion in test',
    },
    schema: [
      {
        type: 'object',
        properties: {
          assertCommands: {
            type: 'array',
            items: [{ type: 'string' }],
          },
        },
        additionalProperties: false,
      },
    ],
    type: 'problem',
  },
  defaultOptions: [{ assertCommands: ['expect', 'expectAsync', 'assert'] }],
  create(
    context,
    [{ assertCommands = ['expect', 'expectAsync', 'assert'] }]: [{ assertCommands: string[] }],
  ) {
    const testBlockPattern = '/(it|test)$/';
    const commands = assertCommands.join('|');

    return {
      [`CallExpression[callee.name=${testBlockPattern}] Identifier[name=/${commands}/]`](
        node: TSESTree.Identifier,
      ) {
        actualCommands.push(node.name);
      },
      [`CallExpression[callee.object.name=${testBlockPattern}] Identifier[name=/${commands}/]`](
        node: TSESTree.Identifier,
      ) {
        actualCommands.push(node.name);
      },
      [`CallExpression[callee.object.object.name=${testBlockPattern}] Identifier[name=/${commands}/]`](
        node: TSESTree.Identifier,
      ) {
        actualCommands.push(node.name);
      },
      [`CallExpression[callee.name=${testBlockPattern}]:exit`](node) {
        report(context, node);
      },
      [`CallExpression[callee.object.name=${testBlockPattern}]:exit`](node) {
        report(context, node);
      },
      [`CallExpression[callee.object.object.name=${testBlockPattern}]:exit`](node) {
        report(context, node);
      },
    };
  },
});
