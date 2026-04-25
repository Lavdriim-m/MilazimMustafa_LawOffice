import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { getTranslations } from '@/lib/translations';
import { client } from '@/lib/sanity/client';
import { postsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Locale } from '@/lib/i18n';
import { CalendarDays, ArrowRight } from 'lucide-react';

export const revalidate = 60;

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  publishedAt?: string;
  excerpt?: string;
}

function formatDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(
    locale === 'sq' ? 'sq-AL' : locale === 'mk' ? 'mk-MK' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  const posts: Post[] = await client.fetch(postsQuery);

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-teal-400 text-sm font-medium tracking-widest uppercase mb-4">
              {t.blog.eyebrow}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t.blog.title}
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed text-stone-300">
              {t.blog.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Posts grid */}
      <section className="py-16 lg:py-24 bg-stone-50">
        <Container>
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-stone-200 mx-auto mb-6 flex items-center justify-center">
                <CalendarDays className="h-8 w-8 text-stone-400" />
              </div>
              <p className="text-slate-500 text-lg">{t.blog.noPosts}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/${locale}/blog/${post.slug.current}`}
                  className="group flex flex-col bg-white border border-stone-200 hover:border-teal-600 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(640).height(360).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <span className="font-serif text-white/30 text-5xl font-bold">M</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {post.publishedAt && (
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt, locale)}
                        </time>
                      </div>
                    )}

                    <h2 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-4 text-teal-700 text-sm font-medium">
                      {t.blog.readMore}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="h-1 bg-teal-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
