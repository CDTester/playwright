import { APIRequestContext, APIResponse, request as playwrightRequest } from '@playwright/test';
import { attachment } from 'allure-js-commons';
import Ajv from 'ajv';
import { Serializable } from 'child_process';
import { ReadStream } from 'fs';
import {EnvConfig} from '../../utils/loadEnvData'


interface Options {
  data?: string | Buffer | Serializable;
  form?: { [key: string]: string|number|boolean; }|FormData;
  multipart?: FormData|{ [key: string]: string|number|boolean|ReadStream|{name: string; mimeType: string; buffer: Buffer;}; };
  params?: { [key: string]: string|number|boolean; }|URLSearchParams|string;
  headers?: Record<string, string>;
  timeout?: number;
  maxRetries?: number;
}

export abstract class BaseApi {
  protected request!: APIRequestContext;
  public baseURL: string;
  protected defaultHeaders: Record<string, string>;
  protected options: Options;
  protected ajv: Ajv.Ajv; //InstanceType<typeof Ajv>;


  constructor(config: EnvConfig) {
    this.baseURL = ''; //baseUrl;
    this.defaultHeaders = { 
      "connection": "keep-alive", 
      "Accept-Encoding": "gzip, deflate, br", 
      "Cache-Control": "no-cache",
      "Accept": "*/*", 
    };
    this.options = {};


    const auth:boolean = config.authType ? true : false;
    const authType: string | undefined = auth ? config.authType : undefined;
    const authKey: string | undefined = auth ? config.authKey : 'undefined';
    const allHeaders = { ...this.defaultHeaders, ...config.headers };

    // start building the api client by setting the base URL and headers, 
    // authentication can be set if authType and authKey are provided in envData 
    this.setBaseUrl(config.baseUrl);
    this.setHeaders(allHeaders);
    auth ? this.setAuthToken(authType, authKey) : null;


    // for Schema validation, add format validation manually (more compatible than ajv-formats)
    this.ajv = new Ajv({ allErrors: true, verbose: true });
    this.ajv.addFormat('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    this.ajv.addFormat('date-time', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/);
    this.ajv.addFormat('uri', /^https?:\/\/.+/);
    this.ajv.addFormat('uuid', /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  }

  /* set the base URL */
  setBaseUrl(baseUrl: string): void {
    this.baseURL = baseUrl;
  }

  setHeaders(headers: Record<string, string>): void {
    // if setAuthToken was used before, we need to preserve the Authorization header
    if (this.options.headers === undefined ) {
      this.options.headers = { ...headers };
    }
    else if (this.options.headers['Authorization']) {
      this.options.headers = { ...headers, 'Authorization': this.options.headers['Authorization'] };
    }
    else if (this.options.headers['x-api-key']) {
      this.options.headers = { ...headers, 'x-api-key': this.options.headers['x-api-key'] };
    }
  }

  /* Set authorization token */
  setAuthToken(type: string, token: string): void {
    if (!this.options.headers) {
      this.options.headers = {};
    }
    switch (type.toLowerCase()) {
      case 'bearer':
        this.options.headers['Authorization'] = `Bearer ${token}`;
        break;
      case 'basic':
        this.options.headers['Authorization'] = `Basic ${token}`;
        break;
      case 'x-api-key':
        this.options.headers['x-api-key'] = token;
        break;
      default:
        throw new Error(`Unsupported auth type: ${type}`);
    }
  }

  /* Remove authorization token */
  clearAuthToken(): void {
    if (this.options.headers) {
      delete this.options.headers['Authorization'];
      delete this.options.headers['x-api-key'];
    }
  }

  /* Set Data for post, put and patch requests */
  setData(data: string | Buffer | Serializable): void {
    this.options.data = data;
  }

  /* Set Params for get requests */
  setParams(params: { [key: string]: string|number|boolean; }|URLSearchParams|string): void {
    this.options.params = params;
  }

  /* Build full URL with query parameters */
   private async logRequest(method: string, endpoint: string): Promise<void> {
    let url = `${this.baseURL}${endpoint}`;
    if (this.options?.params !== undefined) {
      const queryString = new URLSearchParams(JSON.stringify(this.options.params)).toString();
      url += `?${queryString}`;
    }
    let reportRequest = `${method.toUpperCase()} ${url}\nHeaders: ${JSON.stringify(this.options.headers, null, 2)}`;
    if (this.options?.data !== undefined) {
      reportRequest = reportRequest.concat(`\nBody: ${JSON.stringify(this.options.data, null, 2)}`);
    }
    await attachment('Request Details', reportRequest, 'text/plain');
  }

  /* Initialize the API request context, must be called before making any API calls */
  async init(): Promise<void> {
    if (!this.request) {
      this.request = await playwrightRequest.newContext({ baseURL: this.baseURL });
    }
  }

  /* build api request and send with Allure reporting, response time measurement and error handling */
  async buildRequest(method: string, endpoint: string): Promise<APIResponse> {
    await this.logRequest(method, endpoint);
    
    // measure API response time
    let startTime = Date.now();

    let response: APIResponse;
    switch (method.toUpperCase()) {
      case 'GET':
        response = await this.request.get(endpoint, this.options);
        break;
      case 'POST':
        response = await this.request.post(endpoint, this.options);
        break;
      case 'PUT':
        response = await this.request.put(endpoint, this.options);
        break;
      case 'PATCH':
        response = await this.request.patch(endpoint, this.options);
        break;
      case 'DELETE':
        response = await this.request.delete(endpoint, this.options);
        break;
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }

    let endTime = Date.now();
    let duration = endTime - startTime;

    await attachment(`Response Time: ${duration} ms`, '', 'text/plain');
    await attachment(`Response Status: ${response.status()}`, response.statusText(), 'text/plain');
    await attachment('Response Headers', JSON.stringify(response.headers(), null, 2), 'application/json');
    await this.responseBody(response, true);

    return response;
  }


  /* response body */
  async responseBody(response: APIResponse, report?: boolean): Promise<any> {
    if (response.headers()['content-type']?.includes('application/json')) {
      if (report) {
        await attachment('Response Body', JSON.stringify(await response.json(), null, 2), 'application/json');
      }
      return await response.json();
    } 
    else {
      if (report) {
        await attachment('Response Body', await response.text(), 'text/plain');
      }
      return await response.text();
    }
  }

  /* Validate response body against JSON schema */
  validateSchema(data: any, schema: any, schemaName: string = 'Schema'): boolean {

    const validate = this.ajv.compile(schema);
    const valid = validate(data);

    if (valid) {
      attachment(`${schemaName} Validation: PASSED`, JSON.stringify({ schema, data }, null, 2), 'application/json' );
    } 
    else {
      const errors = JSON.stringify(validate.errors, null, 2);
      attachment(`${schemaName} Validation: FAILED`, `Errors:\n${errors}\n\nData:\n${JSON.stringify(data, null, 2)}`, 'application/json');
    }

    return valid as boolean;
  }


  /* Close the request context */
  async dispose(): Promise<void> {
    await this.request.dispose();
  }
}