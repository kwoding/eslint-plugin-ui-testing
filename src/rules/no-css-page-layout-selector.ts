import { AutomationTool, LOC_SOF, NO_AUTOMATION_TOOL_SET_MESSAGE } from '../data/data';
import {
  createRule,
  getSelectorCommands,
  isCalleeNameInCommands,
  isObjectPropertyNameInCommands,
  getArgumentValue,
} from '../utils/utils';

function isCssPageLayoutSelector(value: string) {
  const nonCssPattern = new RegExp(
    '^(([/]|[(]|(../)|(./)|(\\*/))|(=)|(-)|(\\*=)|([a-z][=])|(~)|(<))',
  );
  const cssPageLayoutPattern = new RegExp('(\\S+((\\s+[>]\\s+)|(\\s+))\\S+){2,}');

  return !nonCssPattern.test(value) && cssPageLayoutPattern.test(value);
}

export const RULE_NAME = __filename.slice(__dirname.length + 1, -3);

export default createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow css selector tied to page layout',
      recommended: 'error',
    },
    messages: {
      noAutomationToolSet: NO_AUTOMATION_TOOL_SET_MESSAGE,
      noCssPageLayoutSelector: 'Avoid css selector tied to page layout',
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

    const selectorCommands = getSelectorCommands(automationApi);

    return {
      'CallExpression[callee.object.name][callee.property.name]': function rule(node: any) {
        if (
          isObjectPropertyNameInCommands(node, selectorCommands)
                    && isCssPageLayoutSelector(getArgumentValue(node))
        ) {
          context.report({ node, messageId: 'noCssPageLayoutSelector' });
        }
      },
      'CallExpression[callee.name]': function rule(node: any) {
        if (
          isCalleeNameInCommands(node, selectorCommands)
                    && isCssPageLayoutSelector(getArgumentValue(node))
        ) {
          context.report({ node, messageId: 'noCssPageLayoutSelector' });
        }
      },
    };
  },
});
