# Disallow hard wait

![cypress-badge][] ![playwright-badge][] ![puppeteer-badge][] ![testcafe-badge][] ![webdriverio-badge][]

Ensure that there no hard waits. Hard waits can lead to brittle tests. Use explicit waits instead.

## Rule Details

Examples of **incorrect** code for this rule:

```js
cy.wait(3000); // options: 'cypress'
t.wait(3000); // options: 'testcafe'
page.waitForTimeout(3000); // options: 'playwright'
page.waitFor(3000); // options: 'puppeteer'
browser.pause(3000); // options: 'webdriverio'
```

Examples of **correct** code for this rule:

```js
cy.wait('@api'); // options: 'cypress'
page.waitFor('#element'); // options: 'puppeteer'
browser.waitUntil(function () {
    $('#someText').getText() === 'I am now different',
        { timeout: 5000, timeoutMsg: 'expected text to be different after 5s' };
}); // options: 'webdriverio'
element.waitForDisplayed(); // options: 'webdriverio'
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
