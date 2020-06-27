import rule, { RULE_NAME } from '../../src/rules/no-xpath-selector';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
    valid: [
        '$(\'["data-test"="test"]\');',
        '$(\'["data-test"="test"] .abc\');',
        '$(\'.abc > #def\');',
    ],
    invalid: [
        {
            code: "$('//submit/button');",
            errors: [
                {
                    messageId: 'noXpathSelector',
                },
            ],
        },
        {
            code: '$(\'//cancel/button[@id="element"]\');',
            errors: [
                {
                    messageId: 'noXpathSelector',
                },
            ],
        },
        {
            code: '$(\'//*[@id="element_id"]\');',
            errors: [
                {
                    messageId: 'noXpathSelector',
                },
            ],
        },
    ],
});
