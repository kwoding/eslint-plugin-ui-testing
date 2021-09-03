# Disallow wait in tests

![playwright-badge][] ![puppeteer-badge][] ![testcafe-badge][] ![webdriverio-badge][]

Ensure that there no waits in tests directly including before/after hooks. Wait commands should be moved to page objects or to an other abstraction layer for better readibility and mainability of tests (usually less verbose).

## Rule Details

Examples of **incorrect** code for this rule:

```js
it(() => {
    page.waitFor('.abc'); // options: 'puppeteer'
});

beforeEach(() => {
    t.wait(200); // options: 'testcafe'
});

test.concurrent.only(() => {
    element.waitForExists(); // options: 'webdriverio'
});

it(() => {
    // options: 'webdriverio'
    browser.waitUntil(function () {
        $('#someText').getText() === 'I am now different',
            { timeout: 5000, timeoutMsg: 'expected text to be different after 5s' };
    });
});
```

Examples of **correct** code for this rule:

```js
someMethod() {
    // options: 'playwright'
    page.waitForSelector('#id');
 }

someMethod() {
    // options: 'puppeteer'
    page.waitFor('.abc');
 }

someMethod() {
    // options: 'testcafe'
    t.wait(200);
 }

someMethod() {
    // options: 'webdriverio'
    element.waitForDisplayed();
 }
```

## Options

The supported automation tools for this rule are: `playwright`, `puppeteer`, `testcafe` and `webdriverio`.

```json
{
    "ui-testing/no-wait-in-tests": ["error", "webdriverio"]
}
```

[playwright-badge]: https://img.shields.io/badge/playwright-blue
[puppeteer-badge]: https://img.shields.io/badge/puppeteer-3eb489
[testcafe-badge]: https://img.shields.io/badge/testcafe-a4cada
[webdriverio-badge]: https://img.shields.io/badge/webdriverio-orange
