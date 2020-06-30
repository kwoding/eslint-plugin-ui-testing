import { LOC_SOF, AutomationTool } from '../data/data';
import {
  createRule, getOpenUrlCommands, getRuleName, isObjectPropertyNameInCommands,
} from '../utils/utils';

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
      noAutomationToolSet: 'Please set the appropriate automation tool used, choose one from: cypress, webdriverio',
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

    const openUrlCommands = getOpenUrlCommands(automationApi) || [];

    return {
      'CallExpression[callee.object.name][callee.property.name]': function rule(
        node: any,
      ) {
        const absoluteUrlPattern = new RegExp('^(?:[a-z]+:)?//');
        const value = node.arguments.length ? `${node.arguments[0].value}`.toLowerCase() : '';

        if (
          isObjectPropertyNameInCommands(node, openUrlCommands)
                    && absoluteUrlPattern.test(value)
        ) {
          context.report({ node, messageId: 'noAbsoluteUrl' });
        }
      },
    };
  },
});
