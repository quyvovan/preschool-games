import { TFunction } from 'i18next';
import * as yup from 'yup';

/**
 * Builds the Yup Locale
 */
export function buildYupLocale(_: unknown, t: TFunction): void {
  yup.setLocale({
    string: {
      email: t('validate:you_entered_invalid_email_format'),
      min: ({ min, path: field }) =>
        t('validate:$field_must_contain_at_least_$min_characters', {
          min,
          field,
        }),
      max: ({ max, path: field }) =>
        t('validate:$field_can_contain_up_to_$max_characters', {
          max,
          field,
        }),
    },
  });
}
