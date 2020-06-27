import { TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule, getRuleName } from '../utils/utils';

export const RULE_NAME = getRuleName();

export default createRule({
    name: RULE_NAME,
    meta: {
        docs: {
            category: 'Best Practices',
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
            [`CallExpression[callee.name=/^[$]$/] Literal[value]`](node: TSESTree.Literal) {
                const xpathPattern = new RegExp('^([/]|[(]|(../)|(./)|(\\*/))');

                if (xpathPattern.test(`${node.value}`)) {
                    context.report({
                        node: node,
                        messageId: `noXpathSelector`,
                    });
                }
            },
        };
    },
});
