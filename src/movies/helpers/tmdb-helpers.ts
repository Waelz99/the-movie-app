import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class TMDBHelpers {
  buildRequestConfig(apiKey: string): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };
  }

  async getRequestByEndpoint(
    baseUrl: string,
    endpoint: string,
    apiKey: string,
  ): Promise<AxiosResponse> {
    const url = `${baseUrl}/${endpoint}`;
    try {
      return await axios.get(url, this.buildRequestConfig(apiKey));
    } catch (error) {
      Logger.log(`${url} and ${apiKey}`);
      throw new Error(`GET request failed: ${error.message}`);
    }
  }

  isValidRequest(status: number): boolean {
    return status >= 200 && status <= 299;
  }
}
