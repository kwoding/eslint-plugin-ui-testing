# eslint-plugin-ui-testing

[![Build Status](https://travis-ci.com/kwoding/eslint-plugin-ui-testing.svg?branch=master)](https://travis-ci.com/kwoding/eslint-plugin-ui-testing)

ESLint plugin that helps following best practices when writing UI tests. It supports the following automation tools (in alphabetical order):

-   Cypress
-   Playwright
-   Puppeteer
-   TestCafe
-   WebdriverIO

## Usage

Prerequisite:

-   [ESLint](http://eslint.org) is installed (`npm i eslint --save-dev`)

1. Install `eslint-plugin-ui-testing`:

```
npm i eslint-plugin-ui-testing --save-dev
```

2. Add the `ui-testing` plugin to the `.eslintrc` configuration file.

```json
{
    "plugins": ["ui-testing"]
}
```

3. Configure the rules as follows by using the recommended ruleset per automation tool. Choose one from:

-   `plugin:ui-testing/cypress`
-   `plugin:ui-testing/playwright`
-   `plugin:ui-testing/puppeteer`
-   `plugin:ui-testing/testcafe`
-   `plugin:ui-testing/webdriverio`

Example:

```json
{
    "extends": ["plugin:ui-testing/webdriverio"]
}
```

### Customization

You can customize specific rules in the `.eslintrc` configuration file.

```
{
    "rules": {
        "ui-testing/no-disabled-tests": "error", // default = warn
        "ui-testing/no-css-page-layout-selector": ["warn", "webdriverio"] // default = error
    }
}
```

-   In case you are using a recommended ruleset as described in step `3` (under `Usage`), then these customized rules will override the default.
-   It is also possible to omit the recommended ruleset and just set each rule specifically as above.

## Overview rules

| Rule                                                                                       | Default | Ruleset                                                                                                  |
| ---------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| [missing-assertion-in-test](docs/rules/missing-assertion-in-test.md)         | `error` | ![recommended-badge][]                                                                                   |
| [no-absolute-url](docs/rules/no-absolute-url.md)                             | `warn`  | ![cypress-badge][] ![webdriverio-badge][]                                                                |
| [no-assertions-in-hooks](docs/rules/no-assertions-in-hooks.md)               | `error` | ![recommended-badge][]                                                                                   |
| [no-browser-commands-in-tests](docs/rules/no-browser-commands-in-tests.md)   | `warn`  | ![playwright-badge][] ![puppeteer-badge][] ![webdriverio-badge][]                                        |
| [no-css-page-layout-selector](docs/rules/no-css-page-layout-selector.md)     | `error` | ![cypress-badge][] ![playwright-badge][] ![puppeteer-badge][] ![testcafe-badge][] ![webdriverio-badge][] |
| [no-disabled-tests](docs/rules/no-disabled-tests.md)                         | `warn`  | ![recommended-badge][]                                                                                   |
| [no-focused-tests](docs/rules/no-focused-tests.md)                           | `warn`  | ![recommended-badge][]                                                                                   |
| [no-hard-wait](docs/rules/no-hard-wait.md)                                   | `error` | ![cypress-badge][] ![playwright-badge][] ![puppeteer-badge][] ![testcafe-badge][] ![webdriverio-badge][] |
| [no-implicit-wait](docs/rules/no-implicit-wait.md)                           | `error` | ![webdriverio-badge][]                                                                                   |
| [no-link-text-selector](docs/rules/no-link-text-selector.md)                 | `error` | ![webdriverio-badge][]                                                                                   |
| [no-tag-name-selector](docs/rules/no-tag-name-selector.md)                   | `error` | ![webdriverio-badge][]                                                                                   |
| [no-wait-in-tests](docs/rules/no-wait-in-tests.md)                           | `warn`  | ![playwright-badge][] ![puppeteer-badge][] ![testcafe-badge][] ![webdriverio-badge][]                    |
| [no-xpath-page-layout-selector](docs/rules/no-xpath-page-layout-selector.md) | `error` | ![webdriverio-badge][]                                                                                   |
| [no-xpath-selector](docs/rules/no-xpath-selector.md)                         | `warn`  | ![webdriverio-badge][]                                                                                   |

Note: All automation tool specific rulesets include the recommended ruleset.

[recommended-badge]: https://img.shields.io/badge/recommended-brightgreen
[cypress-badge]: https://img.shields.io/badge/cypress-black
[playwright-badge]: https://img.shields.io/badge/playwright-blue
[puppeteer-badge]: https://img.shields.io/badge/puppeteer-3eb489
[testcafe-badge]: https://img.shields.io/badge/testcafe-a4cada
[webdriverio-badge]: https://img.shields.io/badge/webdriverio-orange
