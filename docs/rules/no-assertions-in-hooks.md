# Disallow assertions in hooks

![recommended-badge][]

Assertions should not be part of before/after hooks. The key of an assertion is to explicitly test something which should be obviously part of the test and not part of any hooks.

## Rule Details

Examples of **incorrect** code for this rule:

```js
beforeEach(() => {
    expect(true).to.be.true;
});

afterAll(() => {
    expect(true).to.be.true;
});
```

Examples of **correct** code for this rule:

```js
describe('test suite', () => {
    beforeEach(() => {
        setUp();
    });

    afterEach(() => {
        cleanUp();
    });

    it('should assert something', () => {
        expect(true).to.equal(true);
    });
});
```

## Options

The `assertCommands` array contains the assert function names to match on. This will override the defaults.

```json
{
    "ui-testing/no-assertions-in-hooks": [
        "error",
        {
            "assertCommands": ["expect"]
        }
    ]
}
```

[recommended-badge]: https://img.shields.io/badge/recommended-brightgreen
