import { createRule, getRuleName } from '../utils/utils';

export const RULE_NAME = getRuleName();

export default createRule({
    name: RULE_NAME,
    meta: {
        docs: {
            category: 'Best Practices',
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
            [`CallExpression[callee.object.name=/^(describe|it|test)$/] Identifier[name=/^(skip)$/]`](
                node
            ) {
                context.report({ node, messageId: 'noDisabledTests' });
            },
            [`CallExpression[callee.object.object.name=/^(describe|it|test)$/] Identifier[name=/^(skip)$/]`](
                node
            ) {
                context.report({ node, messageId: 'noDisabledTests' });
            },
            [`CallExpression[callee.name=/^(xdescribe|xit|xtest)$/]`](node) {
                context.report({ node, messageId: 'noDisabledTests' });
            },
        };
    },
});
