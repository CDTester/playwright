import fs from 'fs';
import path from 'path';

// load secret environment variables from the .env file
import 'dotenv/config';

// load generic environment variables from the default.json config file
const config = require('config');
const defaults = config.get('envData'); 


/**
 * function to set environment data
 * This function loads environment specific data from config files
*/

export interface EnvConfig {
  // name: string,
  baseUrl: string,
  authType?: string,
  authKey?: string,
  headers?: Record<string, string>,
  [key: string]:  string | number | Record<string, string> | undefined;
}


export default function setEnvData(): void {
  // workflows/playwright.yml sets the TESTENV environment variable to the desired environment (dev, qa, staging, prod) before running the tests. If TESTENV is not set, it defaults to 'dev'.
  // load environment variables from the default.json config file if they are not already set in the environment
  // the default.json has a TESTENV key for running tests locally, only writes if TESTENV not created by CI pipeline.
  for (const [key, value] of Object.entries(defaults)) {
    if (!process.env[key]) {
      process.env[key] = String(value);
    }
  }

  // if the TESTENV environment variable is not set, default to 'dev'
  const env = process.env.TESTENV || 'dev';
  if (env !== 'production' && env !== 'prod') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  // set envData environment variable to the contents of the environment specific config file (e.g. dev.json, qa.json, staging.json, prod.json)
  const pth = path.resolve(process.cwd(), 'config', 'environments', `${env}.json`);
  if (fs.existsSync(pth)) {
    try {
      process.env['envData'] = JSON.stringify(JSON.parse(fs.readFileSync(pth).toString()));
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(`<ERROR> Cannot load/parse the environment data: ${error.message}`);
      }
    }
  }
  else {
    throw new Error(`<ERROR> Cannot find the environment file: ${pth}`);
  }
}