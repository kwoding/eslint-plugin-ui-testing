# Disallow xpath selector

![webdriverio-badge][]

Xpath selectors are not recommended. Use css selectors instead.

## Rule Details

Examples of **incorrect** code for this rule:

```js
$('//submit/button');
$('//cancel/button[@id="element"]');
$('//*[@id="element_id"]');
```

Examples of **correct** code for this rule:

```js
$('.abc #def');
$('.abc > #def');
$('[data-test="some-identifier"]');
```

[webdriverio-badge]: https://img.shields.io/badge/webdriverio-orange
