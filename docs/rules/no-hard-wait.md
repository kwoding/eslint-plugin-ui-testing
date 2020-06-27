# Disallow hard wait

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
