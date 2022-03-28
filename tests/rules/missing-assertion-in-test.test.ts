import rule, { RULE_NAME } from '../../src/rules/missing-assertion-in-test';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    'describe(() => {});',
    'it(() => { expectAsync(true).to.equal(true); });',
    'test.concurrent(() => { assert(true).to.equal(true); });',
    'describe(() => { test(() => { expect(true).to.equal(true); }); });',
    'test.concurrent.only(() => { expect(true).to.equal(true); });',
    'it.only(() => { assert(true).to.equal(true); });',
    'describe(() => { test.only(() => { expectAsync(true).to.equal(true); } ); });',
    'fdescribe(() => {expect(true).to.equal(true); });',
    'describe(() => { fit(() => { assert(true).to.equal(true); }); });',
    'ftest(() => { expectAsync(true).to.equal(true); });',
    'test.describe(\'test suite\', () => { test.beforeEach(async ({ page }) => { await page.goto("/"); }); test(\'some test\', async ({ page }) => { await expect(page).toHaveURL("https://"); }); });',
    {
      code: 'it("", () => { testAssert(); })',
      options: [{ assertCommands: ['testAssert'] }],
    },
    {
      code: 'it("", () => { some.other.testAssert(); })',
      options: [{ assertCommands: ['testAssert'] }],
    },
  ],
  invalid: [
    {
      code:
                'describe(() => { it(() => { doSomething(); expect(true).to.equal(true); }); it(() => { doSomething(); }); });',
      errors: [
        {
          messageId: 'missingAssertionInTest',
        },
      ],
    },
    {
      code: 'describe(() => { it(() => { doSomething(); }); });',
      options: [{ assertCommands: undefined }],
      errors: [
        {
          messageId: 'missingAssertionInTest',
        },
      ],
    },
    {
      code: 'it.concurrent.only(() => { doSomething(); });',
      errors: [
        {
          messageId: 'missingAssertionInTest',
        },
      ],
    },
    {
      code: 'describe(() => { test.skip(() => { doSomething(); }); });',
      errors: [
        {
          messageId: 'missingAssertionInTest',
        },
      ],
    },
    {
      code: 'xdescribe(() => { it(() => { tester(); }); });',
      errors: [
        {
          messageId: 'missingAssertionInTest',
        },
      ],
      options: [{ assertCommands: ['testAssert'] }],
    },
    {
      code: 'describe(() => { xit(() => { testa.all.the.things(); }); });',
      options: [{ assertCommands: ['testAssert'] }],
      errors: [
        {
          messageId: 'missingAssertionInTest',
        },
      ],
    },
    {
      code: 'xtest(() => { testing(); });',
      options: [{ assertCommands: ['testAssert'] }],
      errors: [
        {
          messageId: 'missingAssertionInTest',
        },
      ],
    },
  ],
});
