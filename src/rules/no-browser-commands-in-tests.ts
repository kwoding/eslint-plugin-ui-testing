import { AutomationTool, LOC_SOF, TEST_BLOCKS_PATTERN } from '../data/data';
import { createRule, getBrowserObjectNames, getRuleName } from '../utils/utils';

export const RULE_NAME = getRuleName();

export default createRule({
    name: RULE_NAME,
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Disallow browser/page commands in tests',
            recommended: 'warn',
        },
        messages: {
            noAutomationToolSet: `Please set the appropriate automation API used, choose one from: playwright, puppeteer, webdriverio`,
            noBrowserCommandInTests:
                'Avoid browser/page commands in tests, rather move these to page objects or an other abstraction layer',
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

        const browserObjectNames = (getBrowserObjectNames(automationApi) || []).join('|');

        return {
            [`CallExpression[callee.name=${TEST_BLOCKS_PATTERN}] CallExpression[callee.object.name=/^${browserObjectNames}$/]`](
                node
            ) {
                context.report({ node, messageId: 'noBrowserCommandInTests' });
            },
            [`CallExpression[callee.object.name=${TEST_BLOCKS_PATTERN}] CallExpression[callee.object.name=/^${browserObjectNames}$/]`](
                node
            ) {
                context.report({ node, messageId: 'noBrowserCommandInTests' });
            },
            [`CallExpression[callee.object.object.name=${TEST_BLOCKS_PATTERN}] CallExpression[callee.object.name=/^${browserObjectNames}$/]`](
                node
            ) {
                context.report({ node, messageId: 'noBrowserCommandInTests' });
            },
        };
    },
});
