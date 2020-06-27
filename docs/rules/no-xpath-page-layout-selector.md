# Disallow xpath selector tied to page layout

Xpath selectors should not be tied to page layout. Page layout can be changed frequently. Xpath locators which does not start with `//` (relative) or contain more than two `/` are considered to be tied to page layout.

## Rule Details

Examples of **incorrect** code for this rule:

```js
$('/submit/button');
$('//search/submit/button"]');
$('/confirmation/book/message[text()]');
```

Examples of **correct** code for this rule:

```js
$('//submit/button');
$('//cancel/button[@id="element"]');
$('//*[@id="element_id"]');
```

## Options

The supported automation tool for this rule is: `webdriverio`.

```json
{
  "ui-testing/no-xpath-page-layout-selector": ["warn", "webdriverio"]
}
```
