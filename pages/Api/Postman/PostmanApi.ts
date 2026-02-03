import { BaseApi } from '../BaseApi';
import envData from '../../../utils/loadEnvData';

export class PostmanApi extends BaseApi {

  constructor() {
    const env = new envData('PostmanApi');
    const envConfig = env.getEnvData as any;
    const baseURL = envConfig.apiAuthApiKey.baseUrl;
    const headers = { 
      "connection": "keep-alive", 
      "Accept-Encoding": "gzip, deflate, br", 
      "Cache-Control": "no-cache" 
    };
    super(baseURL, headers);

    // set Bearer token for authentication, this can be modified by tests if needed
    this.setAuthToken(envConfig.apiAuthApiKey.authType, envConfig.apiAuthApiKey.authKey);
  }


  // Get user
  async getMe(): Promise<any> {
    const response = await this.get('/me');
    return response;
  }

}