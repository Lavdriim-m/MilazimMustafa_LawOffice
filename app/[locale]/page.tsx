import Image from 'next/image';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { ContactForm } from '@/components/ContactForm';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/i18n';
import { Scale, Shield, Users, BookOpen, Globe, Award } from 'lucide-react';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);
  const tSq = getTranslations('sq');

  const services = [
    {
      icon: Scale,
      title: t.services.sections[0]?.title ?? tSq.services.sections[0].title,
      description: t.services.sections[0]?.description ?? tSq.services.sections[0].description,
    },
    {
      icon: Shield,
      title: t.services.sections[1]?.title ?? tSq.services.sections[1].title,
      description: t.services.sections[1]?.description ?? tSq.services.sections[1].description,
    },
    {
      icon: Users,
      title: t.services.sections[2]?.title ?? tSq.services.sections[2].title,
      description: t.services.sections[2]?.description ?? tSq.services.sections[2].description,
    },
  ];

  const values = [
    {
      icon: BookOpen,
      title: t.about.why.items[0]?.title ?? tSq.about.why.items[0].title,
      description: t.about.why.items[0]?.description ?? tSq.about.why.items[0].description,
    },
    {
      icon: Shield,
      title: t.about.why.items[3]?.title ?? tSq.about.why.items[3].title,
      description: t.about.why.items[3]?.description ?? tSq.about.why.items[3].description,
    },
    {
      icon: Globe,
      title: t.about.why.items[5]?.title ?? tSq.about.why.items[5].title,
      description: t.about.why.items[5]?.description ?? tSq.about.why.items[5].description,
    },
  ];

  return (
    <>
      <section className="relative bg-gradient-to-br from-stone-50 to-stone-100 py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                {t.hero.title}
              </h1>
              <p className="mt-6 text-lg lg:text-xl leading-relaxed text-slate-700 max-w-2xl">
                {t.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button href={`/${locale}/services`} variant="primary">
                  {t.hero.cta.services}
                </Button>
                <Button href={`/${locale}#contact`} variant="outline">
                  {t.hero.cta.contact}
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-[3/4] lg:aspect-square max-w-md mx-auto lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 to-slate-600/10 -rotate-3" />
                <Image
                  src="/portrait.jpeg"
                  alt="Milazim Mustafa"
                  fill
                  className="object-cover shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <SectionHeading
              title={t.home.servicesPreview.title}
              subtitle={t.home.servicesPreview.description}
              centered
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group p-8 border border-stone-200 hover:border-teal-600 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="w-14 h-14 bg-teal-100 flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                    <Icon className="h-7 w-7 text-teal-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button href={`/${locale}/services`} variant="primary">
              {t.home.aboutPreview.cta}
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-stone-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeading
                title={t.home.aboutPreview.title}
                subtitle={t.home.aboutPreview.description}
              />
              <div className="mt-8 space-y-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-teal-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          {value.title}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8">
                <Button href={`/${locale}/about`} variant="outline">
                  {t.home.aboutPreview.cta}
                </Button>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-12 border border-stone-200 shadow-sm">
              <div className="space-y-8">
                <div>
                  <div className="text-4xl font-bold text-teal-700 mb-2">20+</div>
                  <p className="text-slate-600">
                    {locale === 'sq' ? 'Vjet përvojë profesionale' :
                      locale === 'mk' ? 'Години професионално искуство' :
                      'Years professional experience'}
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-teal-700 mb-2">300+</div>
                  <p className="text-slate-600">
                    {locale === 'sq' ? 'Marrëveshje të ndërmjetësuara' :
                      locale === 'mk' ? 'Посредувани договори' :
                      'Mediated agreements'}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-8 w-8 text-teal-700" />
                    <span className="text-slate-900 font-semibold">
                      {locale === 'sq' ? 'Ndërmjetës i certifikuar' :
                        locale === 'mk' ? 'Сертифициран медијатор' :
                        'Certified Mediator'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">
                    {locale === 'sq' ? 'Që nga viti 2016' :
                      locale === 'mk' ? 'Од 2016 година' :
                      'Since 2016'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-2">
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none">
                <Image
                  src="/portrait.jpeg"
                  alt="Milazim Mustafa"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <SectionHeading
                title={t.home.biographyPreview.title}
                subtitle={t.home.biographyPreview.description}
              />

              <div className="mt-8 space-y-4 text-slate-600 leading-relaxed">
                <p>{t.biography.career}</p>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                {t.biography.highlights.slice(0, 2).map((highlight, index) => (
                  <div key={index} className="border-l-4 border-teal-600 pl-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button href={`/${locale}/biography`} variant="outline">
                  {t.home.biographyPreview.cta}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactForm translations={t} />
    </>
  );
}
