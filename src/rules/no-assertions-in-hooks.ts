import { createRule } from '../utils/utils';

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow assertions in hooks',
      recommended: 'error',
    },
    messages: {
      noAssertionsInHooks: 'Avoid using assertions in hooks',
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
    const commands = assertCommands.join('|');

    return {
      [`CallExpression[callee.name=/^(before|after)(Each|All)$/] Identifier[name=/^${commands}$/]`](
        node,
      ) {
        context.report({ node, messageId: 'noAssertionsInHooks' });
      },
    };
  },
});
