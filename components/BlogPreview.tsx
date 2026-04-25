import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity/client';
import { postsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { Container } from './Container';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

export const revalidate = 60;

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  publishedAt?: string;
  excerpt?: string;
}

interface BlogPreviewProps {
  locale: Locale;
  translations: any;
}

function formatDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(
    locale === 'sq' ? 'sq-AL' : locale === 'mk' ? 'mk-MK' : 'en-GB',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );
}

export async function BlogPreview({ locale, translations: t }: BlogPreviewProps) {
  const allPosts: Post[] = await client.fetch(postsQuery);
  const posts = allPosts.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-white">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-teal-600 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-teal-400 text-sm font-medium tracking-widest uppercase">
                {t.blog.eyebrow}
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
              {t.blog.previewTitle}
            </h2>
            <p className="mt-2 text-stone-400 text-sm">
              {t.blog.previewSubtitle}
            </p>
          </div>

          <Link
            href={`/${locale}/blog`}
            className="group inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors flex-shrink-0"
          >
            {t.blog.viewAll}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Link
              key={post._id}
              href={`/${locale}/blog/${post.slug.current}`}
              className="group flex flex-col bg-white/5 border border-white/10 hover:border-teal-500/60 hover:bg-white/10 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-800 flex-shrink-0">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(640).height(360).fit('crop').crop('focalpoint').url()}
                    alt={post.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-white/10 text-6xl font-bold select-none">
                      {index + 1}
                    </span>
                  </div>
                )}
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="text-xs text-teal-400 font-medium mb-2 block"
                  >
                    {formatDate(post.publishedAt, locale)}
                  </time>
                )}

                <h3 className="font-serif text-lg font-bold text-white leading-snug mb-3 group-hover:text-teal-300 transition-colors">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-1.5 mt-4 text-teal-400 text-sm font-medium">
                  <span>{t.blog.readMore}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10 pt-8 border-t border-white/10 flex justify-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-teal-600 text-teal-400 hover:bg-teal-600 hover:text-white text-sm font-medium transition-all duration-200"
          >
            {t.blog.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
