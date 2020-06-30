import rule, { RULE_NAME } from '../../src/rules/no-hard-wait';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    { code: 'cy.wait("@api");', options: ['cypress'] },
    { code: 't.waitForTimeout(2000);', options: ['testcafe'] },
    { code: 'browser.url("");', options: ['webdriverio'] },
    {
      code:
        'browser.waitUntil(function () { $("#someText").getText() === "I am now different",{ timeout: 5000,timeoutMsg: "expected text to be different after 5s" }});',
      options: ['webdriverio'],
    },
    {
      code: 'element.waitForDisplayed();',
      options: ['webdriverio'],
    },
    {
      code: 'element.waitForEnabled();',
      options: ['webdriverio'],
    },
    { code: 'element.waitForExists();', options: ['webdriverio'] },
    { code: 'page.pause(1000)', options: ['playwright'] },
    { code: 'page.wait(1000);', options: ['playwright'] },
    { code: 'page.waitFor(".abc");', options: ['playwright'] },
    { code: 'browser.pause();', options: ['webdriverio'] },
  ],
  invalid: [
    {
      code: 'browser.pause(3000);',
      errors: [
        {
          messageId: 'noAutomationToolSet',
        },
      ],
    },
    {
      code: 'browser.pause(3000);',
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noHardWait',
        },
      ],
    },
    {
      code: 'browser.pause(1);',
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noHardWait',
        },
      ],
    },
    {
      code: 'page.waitFor(3000);',
      options: ['puppeteer'],
      errors: [
        {
          messageId: 'noHardWait',
        },
      ],
    },
    {
      code: 'page.waitForTimeout(3000);',
      options: ['playwright'],
      errors: [
        {
          messageId: 'noHardWait',
        },
      ],
    },
    {
      code: 'cy.wait(3000);',
      options: ['cypress'],
      errors: [
        {
          messageId: 'noHardWait',
        },
      ],
    },
    {
      code: 't.wait(3000);',
      options: ['testcafe'],
      errors: [
        {
          messageId: 'noHardWait',
        },
      ],
    },
  ],
});
