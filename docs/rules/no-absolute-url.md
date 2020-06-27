# Disallow absolute url

Absolute urls should not be used in the open url command. Use a base url in the project config instead.

## Rule Details

Examples of **incorrect** code for this rule:

```js
browser.url('https://webdriver.io'); //  options: 'webdriverio'
cy.url('https://docs.cypress.io/'); //  options: 'cypress'
```

Examples of **correct** code for this rule:

```js
browser.url('/some/page'); //  options: 'webdriverio'
cy.url('my/main/page'); //  options: 'cypress'
```

## Options

The supported automation tools for this rule are: `cypress` and `webdriverio`.

```json
{
  "ui-testing/no-absolute-url": ["warn", "webdriverio"]
}
```
