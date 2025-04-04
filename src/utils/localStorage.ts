import { jsonUtil } from './json';

export const LOCAL_STORAGE_KEY = {
  CURRENT_BRANCH: 'currentBranch',
  BRANCHES: 'branches',
  ENABLE_LOG: 'enableLog',
  CREATE_ORDER_FROM_FAVORITE: 'createOrderFromFavorite',
  DASHBOARD_OPTION_DEFAULT: 'dashboardOptionDefault',
  DELIVERY_BILL_OPTION_DEFAULT: {
    BUY: 'deliveryBillOptionDefaultBuy',
    SELL: 'deliveryBillOptionDefaultSell',
  },
};

interface ILocalStorageDataBase<T = any> {
  value: T;
}

const getItem = <T = any>(key: string): T | undefined => {
  if (typeof window !== 'undefined' && localStorage) {
    const data = localStorage.getItem(key);
    if (data) {
      const jsonParsed = jsonUtil.parse<ILocalStorageDataBase<T>>(data);
      if (jsonParsed) {
        return jsonParsed.value;
      }
    }
  }
};

const setItem = <T = any>(key: string, value: T) => {
  if (typeof window !== 'undefined' && localStorage) {
    const data: ILocalStorageDataBase<T> = {
      value,
    };
    const jsonStr = jsonUtil.stringify(data);
    if (jsonStr) {
      localStorage.setItem(key, jsonStr);
      return true;
    }
  }

  return false;
};

const removeItem = (key: string) => {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.removeItem(key);
    return true;
  }

  return false;
};

export const localStorageUtil = {
  getItem,
  setItem,
  removeItem,
};
