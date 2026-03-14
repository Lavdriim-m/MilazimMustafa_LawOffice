import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { ContactForm } from '@/components/ContactForm';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/i18n';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Container>
          <div className="max-w-4xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t.about.title}
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed text-stone-300">
              {t.about.subtitle}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                {t.about.intro.title}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {t.about.intro.content}
              </p>
            </div>

            <div className="mb-16 p-8 lg:p-12 bg-stone-50 border-l-4 border-teal-600">
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                {t.about.philosophy.title}
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                {t.about.philosophy.content}
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-slate-900 mb-12 text-center">
                {t.about.why.title}
              </h3>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {t.about.why.items.map((item, index) => (
                  <div
                    key={index}
                    className="group p-6 lg:p-8 bg-white border border-stone-200 hover:border-teal-600 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-slate-900 mb-3">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button href={`/${locale}#contact`} variant="primary">
                {t.nav.contact}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <ContactForm translations={t} />
    </>
  );
}
