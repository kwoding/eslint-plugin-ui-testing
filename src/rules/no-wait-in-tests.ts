import { AutomationTool, LOC_SOF, TEST_BLOCKS_PATTERN } from '../data/data';
import { createRule, getWaitCommandsNotInTest, getRuleName, getCalleePattern } from '../utils/utils';

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
            noWaitInTests: 'Avoid wait in tests, rather move these to page objects or an other abstraction layer',
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

        const calleePattern = getCalleePattern(getWaitCommandsNotInTest(automationApi) || []);
        const matcher = `CallExpression[callee.object.name=/^(${calleePattern.objectNamePattern})$/][callee.property.name=/^(${calleePattern.propertyNamePattern})$/]`;

        return {
            [`CallExpression[callee.name=${TEST_BLOCKS_PATTERN}] ${matcher}`](node) {
                context.report({ node, messageId: 'noWaitInTests' });
            },
            [`CallExpression[callee.object.name=${TEST_BLOCKS_PATTERN}] ${matcher}`](node) {
                context.report({ node, messageId: 'noWaitInTests' });
            },
            [`CallExpression[callee.object.object.name=${TEST_BLOCKS_PATTERN}] ${matcher}`](node) {
                context.report({ node, messageId: 'noWaitInTests' });
            },
        };
    },
});
