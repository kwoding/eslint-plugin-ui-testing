# Disallow tag name selector

![webdriverio-badge][]

Tag name selectors are not recommended. Use css selectors instead.

## Rule Details

Examples of **incorrect** code for this rule:

```js
$('<something />');
$('<some-tag   />');
$('<some-tag>');
```

Examples of **correct** code for this rule:

```js
$('.abc #def');
$('.abc > #def');
$('[data-test="some-identifier"]');
```

[webdriverio-badge]: https://img.shields.io/badge/webdriverio-orange
