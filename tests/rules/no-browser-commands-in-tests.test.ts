import rule, { RULE_NAME } from '../../src/rules/no-browser-commands-in-tests';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    { code: "it(() => { some('/'); });", options: ['cypress'] },
    {
      code: "describe(() => { test.only(() => { some.thing.else('/'); } ); });",
      options: ['testcafe'],
    },
    { code: "ftest(() => { abc.def('/'); });", options: ['puppeteer'] },
    {
      code: "it(() => { browser.url('/'); });",
      options: ['puppeteer'],
    },
    {
      code: "describe(() => { test.only(() => { browser.url('/'); } ); });",
      options: ['puppeteer'],
    },
    {
      code: "ftest(() => { browser.url('/'); });",
      options: ['playwright'],
    },
    {
      code: "it(() => { page.goto('/'); });",
      options: ['webdriverio'],
    },
    {
      code: "describe(() => { test.only(() => { page.goto('/'); } ); });",
      options: ['webdriverio'],
    },
    {
      code: "ftest(() => { page.goto('/'); });",
      options: ['webdriverio'],
    },
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
      code: "it(() => { browser.url('/'); });",
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noBrowserCommandInTests',
        },
      ],
    },
    {
      code: "describe(() => { test.only(() => { browser.url('/'); } ); });",
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noBrowserCommandInTests',
        },
      ],
    },
    {
      code: "ftest(() => { browser.url('/'); });",
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noBrowserCommandInTests',
        },
      ],
    },
    {
      code: "test.concurrent.only(() => { page.goto('/'); });",
      options: ['puppeteer'],
      errors: [
        {
          messageId: 'noBrowserCommandInTests',
        },
      ],
    },
    {
      code: "describe(() => { test.only(() => { page.goto('/'); } ); });",
      options: ['playwright'],
      errors: [
        {
          messageId: 'noBrowserCommandInTests',
        },
      ],
    },
    {
      code: "ftest(() => { page.goto('/'); });",
      options: ['playwright'],
      errors: [
        {
          messageId: 'noBrowserCommandInTests',
        },
      ],
    },
  ],
});
