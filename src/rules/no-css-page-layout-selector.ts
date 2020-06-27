import { TSESTree } from '@typescript-eslint/experimental-utils';
import { AutomationTool, LOC_SOF, NO_AUTOMATION_TOOL_SET_MESSAGE } from '../data/data';
import { createRule, getSelectorCommands, getRuleName, getCalleePattern } from '../utils/utils';
import { RuleContext } from '@typescript-eslint/experimental-utils/dist/ts-eslint';

function isCssPageLayoutSelector(value: string) {
    const nonCssPattern = new RegExp(
        '^(([/]|[(]|(../)|(./)|(\\*/))|(=)|(-)|(\\*=)|([a-z][=])|(~)|(<))'
    );
    const cssPageLayoutPattern = new RegExp('(\\S+((\\s+[>]\\s+)|(\\s+))\\S+){2,}');

    return !nonCssPattern.test(value) && cssPageLayoutPattern.test(value);
}

function report(
    context: Readonly<
        RuleContext<'noCssPageLayoutSelector', [AutomationTool]>
    >,
    node: TSESTree.Literal
) {
    if (isCssPageLayoutSelector(`${node.value}`)) {
        context.report({ node, messageId: `noCssPageLayoutSelector` });
    }
}

export const RULE_NAME = getRuleName();

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

        const calleePattern = getCalleePattern(getSelectorCommands(automationApi) || []);

        return {
            [`CallExpression[callee.object.name=/^(${calleePattern.objectNamePattern})$/][callee.property.name=/^(${calleePattern.propertyNamePattern})$/] Literal[value]`](
                node: TSESTree.Literal
            ) {
                report(context, node);
            },
            [`CallExpression[callee.name=/^${calleePattern.calleeNamePattern}$/] Literal[value]`](
                node: TSESTree.Literal
            ) {
                report(context, node);
            },
        };
    },
});
