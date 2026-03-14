'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Locale } from '@/lib/i18n';

interface MobileMenuProps {
  locale: Locale;
  translations: any;
}

export function MobileMenu({ locale, translations }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: translations.nav.home },
    { href: `/${locale}/services`, label: translations.nav.services },
    { href: `/${locale}/about`, label: translations.nav.about },
    { href: `/${locale}/biography`, label: translations.nav.biography },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-slate-700 hover:text-slate-900"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-[73px] left-0 right-0 bg-white border-b border-stone-200 shadow-lg z-50 md:hidden">
            <nav className="py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 text-base font-medium text-slate-700 hover:bg-stone-50 hover:text-slate-900 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 px-6">
                <Link
                  href={`/${locale}#contact`}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
                >
                  {translations.nav.contact}
                </Link>
              </div>
              <div className="mt-4 px-2">
                <LanguageSwitcher currentLocale={locale} mobile />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
