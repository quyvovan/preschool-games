import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IAuthBranch } from '@/types';
import { Cookies, CookiesKey, LanguageEnum, handleAxios } from '@/utils';
import { LOCAL_STORAGE_KEY, localStorageUtil } from './localStorage';

const BASE_HOST = `${process.env.NEXT_PUBLIC_HOST_API}/web/`;
const BASE_URL = `${process.env.NEXT_PUBLIC_HOST_API}/web/${process.env.NEXT_PUBLIC_VERSION_API}`;
const TIME_OUT_API = parseInt(process.env.TIME_OUT_API ?? '0', 10);

export const axiosBaseQuery =
  (
    baseUrl = BASE_URL || ''
  ): BaseQueryFn<{
    url?: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
    version?: string;
  }> =>
  async ({ url, method, data, params, headers, version }) => {
    const auth = await Cookies.load(CookiesKey.AUTH);
    const language = (await Cookies.load(CookiesKey.LANGUAGE)) as LanguageEnum;
    const _branchId = localStorageUtil.getItem<IAuthBranch>(
      LOCAL_STORAGE_KEY.CURRENT_BRANCH
    )?.id;

    if (_branchId) {
      headers = {
        'BRANCH-ID': _branchId,
        ...headers,
      };
    }

    if (version) {
      baseUrl = BASE_HOST + version;
    } else {
      baseUrl = BASE_URL;
    }

    try {
      const defaultConfig: AxiosRequestConfig = {
        baseURL: baseUrl,
        timeout: TIME_OUT_API,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.accessToken}`,
          locale: `${language ?? LanguageEnum.en_US}`,
          ...headers,
        },
      };
      const result = (await Axios.request({
        ...defaultConfig,
        method,
        data,
        params,
        url,
      })) as AxiosRequestConfig;
      return handleAxios(result as AxiosError & AxiosResponse);
    } catch (axiosError) {
      const err = axiosError as AxiosError & AxiosResponse;
      return handleAxios(err);
    }
  };
