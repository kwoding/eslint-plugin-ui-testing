import { AutomationTool, LOC_SOF, NO_AUTOMATION_TOOL_SET_MESSAGE } from '../data/data';
import { createRule, getHardWaitCommands, getRuleName, getCalleePattern } from '../utils/utils';

export const RULE_NAME = getRuleName();

export default createRule({
    name: RULE_NAME,
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Disallow hard wait',
            recommended: 'error',
        },
        messages: {
            noAutomationToolSet: NO_AUTOMATION_TOOL_SET_MESSAGE,
            noHardWait: 'Avoid hard wait',
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

        const calleePattern = getCalleePattern(getHardWaitCommands(automationApi) || []);

        return {
            [`CallExpression[callee.object.name=/^(${calleePattern.objectNamePattern})$/][callee.property.name=/^(${calleePattern.propertyNamePattern})$/] Literal[value!=/\\D+/]`](
                node
            ) {
                context.report({ node, messageId: 'noHardWait' });
            },
        };
    },
});
