import rule, { RULE_NAME } from '../../src/rules/no-link-text-selector';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    '$(\'["data-test"="test"]\');',
    '$(\'["data-test"="test"] .abc\');',
    '$(\'.some-element\');',
  ],
  invalid: [
    {
      code: '$(\'=link-text\');',
      errors: [
        {
          messageId: 'noLinkTextSelector',
        },
      ],
    },
    {
      code: '$(\'*=link-text\');',
      errors: [
        {
          messageId: 'noLinkTextSelector',
        },
      ],
    },
    {
      code: '$(\'=link text\');',
      errors: [
        {
          messageId: 'noLinkTextSelector',
        },
      ],
    },
  ],
});
