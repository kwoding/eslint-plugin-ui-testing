import rule, { RULE_NAME } from '../../src/rules/no-implicit-wait';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
    valid: [
        {
            code: 'browser.setTimeout()',
        },
        {
            code: "browser.setTimeout('abc')",
        },
        {
            code: "browser.setTimeout({ 'pageLoad': 10000 })",
        },
    ],
    invalid: [
        {
            code: "browser.setTimeout({ 'pageLoad': 10000, implicit: '5000'})",
            errors: [
                {
                    messageId: 'noImplicitWait',
                },
            ],
        },
        {
            code: "browser.setTimeout({ implicit: '5000'})",
            errors: [
                {
                    messageId: 'noImplicitWait',
                },
            ],
        },
    ],
});
