import { getCookie } from 'cookies-next';
import { COOKIES_NAME } from '../utils/constants';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { IApiErrorResponse } from '../interfaces/common';
import { logout } from '../helpers/logout';
import { API_ROUTE } from '@/settings';

const headers: Readonly<Record<string, string | boolean>> = {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'ngrok-skip-browser-warning': true,
};

const UNAUTHORIZED = 401;

const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const token = getCookie(COOKIES_NAME.ACCESS_TOKEN);

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  } catch (error: any) {
    throw new Error(error);
  }
};

class Http {
  private instance: AxiosInstance | null = null;
  private urlAPI: string = API_ROUTE;
  private get http(): AxiosInstance {
    return this.instance ? this.instance : this.initHttp();
  }

  static queryParamsURLEncodedString(params: Record<string, any>): string {
    const str: string[] = [];
    for (const p in params) {
      if (typeof params[p] === 'object') {
        for (const v in params[p]) {
          str.push(encodeURIComponent(`${p}.${v}`) + '=' + encodeURIComponent(params[p][v]));
        }
      } else {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
      }
    }
    return str.join('&');
  }

  setUrlAPI(urlAPI: string) {
    this.urlAPI = urlAPI;
  }

  getUrlAPI() {
    return this.urlAPI;
  }

  initHttp() {
    const http = axios.create({
      baseURL: this.urlAPI,
      headers,
      withCredentials: true,
    });
    http.interceptors.request.use(
      (config) => {
        const newHeaders = injectToken(config).headers;
        const newConfig = injectToken(config);
        return {
          ...newConfig,
          headers: {...newHeaders}
        } as InternalAxiosRequestConfig<any>;
      }
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        this.handleError(response);
        if(response) return Promise.reject(response);
        return Promise.reject();
      }
    );

    this.instance = http;
    return http;
  }

  get<T = unknown, R = unknown>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    const query = data ? Http.queryParamsURLEncodedString(data) : '';
    return this.http.get<T, AxiosResponse<R>>(url + '?' + query, config);
  }

  post<T = unknown, R = unknown>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.http.post<T, AxiosResponse<R>>(url, data, config);
  }

  put<T = unknown, R = unknown>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.http.put<T, AxiosResponse<R>>(url, data, config);
  }

  delete<T = unknown, R = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.http.delete<T, AxiosResponse<R>>(url, config);
  }

  private handleError(error: AxiosResponse<IApiErrorResponse>) {
    if(error) error.status === UNAUTHORIZED && logout();
  }
}

export const http = new Http();
