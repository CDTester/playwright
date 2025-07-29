# playwright
Repo to learn Playwright


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

