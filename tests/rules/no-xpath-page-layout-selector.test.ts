import rule, { RULE_NAME } from '../../src/rules/no-xpath-page-layout-selector';
import { createRuleTester } from '../utils/rule-tester.util';

const ruleTester = createRuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    "$('//submit/button');",
    '$(\'//cancel/button[@id="element"]\');',
    '$(\'//*[@id="element_id"]\');',
    '$(\'//*[contains(@Class, "someClass")])[2]\')',
  ],
  invalid: [
    {
      code: '$("/submit/button");',
      errors: [
        {
          messageId: 'noXpathPageLayoutSelector',
        },
      ],
    },
    {
      code: '$("/search/submit/button");',
      errors: [
        {
          messageId: 'noXpathPageLayoutSelector',
        },
      ],
    },
    {
      code: '$("//search/submit/button");',
      errors: [
        {
          messageId: 'noXpathPageLayoutSelector',
        },
      ],
    },
    {
      code: '$("/confirmation/book/message[text()]");',
      errors: [
        {
          messageId: 'noXpathPageLayoutSelector',
        },
      ],
    },
  ],
});
