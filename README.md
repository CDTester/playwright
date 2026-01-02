# playwright
Repo to learn Playwright

## Build Status
[![Test Status](https://github.com/CDTester/playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/CDTester/playwright/actions/workflows/playwright.yml)
[![Test Report](https://github.com/CDTester/playwright/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/CDTester/playwright/actions/workflows/pages/pages-build-deployment)

## Latest CI/CD Build Report
https://cdtester.github.io/playwright/playwright/
https://cdtester.github.io/playwright/allure/





## Playwright

### Browser 
A browser has the following set-up:
- context - provides a way to operate independent browser sessions. 
- pages - A context can contain multiple pages. This will share resources of the context. e.g. cookies. Page provides methods to interact with a single tab in a browser

### Base Page
The Base page can provide common functions to be used for each test script. They can contain tear up and tear down features.

### Page Obejct Model
Page Object Models provides locators and methods to interact with a specific web page. These pages acn be imported into any test script or fixture to speed up writing and maintaining tests. Any changes to a page only need to be updated in one place. 

The Page Object Model extends the Base Page.

### Fixtures
Fixture files are used to group together Page Object Models, these files can also contain tear up and tear down procedures for those specific group of POMs. The test scripts import the fixture which should contain everything that test needs to run.

### Annotations
Playwright supports tags and annotations that are displayed in the test report.
- test.skip() marks the test as irrelevant and is not executed by Playwright.
- test.fail() marks the test as failing and is executed by Playwright. If the test does not fail, Playwright will complain.
- test.fixme() marks the test as failing and is not executed by Playwright. Use fixme when running the test is slow or crashes.
- test.slow() marks the test as slow and triples the test timeout.
- test.describe() groups together tests to give then the same logical name/feature.
- test('scenario', { tag: [@smoke, @feature] }) tags are a great way to run certain tests in your library by running `npx playwright test --grep @smoke` or ignoring specific tags by running `npx playwright test --grep-invert @smoke`
- test.beforeEach() will run tear up procedures before each test in the group.
- test.afterEach() will run tear down procedures after each test in the group.

### Executing Playwright Tests
Playwright scripts can be executed using the command
```
npx playwright test
```

In this repo, environment specific values are stored in a config file. This contains values like urls, usernames, passwords etc. The module that gets these values requires the env name to be stored in the `process.env` variables. The way I do this is by using package script, e.g.

```json
  "scripts": {
    "test": "playwright test",
    "testChrome": "playwright test --project=chromium",
    "testWebkit": "playwright test --project=webkit"
  },
```

Then running the scripts using:
```
npm run test --testenv=dev1
```

### Playwright Reporter
Playwright comes with a built in reporters:
- list. 
```shell
Running 3 tests using 2 workers
  ✓  1 …sts\Todo\add.spec.ts:45:7 › Add Todo › Item should be cleared from the input field when an item is added @Todo @Add @regression (2.8s)  
  ✓  2 [chromium] › tests\Todo\add.spec.ts:24:7 › Add Todo › Allow an item to be added to ToDo @Todo @Add @smoke (7.1s)
  ✓  3 [chromium] › tests\Todo\add.spec.ts:64:7 › Add Todo › Item should be appended to the bottom of the list @Todo @Add @regression (2.1s)
```
- line.
```shell
Running 3 tests using 2 workers
  3 passed (8.8s)
```
- dot.
```shell
Running 3 tests using 2 workers
···
  3 passed (7.7s)
```
- html. These are opened automatically if the test fails.
```shell
Running 3 tests using 2 workers
  3 passed (10.0s)

To open last HTML report run:
  npx playwright show-report
```
**Summary**
![playwright report summary](./docs/playwright_html_report.png)

**Steps**

![playwright report steps](./docs/playwright_html_report_steps.png)


These can be viewed either by:
- `npx playwright test --reporter=line` This runs the test then launches the reporter
- In the `playwright.config.ts` file.  
```Typescript 
export default defineConfig({
  reporter: [    ['html'] ]
})
```

### Allure Reporter
The Allure reporter offers a richer report with historic run trends and displaying test run by:
 - Suites (when using allure parentSuite, suite and subSuite)
 - Behaviours (when using allure epic, feature and story)
 - Packages
 - Errors (Categories)
 - historical trend graphs
 - test run timeline

Some setup is required in the `playwright.config.ts` file. See [config](#config) section

In the scripts, the following functions can be added from `import * as allure from "allure-js-commons";` :
- allure.owner('Chris');
- allure.tms('PLAY-012');
- allure.issue('BUG-012');
- allure.severity(allure.Severity.CRITICAL);
- allure.parentSuite('ParentSuite: Playwright');
- allure.suite('Suite: Menu Tests');
- allure.subSuite('SubSuite: Menu - Large Screen');
- allure.epic('Epic: TodoMVC');
- allure.feature('Feature: Add ToDo Item');
- allure.story('Story: Add ToDo Item to the list');
- allure.step(`GIVEN ${homePage.url} has loaded`, async ( step ) => { await homePage.goto(); });
- step.parameter('Page Title', await homePage.page.title());
- allure.attachmentPath(filename, path, {contentType: allure.ContentType.PNG, fileExtension: 'png'});

**Allure report: Overview**
This screen of the report provides an overview of:
- how many tests were run and their status. 
- Environment information that is set up in the playwright config file.
- Test failure category summary. Test failures are assigned categories that indicate whether tests failed due to product issues or test issues.
- Trends from previous runs, how the current test run compares to previous runs.

*attach screenshot*

**Allure report: Suites**
If you design your tests using parentSuite/suite/subSuite, then this page orders your tests using that suite structure. 

![Allure suites](./docs/allure_report_suites.png)

NOTE: this image shows suites for chromium, firefox and webkit. These come from tests that are designed using behaviour (epic/feature/story).


**Allure report: Behaviors**
If you design your tests using epic/feature/story, then this page orders your tests using that behaviour structure. 

![Allure suites](./docs/allure_report_behavior.png)

NOTE: this image shows tests that are not designed using behaviour features. These tests are show in an unstructured manor..


**Allure report: Packages**
The Packages pages shows the test run reports based by package name. Ignoring any suite/behaviour structure.

![Allure suites](./docs/allure_report_package.png)



**Allure report: Graphs**
This screen of the report provides historic trends.... tbc

*attach screenshot*

### Config
The `playwright.config.ts` file configures how your test run.
- `testDir: './tests'` Location of tests. When running `npx playwright test` this is the location of the tests to be run
- `fullyParallel: true`  Allows tests to be run in parallel mode. 
- `workers: process.env.CI ? 4 : undefined` This tells the CI process to use 4 workers in parallel mode or use default number for local runs.
- `reporter: [
  ['html'], 
  ['allure-playwright',{
    detail: true,
    outputFolder: 'allure-results',
    suiteTitle: false,
    categories: [
      { name: 'Critical failures', messageRegex: '.*critical.*' },
      { name: 'test script failures', messageRegex: '.*Error: locator.*' }
    ],
    environmentInfo: { 
      TEST_ENVIRONMENT: process.env.npm_config_testenv,
      NODE_VERSION: process.version, 
      OS: process.platform, 
      PLAYWRIGHT_VERSION: require('playwright/package.json').version, 
    },
    links: {
      issue: {
        urlTemplate: 'https://jira.example.com/browse/%s',
        nameTemplate: '%s'
      },
      tms: {
        urlTemplate: 'https://tms.example.com/testcase/%s',
        nameTemplate: '%s'
      }
    },
    openAlluredir: 'playwright-report/allure-results',
  }]
  ]` This defines what reporters to be used including the config for each reporter.
- `use: {}` Options:
    - `headless: true`. Sets whether tests are to be run headless or not.
    - `screenshot: 'only-on-failure'`. Other option are on, off, retain-on-failure
    - `video: 'retain-on-failure'`. Other options are on, off, on-first-retry
    - `viewport: { width: 1200, height: 700 }`. Sets screen size. 
    - `geolocation: { latitude: 29.97918, longitude: 31.13420 }`. Sets user location
- `projects: []`. Configures projects for test to be run on different browsers
    - `{name: 'chromium', use: { ...devices['Desktop Chrome'] } }`
    - `{name: 'firefox', use: { ...devices['Desktop Firefox'] } }`
    - `{name: 'webkit', use: { ...devices['Desktop Safari'] } }`
    - `{name: 'Mobile Safari', use: { ...devices['iPhone 12'], isMobile: true } }`

### Locators
Use playwright getBy...() locators when possible as they have auto-waiting and retry-ability features. 
- .getByRole() to locate by explicit and implicit accessibility attributes.
- .getByText() to locate by text content.
- .getByLabel() to locate a form control by associated label's text.
- .getByPlaceholder() to locate an input by placeholder.
- .getByAltText() to locate an element, usually image, by its text alternative.
- .getByTitle() to locate an element by its title attribute.
- .getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

See more details about those here [Locators](./docs/locators.txt).

Other locators:
  - text: text='text to find' (add single quotes for exact match)
  - id: id='id value' (add single quotes for exact match)
  - xpath: //selector[@attribute='value']
  - css: 
    - by class:     selector.classname | .classname
    - by id:        selector#idname | #idname
    - by atribute:  selector[attribute=value] | [attribute=value]




### Agents
Run init-agents to initialise AI agents

Currently you can use vscode or claude as the AI agent (loop)

```bash
 playwright init-agents --loop=vscode

 🎭 Using project "chromium" as a primary project
 📝 specs\README.md - directory for test plans
 🌱 tests\seed.spec.ts - default environment seed file
 🤖 .github\agents\playwright-test-generator.agent.md - agent definition
 🤖 .github\agents\playwright-test-healer.agent.md - agent definition
 🤖 .github\agents\playwright-test-planner.agent.md - agent definition
 🔧 .vscode\mcp.json - mcp configuration
 🔧 .github\workflows\copilot-setup-steps.yml - GitHub Copilot setup steps


 🔧 TODO: GitHub > Settings > Copilot > Coding agent > MCP configuration
------------------------------------------------------------------
{
  "mcpServers": {
    "playwright-test": {
------------------------------------------------------------------
{
  "mcpServers": {
------------------------------------------------------------------
{
------------------------------------------------------------------
{
------------------------------------------------------------------
------------------------------------------------------------------
{
  "mcpServers": {
    "playwright-test": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "playwright",
        "run-test-mcp-server"
      ],
      "tools": [
        "*"
      ]
    }
  }
}
------------------------------------------------------------------
 ✅ Done.
```

This creates some folders in .github folder


#### Agent- Planner
Planner agent explores your app and produces a test plan for one or many scenarios and user flows.

In the newly created `tests\seed.spec.ts` file, add any fixtures you may want to use. In this example I am using the ToDo fixture as I want to create a test plan of the todo app.

```typescript
import { test, expect } from '../fixtures/todoFixture';
import * as allure from "allure-js-commons";

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // generate code here.
  });
});
```

Now open a chat window and select `playwright-test-planner` and ask:

```
generate a test plan for usong the ToDo app and save as Todo_Plan in the specs folder
```

The following is produced:

![Planner](./docs/agentPlanner.png)

The plan is saved [here](./specs/Todo_Plan.md)

NEXT STEP TO COMPARE ORIGINAL TESTS TO TEST PLAN.......

#### Agent - Generator
TBC

#### Agent - Healer
TBC

