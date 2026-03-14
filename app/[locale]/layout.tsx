import type { Metadata } from 'next';
import { Libre_Baskerville, Inter } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getTranslations } from '@/lib/translations';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Milazim Mustafa - Advokat',
  description: 'Studio Ligjore Milazim Mustafa - Besueshmëri dhe shërbime juridike dinjitoze dhe profesionale.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
  const translations = getTranslations(locale);

  return (
    <>
      <Header locale={locale} translations={translations} />
      <main>{children}</main>
      <Footer locale={locale} translations={translations} />
    </>
  );
}
