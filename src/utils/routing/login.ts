import URI from 'urijs';
import { IGetUrlParamsBase } from '@/types';
import { isMatchedRouterPattern } from '../router';
import { getAsPath } from '../url';
import { ROUTER_PATH } from './common';

export interface ILoginQueryParams {
  webLinkToken?: string;
}

const CURRENT_ROUTER_PATH = ROUTER_PATH.LOGIN;

export const generateLoginUrl = (query: ILoginQueryParams = {}) => {
  const { webLinkToken } = query;
  const uri = new URI(CURRENT_ROUTER_PATH);

  uri.setSearch({
    webLinkToken,
  });

  return uri.toString();
};

export const getLoginUrlParams = (
  url?: string
): IGetUrlParamsBase<undefined, ILoginQueryParams> | undefined => {
  const currentUrl = url || getAsPath();
  if (!isMatchedRouterPattern(CURRENT_ROUTER_PATH, currentUrl)) {
    return;
  }
  const uri = new URI(currentUrl);
  const currentParams = uri.search(true);

  const newQueryParams: ILoginQueryParams = {
    webLinkToken: currentParams.webLinkToken,
  };

  return {
    path: undefined,
    query: newQueryParams,
  };
};
