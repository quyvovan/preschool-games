import { LanguageEnum } from '@/utils';

export interface ILocale {
  key: LanguageEnum;
  label: string;
  value: LanguageEnum;
  img: string;
}

export type TLanguages = 'en' | 'vi' | 'ko';
