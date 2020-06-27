import rule, { RULE_NAME } from '../../src/rules/no-tag-name-selector';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
    valid: [
        '$(\'["data-test"="test"]\');',
        '$(\'["data-test"="test"] .abc\');',
        "$('.abc > #def');",
    ],
    invalid: [
        {
            code: "$('<something />');",
            errors: [
                {
                    messageId: 'noTagNameSelector',
                },
            ],
        },
        {
            code: "$('<some-tag   />');",
            errors: [
                {
                    messageId: 'noTagNameSelector',
                },
            ],
        },
        {
            code: "$('<some-tag>');",
            errors: [
                {
                    messageId: 'noTagNameSelector',
                },
            ],
        },
    ],
});
