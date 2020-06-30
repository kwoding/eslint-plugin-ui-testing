# Disallow css selector tied to page layout

![cypress-badge][] ![playwright-badge][] ![puppeteer-badge][] ![testcafe-badge][] ![webdriverio-badge][]

Css selectors should not be tied to page layout. Page layout can be changed frequently. Css locators that contains two or more times a ` ` (space) or a `>` are considered to be tied to page layout.

## Rule Details

Examples of **incorrect** code for this rule:

```js
cy.get('.abc #def > ["data-test"="test"]'); // options: 'cypress'
t.drag('.abc #def > ["data-test"="test"]', 360, 0, { offsetX: 10, offsetY: 10 }); // options: 'testcafe'
page.selectOption('.abc #def > ["data-test"="test"]'); // options: 'playwright'
page.hover('.abc #def > ["data-test"="test"]'); // options: 'puppeteer'
$('.abc #def > ["data-test"="test"]'); // options: 'webdriverio'

```

Examples of **correct** code for this rule:

```js
cy.wait('["data-test"="test"]') // options: 'cypress'
t.drag('.abc ["data-test"="test"]', 360, 0, { offsetX: 10, offsetY: 10 }); // options: 'testcafe'
page.selectOption('["automation-id"="test"]'); // options: 'playwright'
page.hover('#id #element'); // options: 'puppeteer'
$('.abc #def'); // options: 'webdriverio'
```

## Options

The supported automation tools for this rule are: `cypress`, `playwright`, `puppeteer`, `testcafe` and `webdriverio`.

```json
{
  "ui-testing/no-hard-wait": ["error", "webdriverio"]
}
```

[cypress-badge]: https://img.shields.io/badge/cypress-black
[playwright-badge]: https://img.shields.io/badge/playwright-blue
[puppeteer-badge]: https://img.shields.io/badge/puppeteer-3eb489
[testcafe-badge]: https://img.shields.io/badge/testcafe-lightblue
[webdriverio-badge]: https://img.shields.io/badge/webdriverio-orange
