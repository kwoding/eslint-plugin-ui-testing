# Disallow disabled tests

![recommended-badge][]

Ensure that there no disabled tests. Disabled tests could be forgotten to fix. Usually these tests are temporarily disabled, in order to fix them later.

## Rule Details

Examples of **incorrect** code for this rule:

```js
describe('test suite', () => {
    it.skip('should skip a test', () => {
        doSomething();
    });
});

describe('test suite', () => {
    test.skip('should skip a test', () => {
        doSomething();
    });
});

describe.skip('test suite skipped', () => {
    it('should skip a test', () => {
        doSomething();
    });
});

describe('test suite', () => {
    xit('should skip a test', () => {
        doSomething();
    });
});

xdescribe('test suite skipped', () => {
    it('should skip a test', () => {
        doSomething();
    });
});
```

Examples of **correct** code for this rule:

```js
describe('test suite', () => {
    it('should run a test', () => {
        doSomething();
    });
});

describe('test suite', () => {
    test('should run a test', () => {
        doSomething();
    });
});
```

[recommended-badge]: https://img.shields.io/badge/recommended-brightgreen
