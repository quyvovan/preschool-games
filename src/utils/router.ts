/**
 * @example
 * removeAllParamsInUrl('/users?name=John&age=20'); // /users
 * removeAllParamsInUrl('/users'); // /users
 */
export const removeAllParamsInUrl = (url: string) => {
  if (!url?.length) return '';
  return url.split('?')[0];
};

/**
 * @example
 * isMatchedRouterPattern('/users', '/users'); // true
 * isMatchedRouterPattern('/users', '/users/1'); // false
 * isMatchedRouterPattern('/users/[id]', '/users/1'); // true
 * isMatchedRouterPattern('/users/[id]/edit', '/users/1/edit'); // true
 * isMatchedRouterPattern('/users/[id]/edit', '/users/1'); // false
 */
export const isMatchedRouterPattern = (pattern: string, routerPath: string) => {
  const path = removeAllParamsInUrl(routerPath);

  if (pattern === path) return true;
  if (!pattern?.length || !path?.length) return false;

  const patternArr = pattern.split('/');
  const pathArr = path.split('/');

  if (patternArr.length !== pathArr.length) return false;

  const isMatched = patternArr.every((patternItem, index) => {
    if (patternItem === '[id]' && Number(pathArr[index])) return true;
    if (patternItem === pathArr[index]) return true;
    return false;
  });

  return isMatched;
};

/**
 * @example
 * getLastMatchedRouterPattern('/products', [ '/products?company_ids=1234','/products', '/products?company_ids=1697']); // products?company_ids=1697
 * getLastMatchedRouterPattern('/products', [ '/products?company_ids=1234','/products?company_ids=1697', '/products']); // products
 */
export const getLastMatchedRouterPattern = (
  pattern: string,
  routerPaths: string[]
) => {
  const matchedRouterPaths = routerPaths.filter((routerPath) =>
    isMatchedRouterPattern(pattern, routerPath)
  );

  return matchedRouterPaths[matchedRouterPaths.length - 1] || undefined;
};

/**
 * @example
 * convertQueryParamToArray('1234'); // [ '1234' ]
 * convertQueryParamToArray([ '1234' ]); // [ '1234' ]
 * convertQueryParamToArray([ '1234', '5678' ]); // [ '1234', '5678' ]
 */
export const convertQueryParamToArray = (params?: string | string[]) => {
  if (!params?.length) return [];
  if (Array.isArray(params)) return params;
  return [params];
};
