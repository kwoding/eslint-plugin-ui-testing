import rule, { RULE_NAME } from '../../src/rules/no-disabled-tests';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    'describe(() => {});',
    'it(() => {});',
    'describe(() => { test(() => {}); });',
    'describe.only(() => {});',
    'it.only(() => {});',
    'describe(() => { test.only(() => {}); });',
    'fdescribe(() => {});',
    'describe(() => { fit(() => {}); });',
    'ftest(() => {});',
  ],
  invalid: [
    {
      code: 'describe.skip(() => { });',
      errors: [
        {
          messageId: 'noDisabledTests',
        },
      ],
    },
    {
      code: 'it.skip(() => { });',
      errors: [
        {
          messageId: 'noDisabledTests',
        },
      ],
    },
    {
      code: 'it.concurrent.skip(() => { });',
      errors: [
        {
          messageId: 'noDisabledTests',
        },
      ],
    },
    {
      code: 'describe(() => { test.skip(() => { }); });',
      errors: [
        {
          messageId: 'noDisabledTests',
        },
      ],
    },
    {
      code: 'xdescribe(() => { });',
      errors: [
        {
          messageId: 'noDisabledTests',
        },
      ],
    },
    {
      code: 'describe(() => { xit(() => { }); });',
      errors: [
        {
          messageId: 'noDisabledTests',
        },
      ],
    },
    {
      code: 'xtest(() => { });',
      errors: [
        {
          messageId: 'noDisabledTests',
        },
      ],
    },
  ],
});
