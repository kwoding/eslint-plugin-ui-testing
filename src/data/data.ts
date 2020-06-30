export type AutomationTool =
  | 'cypress'
  | 'playwright'
  | 'puppeteer'
  | 'testcafe'
  | 'webdriverio';

export type CalleePattern = {
    calleeNamePattern: string,
    objectNamePattern: string,
    propertyNamePattern: string
}

export const LOC_SOF = {
  start: { line: 0, column: 0 },
  end: { line: 0, column: 0 },
};

export const NO_AUTOMATION_TOOL_SET_MESSAGE = 'Please set the appropriate automation tool used, choose one from: cypress, puppeteer, playwright, testcafe, webdriverio';

export const TEST_BLOCKS_PATTERN = '/(((it|test)$)|(^(before|after)(Each|All)$))/';
