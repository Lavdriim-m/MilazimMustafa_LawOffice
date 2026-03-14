import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/i18n';
import { Check } from 'lucide-react';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Container>
          <div className="max-w-4xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t.services.title}
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed text-stone-300">
              {t.services.subtitle}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="space-y-16 lg:space-y-24">
            {t.services.sections.map((section, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-700 text-white flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                      {section.title}
                    </h2>
                    {section.description && (
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {section.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pl-18 ml-6 border-l-2 border-stone-200 group-hover:border-teal-600 transition-colors duration-300">
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <Check className="h-6 w-6 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 lg:mt-24 bg-stone-50 p-8 lg:p-12 border-l-4 border-teal-600">
            <div className="max-w-3xl">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                {t.services.cta}
              </p>
              <Button href={`/${locale}#contact`} variant="primary">
                {t.nav.contact}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
