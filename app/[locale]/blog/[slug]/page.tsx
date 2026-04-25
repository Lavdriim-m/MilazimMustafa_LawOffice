import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { getTranslations } from '@/lib/translations';
import { client } from '@/lib/sanity/client';
import { postQuery, postSlugsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Locale } from '@/lib/i18n';
import { CalendarDays, ArrowLeft } from 'lucide-react';

export const revalidate = 60;

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  publishedAt?: string;
  excerpt?: string;
  body?: any[];
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(postSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

function formatDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(
    locale === 'sq' ? 'sq-AL' : locale === 'mk' ? 'mk-MK' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-serif text-2xl lg:text-3xl font-bold text-slate-900 mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-xl lg:text-2xl font-bold text-slate-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-slate-700 leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-teal-600 pl-6 py-2 my-8 bg-stone-50">
        <p className="text-slate-700 italic text-lg leading-relaxed">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-none space-y-2 mb-6 ml-0">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3 text-slate-700">
        <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-600" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-slate-700">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="my-10 relative aspect-video">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ''}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  const post: Post | null = await client.fetch(postQuery, { slug });

  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Container>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-sm mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.blog.backToBlog}
          </Link>

          <div className="max-w-3xl">
            {post.publishedAt && (
              <div className="flex items-center gap-2 text-teal-400 text-sm mb-4">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt, locale)}
                </time>
              </div>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 text-lg text-stone-300 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Article body */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Main image — constrained to content width */}
            {post.mainImage && (
              <div className="relative aspect-video overflow-hidden mb-12 shadow-md">
                <Image
                  src={urlFor(post.mainImage).width(1200).height(675).fit('crop').crop('focalpoint').url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {post.body && (
              <div className="text-base lg:text-lg">
                <PortableText value={post.body} components={portableTextComponents} />
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 pt-10 border-t border-stone-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 text-teal-700 font-medium hover:text-teal-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.blog.backToBlog}
                </Link>
                <Button href={`/${locale}#contact`} variant="primary">
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
