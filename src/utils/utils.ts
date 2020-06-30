import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import { parse } from 'path';
import { AutomationTool } from '../data/data';

export const getRuleName = (): string => __filename.slice(__dirname.length + 1, -3);

export const createRule = ESLintUtils.RuleCreator((name) => {
  const ruleName = parse(name).name;

  return `https://github.com/kwoding/eslint-plugin-ui-testing/tree/master/docs/rules/${ruleName}.md`;
});

function getCommandRegExp(command: string) {
  return new RegExp(`^${command.replace('.', '[.]')}$`);
}

export function isObjectPropertyNameInCommands(node: any, commands: string[]): boolean {
  return (
    commands.some((command) => getCommandRegExp(command).test(
      `${node.callee.object.name}.${node.callee.property.name}`,
    ))
        || commands.some((command) => getCommandRegExp(command).test(`.${node.callee.property.name}`))
  );
}

export function isCalleeNameInCommands(node: any, commands: string[]): boolean {
  return commands.some((command) => getCommandRegExp(command).test(`${node.callee.name}`));
}

export function getHardWaitCommands(automationTool: AutomationTool): string[] {
  switch (automationTool) {
    case 'cypress':
      return ['cy.wait'];
    case 'playwright':
      return ['.waitForTimeout'];
    case 'puppeteer':
      return ['.waitFor'];
    case 'testcafe':
      return ['t.wait'];
    case 'webdriverio':
      return ['browser.pause'];
    default:
      return [];
  }
}

export function getWaitCommandsNotInTest(automationTool: AutomationTool): string[] {
  switch (automationTool) {
    // For cypress an abstraction layer to move wait commands to, is not necessarily required
    case 'testcafe':
      return ['t.wait'];
    case 'playwright':
      return ['.waitFor(\\D+)'];
    case 'puppeteer':
      return ['.waitFor', '.waitFor(\\D+)'];
    case 'webdriverio':
      return ['browser.pause', '.waitUntil', '.waitFor(\\D+)'];
    case 'cypress':
    default:
      return [];
  }
}

export function getSelectorCommands(automationTool: AutomationTool): string[] {
  switch (automationTool) {
    case 'cypress':
      return ['cy.get'];
    case 'playwright':
      return [
        '.[\\$]',
        '.(\\$\\$)',
        '.[\\$]eval',
        '.(\\$\\$)eval',
        '.check',
        '.click',
        '.dblclick',
        '.dispatchEvent',
        '.fill',
        '.focus',
        '.getAttribute',
        '.hover',
        '.innerHTML',
        '.innerText',
        '.press',
        '.selectOption',
        '.setInputFiles',
        '.textContent',
        '.type',
        '.uncheck',
        '.waitForSelector',
      ];
    case 'puppeteer':
      return [
        '.[\\$]',
        '.(\\$\\$)',
        '.[\\$]eval',
        '.(\\$\\$)eval',
        '.click',
        '.focus',
        '.hover',
        '.select',
        '.tap',
        '.type',
        '.waitFor',
        '.waitForSelector',
      ];
    case 'testcafe':
      return [
        'Selector',
        't.click',
        't.doubleClick',
        't.rightClick',
        't.typeText',
        't.selectText',
        't.hover',
        't.drag',
        't.setFilesToUpload',
        't.takeElementScreenshot',
        't.switchToIframe',
      ];
    case 'webdriverio':
      return ['[\\$]', '(\\$\\$)'];
    default:
      return [];
  }
}

export function getOpenUrlCommands(automationTool: AutomationTool): string[] {
  switch (automationTool) {
    case 'cypress':
      return ['cy.visit'];
    case 'playwright':
    case 'puppeteer':
      return ['.goto'];
    case 'testcafe':
      return ['fixture.page', 't.page'];
    case 'webdriverio':
      return ['browser.url'];
    default:
      return [];
  }
}

export function getBrowserObjectNames(automationTool: AutomationTool): string[] {
  switch (automationTool) {
    case 'playwright':
    case 'puppeteer':
      return ['page'];
    case 'webdriverio':
      return ['browser'];
      // for cypress/testcafe it is common practice to use `cy` or `t` in tests
    case 'cypress':
    case 'testcafe':
    default:
      return [];
  }
}
