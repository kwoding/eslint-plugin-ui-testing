import { AutomationTool, LOC_SOF, TEST_BLOCKS_PATTERN } from '../data/data';
import { createRule, getRuleName, getWaitCommandsNotInTest, isObjectPropertyNameInCommands } from '../utils/utils';
import { RuleContext } from '@typescript-eslint/experimental-utils/dist/ts-eslint';
import { TSESTree } from '@typescript-eslint/experimental-utils';

function report(context: RuleContext<"noWaitInTests" | "noAutomationToolSet", [AutomationTool]>, node: TSESTree.CallExpression, commands: string[]) {
    if (isObjectPropertyNameInCommands(node, commands)) {
        context.report({ node, messageId: 'noWaitInTests' });
    }
}

export const RULE_NAME = getRuleName();

export default createRule({
    name: RULE_NAME,
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Disallow wait in tests',
            recommended: 'error',
        },
        messages: {
            noAutomationToolSet: `Please set the appropriate automation API used, choose one from: playwright, puppeteer, webdriverio`,
            noWaitInTests:
                'Avoid wait in tests, rather move these to page objects or an other abstraction layer',
        },
        schema: [
            {
                type: 'string',
                default: '',
                additionalProperties: false,
            },
        ],
        type: 'problem',
    },
    defaultOptions: [null],
    create(context, [automationApi]: [AutomationTool]) {
        if (!automationApi) {
            context.report({ loc: LOC_SOF, messageId: 'noAutomationToolSet' });
        }

        const waitCommands = getWaitCommandsNotInTest(automationApi) || [];
        const matcher = `CallExpression[callee.object.name][callee.property.name]`;

        return {
            [`CallExpression[callee.name=${TEST_BLOCKS_PATTERN}] ${matcher}`](node: any) {
                report(context, node, waitCommands);
            },
            [`CallExpression[callee.object.name=${TEST_BLOCKS_PATTERN}] ${matcher}`](node) {
                report(context, node, waitCommands);
            },
            [`CallExpression[callee.object.object.name=${TEST_BLOCKS_PATTERN}] ${matcher}`](node) {
                report(context, node, waitCommands);
            },
        };
    },
});
