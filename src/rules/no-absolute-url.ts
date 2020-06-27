import { TSESTree } from '@typescript-eslint/experimental-utils';
import { AutomationTool, LOC_SOF } from '../data/data';
import { createRule, getOpenUrlCommands, getRuleName, getCalleePattern } from '../utils/utils';

export const RULE_NAME = getRuleName();

export default createRule({
    name: RULE_NAME,
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Disallow absolute url',
            recommended: 'warn',
        },
        messages: {
            noAutomationToolSet: `Please set the appropriate automation tool used, choose one from: cypress, webdriverio`,
            noAbsoluteUrl: 'Avoid absolute url, use a base url in the project config',
        },
        schema: [
            {
                type: 'string',
                default: '',
                additionalProperties: false,
            },
        ],
        type: 'suggestion',
    },
    defaultOptions: [null],
    create(context, [automationApi]: [AutomationTool]) {
        if (!automationApi) {
            context.report({ loc: LOC_SOF, messageId: 'noAutomationToolSet' });
        }
        
        const calleePattern = getCalleePattern(getOpenUrlCommands(automationApi) || []);

        return {
            [`CallExpression[callee.object.name=/^${calleePattern.objectNamePattern}$/][callee.property.name=/^${calleePattern.propertyNamePattern}$/] Literal[value]`](
                node: TSESTree.Literal
            ) {
                const absoluteUrlPattern = new RegExp('^(?:[a-z]+:)?//');
                const value = `${node.value}`.toLowerCase();

                if (absoluteUrlPattern.test(value)) {
                    context.report({ node, messageId: `noAbsoluteUrl` });
                }
            },
        };
    },
});
