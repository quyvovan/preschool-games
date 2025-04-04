import i18n from '.';

export function translate(key: string, option?: object) {
  return key ? i18n.t(key, option) : '';
}
