import fs from 'fs';
import path from 'path';
const config = require('../config/default.json');

/**
 * class to get test env data
 * This class loads environment specific data from config files
*/

export interface EnvConfig {
  // name: string,
  baseUrl: string,
  authType?: string,
  authKey?: string,
  headers?: Record<string, string>,
  [key: string]:  string | number | Record<string, string> | undefined;
}



export default class envData {
  private static instance: envData;
  private _envData: object = {};
  private env: string | undefined;

  // Singleton pattern to ensure only one instance of envData is created per test run
  private constructor() {
    this.env = process.env.TESTENV || 'dev';
    if (this.env !== 'production' && this.env !== 'prod') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }
    console.log(`envData constructed for ${this.env}`);
  }

	public static getEnvData(): object {
		if (!envData.instance) {
			envData.instance = new envData();
		}

    const pth = path.resolve(process.cwd(), 'config', 'environments', `${envData.instance.env}.json`);

    if (fs.existsSync(pth)) {
      try {
        envData.instance._envData = JSON.parse(fs.readFileSync(pth).toString());
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
	return JSON.parse(JSON.stringify(envData.instance._envData));
	}

}