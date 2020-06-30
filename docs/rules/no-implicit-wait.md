# Disallow implicit wait

![webdriverio-badge][]

Ensure that there no implicit wait. This can lead to brittle tests. Use explicit waits instead.

## Rule Details

Examples of **incorrect** code for this rule:

```js
browser.setTimeout({ implicit: '5000'});
browser.setTimeout({ 'pageLoad': 10000, implicit: '5000'});
```

Examples of **correct** code for this rule:

```js
browser.setTimeout();
browser.setTimeout({ 'pageLoad': 10000 });
```

[webdriverio-badge]: https://img.shields.io/badge/webdriverio-orange
