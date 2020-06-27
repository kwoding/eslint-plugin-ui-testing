import rule, { RULE_NAME } from '../../src/rules/no-focused-tests';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    'describe(() => {});',
    'describe(() => { it(() => {}); });',
    'test(() => {});',
    'describe.skip(() => {});',
    'describe(() => { it.skip(() => {}); });',
    'test.skip(() => {});',
    'xdescribe(() => {});',
    'xit(() => {});',
    'describe(() => { xtest(() => {}); });',
  ],
  invalid: [
    {
      code: 'describe.only(() => { });',
      errors: [
        {
          messageId: 'noFocusedTests',
        },
      ],
    },
    {
      code: 'describe(() => { it.only(() => { }); });',
      errors: [
        {
          messageId: 'noFocusedTests',
        },
      ],
    },
    {
      code: 'describe(() => { it.concurrent.only(() => { }); });',
      errors: [
        {
          messageId: 'noFocusedTests',
        },
      ],
    },
    {
      code: 'test.only(() => { });',
      errors: [
        {
          messageId: 'noFocusedTests',
        },
      ],
    },
    {
      code: 'fdescribe(() => { });',
      errors: [
        {
          messageId: 'noFocusedTests',
        },
      ],
    },
    {
      code: 'describe(() => { fit(() => { }); });',
      errors: [
        {
          messageId: 'noFocusedTests',
        },
      ],
    },
    {
      code: 'ftest(() => { });',
      errors: [
        {
          messageId: 'noFocusedTests',
        },
      ],
    },
  ],
});
