import { BaseApi } from '../BaseApi';
import envData from '../../../utils/loadEnvData';

export class BitlyApi extends BaseApi {

  constructor() {
    const env = new envData('BitlyApi');
    const envConfig = env.getEnvData as any;
    const baseURL = envConfig.apiAuthBearer.baseUrl;
    const headers = { 
      "connection": "keep-alive", 
      "Accept-Encoding": "gzip, deflate, br", 
      "Cache-Control": "no-cache" 
    };
    super(baseURL, headers);

    // set Bearer token for authentication, this can be modified by tests if needed
    this.setAuthToken(envConfig.apiAuthBearer.authType, envConfig.apiAuthBearer.authKey);
  }


  // Get user
  async getUser(): Promise<any> {
    const response = await this.get('/v4/user');
    return response;
  }

}