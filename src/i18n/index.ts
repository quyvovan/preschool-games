import i18n from 'i18next';
import Cookie from 'js-cookie';
import { initReactI18next } from 'react-i18next';
import { buildYupLocale } from './buildYupLocale';
import en from './en-US';
import ko from './ko-KR';
import vi from './vi-VN';

const locale = Cookie.get('LANGUAGE');

i18n
  .use(initReactI18next)
  .init(
    {
      lng: locale ? JSON.parse(locale) : 'en',
      fallbackLng: 'en',
      fallbackNS: '',
      resources: {
        en,
        vi,
        ko,
      },
      // have a common namespace used around the full app
      ns: ['common'],
      defaultNS: 'common',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
    },
    buildYupLocale
  )
  .then();

export default i18n;
