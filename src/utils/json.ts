export const parse = <T extends {}>(str?: string): T | undefined => {
  if (str === undefined) return;

  try {
    return JSON.parse(str) as T;
  } catch (e) {
    return undefined;
  }
};

type TObjectOrUndefined<T> = T extends object | null | number | string | boolean
  ? string
  : undefined;

const stringify = <T>(obj: T): TObjectOrUndefined<T> => {
  try {
    return JSON.stringify(obj) as TObjectOrUndefined<T>;
  } catch (error) {
    return undefined as TObjectOrUndefined<T>;
  }
};

export const cloneToPlainObject = <T extends {}>(obj?: T): T | undefined => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const jsonResult = stringify(obj);
  if (jsonResult) {
    return parse(jsonResult);
  }

  return undefined;
};

export const jsonUtil = {
  parse,
  stringify,
  cloneToPlainObject,
};
