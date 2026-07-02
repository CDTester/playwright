// load secret environment variables from the .env file
import 'dotenv/config';

// load generic environment variables from the default.json config file
const config = require('config');
const defaults = config.get('envData'); 

export default function setenv(): void {
  for (const [key, value] of Object.entries(defaults)) {
    if (!process.env[key]) {
      process.env[key] = String(value);
    }
  }
}