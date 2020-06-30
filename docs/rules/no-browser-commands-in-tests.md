# Disallow browser/page commands in tests

![playwright-badge][] ![puppeteer-badge][] ![webdriverio-badge][] 

Browser/page commands should not be used inside tests directly including before/after hooks. Browser/page commands should be moved to page objects or to an other abstraction layer for better readibility and mainability of tests (usually less verbose).

## Rule Details


Examples of **incorrect** code for this rule:

```js
describe('test suite', () => {
    it('should do something', () => {
        browser.url('/'); // options: 'webdriverio'
    });
});

describe('test suite', () => {
    it('should do something', () => {
        // options: 'puppeteer' / 'playwright'
        const page = browser.newPage();
        page.goto('/'); 
        page.type('#element', 'something');
    });
});
```

Examples of **correct** code for this rule:

```js
describe('test suite', () => {
    it('should be able to login', () => {
        myPage.login();
    });
});

describe('test suite', () => {
    beforeAll(() => {
        myPage.visit();
    });

    it('should do something', () => {
        myPage.addItem();
    });
});
```

## Options

The supported automation tools for this rule are: `playwright`, `puppeteer` and `webdriverio`.

```json
{
  "ui-testing/no-browser-commands-in-tests": ["warn", "webdriverio"]
}
```

[playwright-badge]: https://img.shields.io/badge/playwright-blue
[puppeteer-badge]: https://img.shields.io/badge/puppeteer-3eb489
[webdriverio-badge]: https://img.shields.io/badge/webdriverio-orange
