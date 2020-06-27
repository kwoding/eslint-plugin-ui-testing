import missingAssertionIntest from './rules/missing-assertion-in-test';
import noAbsoluteUrl from './rules/no-absolute-url';
import noAssertionsInHooks from './rules/no-assertions-in-hooks';
import noBrowserCommandsInTests from './rules/no-browser-commands-in-tests';
import noCssPageLayoutSelector from './rules/no-css-page-layout-selector';
import noDisabledTests from './rules/no-disabled-tests';
import noFocusedTests from './rules/no-focused-tests';
import noHardWait from './rules/no-hard-wait';
import noImplicitWait from './rules/no-implicit-wait';
import noLinkTextSelector from './rules/no-link-text-selector';
import noTagNameSelector from './rules/no-tag-name-selector';
import noXpathPageLayoutSelector from './rules/no-xpath-page-layout-selector';
import noXpathSelector from './rules/no-xpath-selector';

const recommendedRules = {
    'ui-testing/missing-assertion-in-test': 'error',
    'ui-testing/no-assertions-in-hooks': 'error',
    'ui-testing/no-disabled-tests': 'warn',
    'ui-testing/no-focused-tests': 'warn',
};

export = {
    rules: {
        'missing-assertion-in-test': missingAssertionIntest,
        'no-absolute-url': noAbsoluteUrl,
        'no-assertions-in-hooks': noAssertionsInHooks,
        'no-browser-commands-in-tests': noBrowserCommandsInTests,
        'no-css-page-layout-selector': noCssPageLayoutSelector,
        'no-disabled-tests': noDisabledTests,
        'no-focused-tests': noFocusedTests,
        'no-hard-wait': noHardWait,
        'no-implicit-wait': noImplicitWait,
        'no-link-text-selector': noLinkTextSelector,
        'no-tag-name-selector': noTagNameSelector,
        'no-xpath-page-layout-selector': noXpathPageLayoutSelector,
        'no-xpath-selector': noXpathSelector,
    },
    configs: {
        recommended: {
            plugins: ['ui-testing'],
            rules: recommendedRules,
        },
        cypress: {
            plugins: ['ui-testing'],
            rules: {
                ...recommendedRules,
                'ui-testing/missing-assertion-in-test': [
                    'error',
                    { assertCommands: ['should', 'expect', 'assert'] },
                ],
                'ui-testing/no-absolute-url': ['warn', 'cypress'],
                'ui-testing/no-hard-wait': ['error', 'cypress'],
            },
        },
        playwright: {
            plugins: ['ui-testing'],
            rules: {
                ...recommendedRules,
                'ui-testing/no-browser-commands-in-tests': ['warn', 'playwright'],
                'ui-testing/no-hard-wait': ['error', 'playwright'],
            },
        },
        puppeteer: {
            plugins: ['ui-testing'],
            rules: {
                ...recommendedRules,
                'ui-testing/no-browser-commands-in-tests': ['warn', 'puppeteer'],
                'ui-testing/no-hard-wait': ['error', 'puppeteer'],
            },
        },
        testcafe: {
            plugins: ['ui-testing'],
            rules: {
                ...recommendedRules,
                'ui-testing/missing-assertion-in-test': ['error', { assertCommands: ['expect'] }],
                'ui-testing/no-hard-wait': ['error', 'testcafe'],
            },
        },
        webdriverio: {
            plugins: ['ui-testing'],
            rules: {
                ...recommendedRules,
                'ui-testing/no-absolute-url': ['warn', 'webdriverio'],
                'ui-testing/no-browser-commands-in-tests': ['warn', 'webdriverio'],
                'ui-testing/no-css-page-layout-selector': ['error', 'webdriverio'],
                'ui-testing/no-hard-wait': ['error', 'webdriverio'],
                'ui-testing/no-implicit-wait': ['error'],
                'ui-testing/no-link-text-selector': ['error'],
                'ui-testing/no-tag-name-selector': ['error'],
                'ui-testing/no-xpath-page-layout-selector': ['error'],
                'ui-testing/no-xpath-selector': ['warn'],
            },
        },
    },
};
