import Image from 'next/image';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/i18n';
import { GraduationCap, Briefcase, Award, Users } from 'lucide-react';

export default async function BiographyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  const icons = [GraduationCap, Briefcase, Award, Users];

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {t.biography.title}
              </h1>
              <p className="text-lg lg:text-xl leading-relaxed text-stone-300 mb-8">
                {t.biography.subtitle}
              </p>
              <div className="flex items-center gap-6 text-stone-300">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">20+</div>
                  <p className="text-sm">
                    {locale === 'sq' ? 'Vjet Përvojë' :
                      locale === 'mk' ? 'Години Искуство' :
                      'Years Experience'}
                  </p>
                </div>
                <div className="h-12 w-px bg-stone-600" />
                <div>
                  <div className="text-3xl font-bold text-white mb-1">300+</div>
                  <p className="text-sm">
                    {locale === 'sq' ? 'Marrëveshje' :
                      locale === 'mk' ? 'Договори' :
                      'Agreements'}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                <div className="absolute inset-0 bg-teal-600/20 -rotate-3" />
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
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                {t.biography.intro}
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                {t.biography.career}
              </p>
            </div>

            <div className="space-y-12">
              {t.biography.highlights.map((highlight, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <div
                    key={index}
                    className="group flex gap-6 p-8 bg-stone-50 border-l-4 border-teal-600 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-teal-100 flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300">
                        <Icon className="h-8 w-8 text-teal-700 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl lg:text-2xl font-bold text-slate-900 mb-4">
                        {highlight.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 p-8 lg:p-12 bg-gradient-to-br from-teal-700 to-teal-800 text-white">
              <div className="max-w-3xl">
                <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-6">
                  {locale === 'sq' ? 'Këshillim Profesional dhe i Personalizuar' :
                    locale === 'mk' ? 'Професионална и Персонализирана Консултација' :
                    'Professional and Personalized Consultation'}
                </h3>
                <p className="text-lg text-teal-100 leading-relaxed mb-8">
                  {locale === 'sq' ? 'Me një përvojë të gjatë në sistemin juridik, unë ofrojmë zgjidhje të personalizuara për çdo rast, duke kombinuar ekspertizën profesionale me kujdesin e veçantë për secilin klient.' :
                    locale === 'mk' ? 'Со долгогодишно искуство во правниот систем, нудам персонализирани решенија за секој случај, комбинирајќи професионална експертиза со посебна грижа за секој клиент.' :
                    'With extensive experience in the legal system, I offer personalized solutions for each case, combining professional expertise with special care for every client.'}
                </p>
                <Button href={`/${locale}#contact`} variant="outline" className="border-white text-white hover:bg-white hover:text-teal-800">
                  {t.nav.contact}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
