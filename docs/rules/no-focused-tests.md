# Disallow focused tests

Ensure that there no focused tests. Having focused tests can lead to false so-called "green" builds.

## Rule Details

Examples of **incorrect** code for this rule:

```js
describe('test suite', () => {
    it.only('should run only this test', () => {
        doSomething();
    });
});

describe('test suite', () => {
    test.only('should run only this test', () => {
        doSomething();
    });
});

describe.only('only this test suite', () => {
    it('should run a test', () => {
        doSomething();
    });
});

describe('test suite', () => {
    fit('should run only this test', () => {
        doSomething();
    });
});

fdescribe('only this test suite', () => {
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
