export const locales = ['sq', 'mk', 'en'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'sq';

export const localeNames: Record<Locale, string> = {
  sq: 'Shqip',
  mk: 'Македонски',
  en: 'English',
};

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const localeSegment = segments[1];

  if (locales.includes(localeSegment as Locale)) {
    return localeSegment as Locale;
  }

  return defaultLocale;
}
