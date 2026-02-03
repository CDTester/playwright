import { APIRequestContext, APIResponse, expect, request as playwrightRequest } from '@playwright/test';
import { attachment } from 'allure-js-commons';
import Ajv from 'ajv';

export class BaseApi {
  protected request!: APIRequestContext;
  protected baseURL: string;
  protected defaultHeaders: Record<string, string>;
  private static ajv: any;

  constructor(baseUrl: string, headers: Record<string, string> = {}) {
    this.baseURL = baseUrl;
    this.defaultHeaders = {
      'Accept': '*/*',
      ...headers,
    };
         // Initialize AJV if not already initialized
     if (!BaseApi.ajv) {
       BaseApi.ajv = new Ajv({ allErrors: true, verbose: true });
        
       // Add format validation manually (more compatible than ajv-formats)
        BaseApi.ajv.addFormat('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        BaseApi.ajv.addFormat('date-time', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/);
        BaseApi.ajv.addFormat('uri', /^https?:\/\/.+/);
        BaseApi.ajv.addFormat('uuid', /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
     }
  }

  /* Initialize the API request context, must be called before making any API calls */
  async init(): Promise<void> {
    this.request = await playwrightRequest.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: this.defaultHeaders,
    });
  }

  /* get the base URL */
  get getBaseUrl(): string {
    return this.baseURL;
  }

  /* Set authorization token */
  setAuthToken(type: string, token: string): void {
    switch (type.toLowerCase()) {
      case 'bearer':
        this.defaultHeaders['Authorization'] = `Bearer ${token}`;
        break;
      case 'basic':
        this.defaultHeaders['Authorization'] = `Basic ${token}`;
        break;
      case 'x-api-key':
        this.defaultHeaders['x-api-key'] = token;
        break;
      default:
        throw new Error(`Unsupported auth type: ${type}`);
    }
  }

  /* Remove authorization token */
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
    delete this.defaultHeaders['x-api-key'];
  }

  /* Build full URL with query parameters */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    let url = `${this.baseURL}${endpoint}`;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }
    return url;
  }

  /* GET request with Allure reporting */
  async get( endpoint: string, options: { params?: Record<string, any>; headers?: Record<string, string>; } = {} ): Promise<APIResponse> {
    const url = this.buildUrl(endpoint, options.params);
    const headers = { ...this.defaultHeaders, ...options.headers };
    const reportRequest = `GET ${url}\nHeaders: ${JSON.stringify(headers, null, 2)}`;
    await attachment('Request Details', reportRequest, 'text/plain');

    // measure API response time
    let startTime = Date.now();
    const response = await this.request.get(endpoint, { params: options.params, headers });
    let endTime = Date.now();
    let duration = endTime - startTime;

    await attachment(`Response Time: ${duration} ms`, '', 'text/plain');
    await attachment(`Response Status: ${response.status()}`, response.statusText(), 'text/plain');
    await attachment('Response Headers', JSON.stringify(response.headers(), null, 2), 'application/json');
    await this.responseBody(response, true);

    return response;
  }

  /* POST request with Allure reporting  */
  async post(endpoint: string, options: { data?: any; params?: Record<string, any>; headers?: Record<string, string>; } = {}): Promise<APIResponse> {
    const url = this.buildUrl(endpoint, options.params);
    const headers = { ...this.defaultHeaders, ...options.headers };
    let reportRequest = `POST ${url}\nHeaders: ${JSON.stringify(headers, null, 2)}`;
    if (options.data) {
      reportRequest = reportRequest.concat(`\nBody: ${JSON.stringify(options.data, null, 2)}`);
    }
    await attachment('Request Details', reportRequest, 'text/plain');

    // measure API response time
    let startTime = Date.now();
    const response = await this.request.post(endpoint, { data: options.data, params: options.params, headers, });
    let endTime = Date.now();
    let duration = endTime - startTime;
    await attachment(`Response Time: ${duration} ms`, '', 'text/plain');
    await attachment(`Response Status: ${response.status()}`, response.statusText(), 'text/plain');
    await attachment('Response Headers', JSON.stringify(response.headers(), null, 2), 'application/json');
    await this.responseBody(response, true);

    return response;
  }

  /*PUT request with Allure reporting  */
  async put( endpoint: string, options: { data?: any; params?: Record<string, any>; headers?: Record<string, string>; } = {}  ): Promise<APIResponse> {
    const url = this.buildUrl(endpoint, options.params);
    const headers = { ...this.defaultHeaders, ...options.headers };
    let reportRequest = `PUT ${url}\nHeaders: ${JSON.stringify(headers, null, 2)}`;
    if (options.data) {
      reportRequest = reportRequest.concat(`\nBody: ${JSON.stringify(options.data, null, 2)}`);
    }
    await attachment('Request Details', reportRequest, 'text/plain');

    // measure API response time
    let startTime = Date.now();
    const response = await this.request.put(endpoint, { data: options.data, params: options.params, headers });
    let endTime = Date.now();
    let duration = endTime - startTime;
    await attachment(`Response Time: ${duration} ms`, '', 'text/plain');
    await attachment(`Response Status: ${response.status()}`, response.statusText(), 'text/plain');
    await attachment('Response Headers', JSON.stringify(response.headers(), null, 2), 'application/json');
    await this.responseBody(response, true);

    return response;
  }

  /* PATCH request with Allure reporting  */
  async patch( endpoint: string, options: { data?: any; params?: Record<string, any>; headers?: Record<string, string>; } = {}  ): Promise<APIResponse> {
    const url = this.buildUrl(endpoint, options.params);
    const headers = { ...this.defaultHeaders, ...options.headers };
    let reportRequest = `PATCH ${url}\nHeaders: ${JSON.stringify(headers, null, 2)}`;
    if (options.data) {
      reportRequest = reportRequest.concat(`\nBody: ${JSON.stringify(options.data, null, 2)}`);
    }
    await attachment('Request Details', reportRequest, 'text/plain');

    // measure API response time
    let startTime = Date.now();
    const response = await this.request.patch(endpoint, { data: options.data, params: options.params, headers });
    let endTime = Date.now();
    let duration = endTime - startTime;
    await attachment(`Response Time: ${duration} ms`, '', 'text/plain');
    await attachment(`Response Status: ${response.status()}`, response.statusText(), 'text/plain');
    await attachment('Response Headers', JSON.stringify(response.headers(), null, 2), 'application/json');
    await this.responseBody(response, true);

    return response;
  }

  /* DELETE request with Allure reporting  */
  async delete(endpoint: string, options: { data?: any; params?: Record<string, any>; headers?: Record<string, string>; } = {}): Promise<APIResponse> {
    const url = this.buildUrl(endpoint, options.params);
    const headers = { ...this.defaultHeaders, ...options.headers };

    let reportRequest = `DELETE ${url}\nHeaders: ${JSON.stringify(headers, null, 2)}`;
    if (options.data) {
      reportRequest = reportRequest.concat(`\nBody: ${JSON.stringify(options.data, null, 2)}`);
    }
    await attachment('Request Details', reportRequest, 'text/plain');
  
    // measure API response time
    let startTime = Date.now();
    const response = await this.request.delete(endpoint, { data: options.data, params: options.params, headers, });
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
    const validate = BaseApi.ajv.compile(schema);
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