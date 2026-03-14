'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  mobile?: boolean;
}

export function LanguageSwitcher({
  currentLocale,
  mobile = false,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  if (mobile) {
    return (
      <div className="space-y-1 border-t border-stone-200 pt-4">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={cn(
              'block w-full text-left px-4 py-2 text-base font-medium transition-colors',
              currentLocale === locale
                ? 'bg-stone-100 text-slate-900'
                : 'text-slate-600 hover:bg-stone-50 hover:text-slate-900'
            )}
          >
            {localeNames[locale]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
      >
        {localeNames[currentLocale]}
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg border border-stone-200 py-1 z-20">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={cn(
                  'block w-full text-left px-4 py-2 text-sm transition-colors',
                  currentLocale === locale
                    ? 'bg-stone-50 text-slate-900 font-medium'
                    : 'text-slate-700 hover:bg-stone-50'
                )}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
