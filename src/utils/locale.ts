export enum LanguageEnum {
  None = 'none',
  vi_VN = 'vi',
  en_US = 'en',
  ko_KR = 'ko',
}

export enum LocaleEnum {
  Vi = 'vi',
  Ko = 'ko',
  En = 'en',
}

export enum LocaleServerEnum {
  VN = 'vn',
  EN = 'en',
  KO = 'ko',
}

export const adapterLocaleByLang = (language: LanguageEnum) => {
  switch (language) {
    case LanguageEnum.vi_VN:
      return LocaleEnum.Vi;
    case LanguageEnum.ko_KR:
      return LocaleEnum.Ko;
    default:
      return LocaleEnum.En;
  }
};

export const transformLocaleToServerLocale = (locale: string) => {
  switch (locale) {
    case LocaleEnum.Vi:
      return LocaleServerEnum.VN;
    case LocaleEnum.Ko:
      return LocaleServerEnum.KO;
    default:
      return LocaleServerEnum.EN;
  }
};

export const dayOfWeekFormatter = (day: string, language: LanguageEnum) =>
  language === LanguageEnum.vi_VN ? day : day.substring(0, 1);
