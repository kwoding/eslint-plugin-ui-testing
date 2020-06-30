import { AutomationTool, LOC_SOF, NO_AUTOMATION_TOOL_SET_MESSAGE } from '../data/data';
import {
  createRule, getHardWaitCommands, getRuleName, isObjectPropertyNameInCommands,
} from '../utils/utils';

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

    const digitPattern = new RegExp('\\d+');
    const hardWaitCommands = getHardWaitCommands(automationApi) || [];

    return {
      'CallExpression[callee.object.name][callee.property.name]': function rule(
        node: any,
      ) {
        const value = node.arguments.length ? node.arguments[0].value : '';

        if (isObjectPropertyNameInCommands(node, hardWaitCommands) && digitPattern.test(value)) {
          context.report({ node, messageId: 'noHardWait' });
        }
      },
    };
  },
});
