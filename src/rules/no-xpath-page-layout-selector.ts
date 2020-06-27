import { TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule, getRuleName } from '../utils/utils';

export const RULE_NAME = getRuleName();

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
            [`CallExpression[callee.name=/^[$]$/] Literal[value]`](node: TSESTree.Literal) {
                const xpathPattern = new RegExp('^([/]|[(]|(../)|(./)|(\\*/))');
                const recommendedXpathPattern = new RegExp('^//[^/]*/?[^/]*$');
                const value = `${node.value}`;

                if (xpathPattern.test(value) && !recommendedXpathPattern.test(value)) {
                    context.report({
                        node: node,
                        messageId: `noXpathPageLayoutSelector`,
                    });
                }
            },
        };
    },
});
