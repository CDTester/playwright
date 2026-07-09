import { test as base } from '@playwright/test';
import { WebSocketTesterPage } from '../pages/websockets/websocketTester';
import { RouteWebSocketPage } from '../pages/websockets/routeWebsocket';

type PageFixtures = {
  webSocketTesterPage: WebSocketTesterPage;
  routeWebSocketPage: RouteWebSocketPage;
};
type WorkerFixtures = {
  envData: object;
};

export const test = base.extend<PageFixtures, WorkerFixtures>({
  envData: [async ({}, use: (data:object) => Promise<void>) => {
    const envDataString: string = process.env.envData as string;
    const data: object = JSON.parse(envDataString) ;
    await use(data); 
  }, { scope: 'worker' }],
  webSocketTesterPage: async ({ page, envData }, use) => {
    // this is what was in the beforeEach of test.spec.ts
    const webSocketTesterPage = new WebSocketTesterPage(page, envData);

    // All that is in the test itself is after the await use
    await use(webSocketTesterPage);
  },
  routeWebSocketPage: async ({ page, envData }, use) => {
    // this is what was in the beforeEach of test.spec.ts
    const routeWebSocketPage = new RouteWebSocketPage(page, envData);

    // All that is in the test itself is after the await use
    await use(routeWebSocketPage);
  }
});

export { expect } from '@playwright/test';