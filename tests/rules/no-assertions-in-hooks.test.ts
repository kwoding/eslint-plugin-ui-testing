import rule, { RULE_NAME } from '../../src/rules/no-assertions-in-hooks';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    'beforeEach(() => { something("else"); });',
    'afterEach(() => {});',
    'beforeAll(() => {});',
    'afterAll(() => { something("else"); });',
    'it("", () => { expect(true).to.equal(true); })',
    'it("", () => { assert(true).to.equal(true); })',
    'expect(true).to.equal(true);',
    'expectAsync(Promise.resolve(true)).toBeResolvedTo(true);',
    {
      code: 'it("", () => { testAssert(); })',
      options: [{ assertCommands: ['testAssert'] }],
    },
    {
      code: 'it("", () => { some.other.testAssert();})',
      options: [{ assertCommands: ['testAssert'] }],
    },
  ],
  invalid: [
    {
      code: 'beforeEach(() => { expect(true).to.be.true; });',
      errors: [
        {
          messageId: 'noAssertionsInHooks',
        },
      ],
    },
    {
      code: 'beforeEach(() => { expect(true).to.be.true; });',
      options: [{ assertCommands: undefined }],
      errors: [
        {
          messageId: 'noAssertionsInHooks',
        },
      ],
    },
    {
      code:
        'beforeAll(() => { return expectAsync(Promise.resolve(true)).toBeResolvedTo(true); });',
      errors: [
        {
          messageId: 'noAssertionsInHooks',
        },
      ],
    },
    {
      code: 'afterEach(() => { assert(true).toBe(true); });',
      errors: [
        {
          messageId: 'noAssertionsInHooks',
        },
      ],
    },
    {
      code: 'afterAll(() => { return assert.fail(true).to.be.true; });',
      errors: [
        {
          messageId: 'noAssertionsInHooks',
        },
      ],
    },
    {
      code: 'beforeEach(() => { testAssert("something") })',
      options: [{ assertCommands: ['testAssert'] }],
      errors: [
        {
          messageId: 'noAssertionsInHooks',
        },
      ],
    },
    {
      code: 'beforeAll(() => {return xyz.abc(); })',
      options: [{ assertCommands: ['abc', 'def'] }],
      errors: [
        {
          messageId: 'noAssertionsInHooks',
        },
      ],
    },
    {
      code: 'afterAll(() => {return xyz.def.ghi(); })',
      options: [{ assertCommands: ['abc', 'def'] }],
      errors: [
        {
          messageId: 'noAssertionsInHooks',
        },
      ],
    },
  ],
});
