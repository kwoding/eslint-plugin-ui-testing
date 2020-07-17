import rule, { RULE_NAME } from '../../src/rules/no-css-page-layout-selector';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    { code: 'page.click(\'["data-test"="test"]\');', options: ['playwright'] },
    { code: 'page.click(\'.abc #def\');', options: ['puppeteer'] },
    { code: 'cy.get(\'["data-test"="test"] .abc\');', options: ['cypress'] },
    { code: 'page.selectOption(\'.abc #def > ["data-test"="test"]\');', options: ['testcafe'] },
    { code: '$(\'.abc > #def\');', options: ['webdriverio'] },
  ],
  invalid: [
    {
      code: '$(\'.abc #def ["data-test"="test"]\');',
      errors: [
        {
          messageId: 'noAutomationToolSet',
        },
      ],
    },
    {
      code: '$(\'.abc #def ["data-test"="test"]\');',
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noCssPageLayoutSelector',
        },
      ],
    },
    {
      code: '$(\'.abc #def > ["data-test"="test"]\');',
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noCssPageLayoutSelector',
        },
      ],
    },
    {
      code: '$(`.abc #def > ["data-test"="test"]`);',
      options: ['webdriverio'],
      errors: [
        {
          messageId: 'noCssPageLayoutSelector',
        },
      ],
    },
    {
      code: 'cy.get(\'.abc #def > ["data-test"="test"]\');',
      options: ['cypress'],
      errors: [
        {
          messageId: 'noCssPageLayoutSelector',
        },
      ],
    },
    {
      code: 'page.selectOption(\'.abc #def > ["data-test"="test"]\');',
      options: ['playwright'],
      errors: [
        {
          messageId: 'noCssPageLayoutSelector',
        },
      ],
    },
    {
      code: 'page.hover(\'.abc #def > ["data-test"="test"]\');',
      options: ['puppeteer'],
      errors: [
        {
          messageId: 'noCssPageLayoutSelector',
        },
      ],
    },
    {
      code: 't.drag(\'.abc #def > ["data-test"="test"]\', 360, 0, { offsetX: 10, offsetY: 10 });',
      options: ['testcafe'],
      errors: [
        {
          messageId: 'noCssPageLayoutSelector',
        },
      ],
    },
  ],
});
