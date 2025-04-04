import { jsonUtil } from '../json';
import { CookiesKey } from './cookies-key';
import Cookies from 'js-cookie';

export interface IAuthCookieStore {
  accessToken: string;
}

export const setAccessToken = (accessToken: string) => {
  const jsonEncoded = jsonUtil.stringify<IAuthCookieStore>({ accessToken });
  return !!Cookies.set(CookiesKey.AUTH, jsonEncoded);
};

export const getAccessToken = () => {
  // const storedData = Cookies.get(CookiesKey.AUTH);
  // const authData = jsonUtil.parse<IAuthCookieStore>(storedData);
  // return authData?.accessToken ?? '';
  return true
};

export const removeAccessToken = () => {
  Cookies.remove(CookiesKey.AUTH);
  return true;
};
