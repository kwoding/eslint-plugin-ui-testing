# Disallow link text selector

Link text selectors are not recommended. Use css selectors instead.

## Rule Details

Examples of **incorrect** code for this rule:

```js
$('=link-text');
$('*=link-text');
$('=link text');
```

Examples of **correct** code for this rule:

```js
$('.abc #def');
$('.abc > #def');
$('[data-test="some-identifier"]');
```
