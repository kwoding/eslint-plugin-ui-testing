import { RuleContext } from '@typescript-eslint/experimental-utils/dist/ts-eslint';
import { TSESTree } from '@typescript-eslint/experimental-utils';
import { AutomationTool, LOC_SOF, TEST_BLOCKS_PATTERN } from '../data/data';
import {
  createRule, getWaitCommandsNotInTest, isObjectPropertyNameInCommands,
} from '../utils/utils';

function report(context: RuleContext<'noWaitInTests' | 'noAutomationToolSet', AutomationTool[]>, node: TSESTree.CallExpression, commands: string[]) {
  if (isObjectPropertyNameInCommands(node, commands)) {
    context.report({ node, messageId: 'noWaitInTests' });
  }
}

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      description: 'Disallow wait in tests',
      recommended: 'error',
    },
    messages: {
      noAutomationToolSet: 'Please set the appropriate automation API used, choose one from: playwright, puppeteer, webdriverio',
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
  create(context, [automationApi]: AutomationTool[]) {
    if (!automationApi) {
      context.report({ loc: LOC_SOF, messageId: 'noAutomationToolSet' });
    }

    const waitCommands = getWaitCommandsNotInTest(automationApi);
    const matcher = 'CallExpression[callee.object.name][callee.property.name]';

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
