import Cookies from 'js-cookie';
import { COOKIES_NAME } from '../utils/constants';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IApiErrorResponse } from '../interfaces/common';
import { API_ROUTE } from '@/settings';

const UNAUTHORIZED = 401;

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'ngrok-skip-browser-warning': true,
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
          str.push(
            encodeURIComponent(`${p}.${v}`) +
              '=' +
              encodeURIComponent(params[p][v])
          );
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

    http.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${Cookies.get(
        COOKIES_NAME.ACCESS_TOKEN
      )}`;
      return config;
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response, status } = error;
        status === UNAUTHORIZED && window.location.replace('/login');
        if (response) return Promise.reject(response);
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
}

export const http = new Http();
