import { TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule, getRuleName } from '../utils/utils';

export const RULE_NAME = getRuleName();

export default createRule({
    name: RULE_NAME,
    meta: {
        docs: {
            category: 'Best Practices',
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
            [`CallExpression[callee.name=/^[$]$/] Literal[value]`](node: TSESTree.Literal) {
                const tagNamePattern = new RegExp('<[0-9a-zA-Z-]+[ /]*>');

                if (tagNamePattern.test(`${node.value}`)) {
                    context.report({ node, messageId: `noTagNameSelector` });
                }
            },
        };
    },
});
