import rule, { RULE_NAME } from '../../src/rules/no-wait-in-tests';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
    valid: [
        {
            code:
                'browser.waitUntil(function () { $("#someText").getText() === "I am now different",{ timeout: 5000,timeoutMsg: "expected text to be different after 5s" }});',
            options: ['webdriverio'],
        },
        { code: 'element.waitForDisplayed();', options: ['webdriverio'] },
        { code: 'element.waitForEnabled();', options: ['webdriverio'] },
        { code: 'element.waitForExists();', options: ['webdriverio'] },
        { code: 'page.waitFor(".abc");', options: ['playwright'] },
        { code: 'page.waitFor(2000);', options: ['puppeteer'] },
    ],
    invalid: [
        {
            code: 'it(() => { page.waitFor(".abc"); });',
            errors: [
                {
                    messageId: 'noAutomationToolSet',
                },
            ],
        },
        {
            code: 'it(() => { page.waitFor(".abc"); });',
            options: ['puppeteer'],
            errors: [
                {
                    messageId: 'noWaitInTests',
                },
            ],
        },
        {
            code: 'it.only(() => { page.waitForSelector(".abc"); });',
            options: ['puppeteer'],
            errors: [
                {
                    messageId: 'noWaitInTests',
                },
            ],
        },
        {
            code: 'it(() => { t.wait(200); });',
            options: ['testcafe'],
            errors: [
                {
                    messageId: 'noWaitInTests',
                },
            ],
        },
        {
            code: "test.concurrent.only(() => { element.waitForExists(); });",
            options: ['webdriverio'],
            errors: [
                {
                    messageId: 'noWaitInTests',
                },
            ],
        },
        {
            code: 'it(() => { browser.waitUntil(function () { $("#someText").getText() === "I am now different",{ timeout: 5000,timeoutMsg: "expected text to be different after 5s" }}); });',
            options: ['webdriverio'],
            errors: [
                {
                    messageId: 'noWaitInTests',
                },
            ],
        },
    ],
});
