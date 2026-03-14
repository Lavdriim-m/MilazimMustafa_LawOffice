import { sq } from './sq';
import { mk } from './mk';
import { en } from './en';
import type { Locale } from '../i18n';

export const translations = {
  sq,
  mk,
  en,
};

type Translations = typeof sq;

function deepMerge(base: any, override: any): any {
  if (!override) return base;
  const result = { ...base };
  for (const key in override) {
    if (
      override[key] &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key])
    ) {
      result[key] = deepMerge(base[key], override[key]);
    } else if (
      Array.isArray(override[key]) &&
      override[key].length === 0
    ) {
      // Keep base array if override is empty
      result[key] = base[key];
    } else {
      result[key] = override[key];
    }
  }
  return result;
}


export function getTranslations(locale: Locale): Translations {
  const base = translations['sq'];
  if (locale === 'sq') return base;
  return deepMerge(base, translations[locale]);
}
