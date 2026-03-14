import Link from 'next/link';
import Image from 'next/image';
import { Container } from './Container';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
  translations: any;
}

export function Footer({ locale, translations }: FooterProps) {
  const navItems = [
    { href: `/${locale}`, label: translations.nav.home },
    { href: `/${locale}/services`, label: translations.nav.services },
    { href: `/${locale}/about`, label: translations.nav.about },
    { href: `/${locale}/biography`, label: translations.nav.biography },
  ];

  return (
    <footer className="bg-slate-900 text-stone-300">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <Link href={`/${locale}`} className="inline-block mb-6">
                <Image
                  src="/logo.svg"
                  alt="Milazim Mustafa Logo"
                  width={140}
                  height={46}
                  className="h-12 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-sm leading-relaxed text-stone-400 max-w-md">
                {translations.footer.description}
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">
                {translations.nav.home}
              </h3>
              <nav className="space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">
                {translations.contact.info.title}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <a href='https://maps.app.goo.gl/4uVCavZw9XKwr5H27'
                  target='_blank'
                  rel='noopener noreferrer'
                  className="text-sm text-stone-400 hover:text-white transition-colors">
                    {translations.contact.info.address}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <a
                    href={`tel:${translations.contact.info.phone.replace(/\s/g, '')}`}
                    className="text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {translations.contact.info.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <a
                    href={`mailto:${translations.contact.info.email}`}
                    className="text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {translations.contact.info.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <p className="text-sm text-stone-400">
                    {translations.contact.hours.weekdays}   |  {translations.contact.hours.saturday}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-stone-500">
                {translations.footer.copyright}
              </p>
              <p className="text-sm text-stone-500">
                Website made by <a href="https://www.linkedin.com/in/lavdrim-mustafi/"
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-white transition-colors'
                >
                  Lavdrim Mustafi
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
