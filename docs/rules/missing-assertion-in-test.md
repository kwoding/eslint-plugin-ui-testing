# Disallow tests without assertions

![recommended-badge][]

Ensure that there no tests without assertions. Tests without assertions do not explicitly test something.

## Rule Details

Examples of **incorrect** code for this rule:

```js
describe('test suite', () => {
    it('should assert something', () => {
        doSomething();
        expect(true).to.equal(true);
    });
    it('should assert something else', () => {
        doSomething();
    });
});
describe('test suite', () => {
    test('should assert something', () => {
        doSomething();
    });
});
```

Examples of **correct** code for this rule:

```js
describe('test suite', () => {
    it('should assert something', () => {
        expect(true).to.equal(true);
    });
    it('should assert something', () => {
        expect(true).to.equal(true);
    });
});

describe('test suite', () => {
    test('should assert something', () => {
        expectAsync(true).to.equal(true);
    });
});

describe('test suite', () => {
    test('should assert something', () => {
        assert(true).to.equal(true);
    });
});
```

## Options

The `assertCommands` array contains the assert function names to match on. This will override the defaults.

```json
{
    "ui-testing/missing-assertion-in-test": [
        "error",
        {
            "assertCommands": ["expect"]
        }
    ]
}
```

[recommended-badge]: https://img.shields.io/badge/recommended-brightgreen
