import rule, { RULE_NAME } from '../../src/rules/no-absolute-url';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    { code: 'browser.url();', options: ['webdriverio'] },
    { code: 'browser.url("");', options: ['webdriverio'] },
    { code: 'browser.url("somepage");', options: ['webdriverio'] },
    { code: 'page.url("PAGE");', options: ['puppeteer'] },
    { code: 'cy.url("/some/other/page");', options: ['cypress'] },
  ],
  invalid: [
    {
      code: "it(() => { browser.url('/'); });",
      errors: [
        {
          messageId: 'noAutomationToolSet',
        },
      ],
    },
    {
      code: 'browser.url("http://github.com");',
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noAbsoluteUrl',
        },
      ],
    },
    {
      code: 'browser.url("https://github.com");',
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noAbsoluteUrl',
        },
      ],
    },
    {
      code: 'page.goto("HTTP://github.com");',
      options: ['puppeteer'],
      errors: [
        {
          messageId: 'noAbsoluteUrl',
        },
      ],
    },
    {
      code: 'page.goto("HTTPS://github.com");',
      options: ['playwright'],
      errors: [
        {
          messageId: 'noAbsoluteUrl',
        },
      ],
    },
    {
      code: 'cy.visit("ftp://github.com");',
      options: ['cypress'],
      errors: [
        {
          messageId: 'noAbsoluteUrl',
        },
      ],
    },
    {
      code: 'browser.url("//github.com");',
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noAbsoluteUrl',
        },
      ],
    },
  ],
});
