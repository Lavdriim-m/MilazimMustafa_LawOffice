'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from './Container';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import type { Locale } from '@/lib/i18n';

interface HeaderProps {
  locale: Locale;
  translations: any;
}

export function Header({ locale, translations }: HeaderProps) {
  const navItems = [
    { href: `/${locale}`, label: translations.nav.home },
    { href: `/${locale}/services`, label: translations.nav.services },
    { href: `/${locale}/about`, label: translations.nav.about },
    { href: `/${locale}/biography`, label: translations.nav.biography },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <Container>
        <div className="flex items-center justify-between h-18 py-4">
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Milazim Mustafa Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <Link
              href={`/${locale}#contact`}
              className="hidden md:inline-flex px-5 py-2 bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              {translations.nav.contact}
            </Link>
            <MobileMenu locale={locale} translations={translations} />
          </div>
        </div>
      </Container>
    </header>
  );
}
