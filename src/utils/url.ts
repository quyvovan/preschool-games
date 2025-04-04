import { LinkProps } from 'next/link';
import URI from 'urijs';
import { isMatchedRouterPattern } from './router';

export const isExternalLink = (href?: LinkProps['href']): boolean =>
  !href || (typeof href === 'string' && /^(https?:)?\/\//.test(href));

export const addQueryStringToUrl = (
  baseUrl: string,
  params: Record<string, any>
): string => {
  if (typeof window === undefined || !URL || !URLSearchParams) {
    return '';
  }

  const instanceSearchParams: URLSearchParams = new URLSearchParams('');
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      instanceSearchParams.set(key, params[key]);
    }
  });
  const queryStringText = instanceSearchParams.toString();
  if (queryStringText) {
    return `${baseUrl}?${queryStringText}`;
  }

  return baseUrl;
};

export const getAsPath = (): string => {
  if (!window || !window.location) {
    return '';
  }

  return window.location.pathname + window.location.search;
};

/**
 * Get current params are displayed in URL
 * @example Current URL query: ?search="abc"
 *  const existParams = getQueryParamNameExistInUrl(["search", "type"], ROUTER_PATH.PRODUCT_GROUP_LIST, "/products/groups")
 *  existParams ==> ["type"]
 */
export const getQueryParamNameExistInUrl = (
  keys: string[],
  currentRouterPath: string,
  url?: string
) => {
  const currentUrl = url || getAsPath();
  if (!isMatchedRouterPattern(currentRouterPath, currentUrl)) {
    return [];
  }

  const uri = new URI(currentUrl);
  const currentParams = uri.search(true);

  return keys.filter((key) => {
    return currentParams[key] !== undefined;
  });
};
