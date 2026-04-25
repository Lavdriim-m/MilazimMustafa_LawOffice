# Milazim Mustafa Law Office — Website

A complete, polished, responsive, mobile-first multilingual law office website built with Next.js 16, TypeScript, Tailwind CSS, Sanity CMS, and Resend.

## Features

- **Multilingual**: Albanian (`sq` — default), Macedonian (`mk`), English (`en`) with locale-based routing
- **5 Pages**: Home, Services, About, Biography, Blog
- **Blog powered by Sanity CMS**: Embedded Studio at `/studio`, posts with rich text, images, and excerpts
- **Blog Preview section**: Reusable component placed on every page (Home, Services, About, Biography) showing the latest 3 articles
- **Contact form**: Server-side email delivery via Resend API to `avokat@milazimmustafi.com`
- **Responsive**: Mobile-first, works from 320px to large desktops
- **Deployed on Vercel** via GitHub integration

---

## Project Structure

```
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx           # Locale layout (Header, Footer, fonts)
│   │   ├── page.tsx             # Home
│   │   ├── services/page.tsx    # Services
│   │   ├── about/page.tsx       # About Us
│   │   ├── biography/page.tsx   # Biography
│   │   └── blog/
│   │       ├── page.tsx         # Blog index
│   │       └── [slug]/page.tsx  # Single post
│   ├── api/contact/route.ts     # Resend email API route
│   └── studio/[[...tool]]/page.tsx  # Embedded Sanity Studio
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MobileMenu.tsx
│   ├── LanguageSwitcher.tsx
│   ├── ContactForm.tsx
│   ├── BlogPreview.tsx          # Reusable blog teaser (used on all pages)
│   ├── Container.tsx
│   ├── Button.tsx
│   └── SectionHeading.tsx
├── lib/
│   ├── i18n.ts
│   ├── translations/
│   │   ├── index.ts             # deepMerge logic
│   │   ├── sq.ts                # Albanian — canonical/base (always complete)
│   │   ├── mk.ts                # Macedonian — overrides only
│   │   └── en.ts                # English — overrides only
│   └── sanity/
│       ├── client.ts            # Sanity client (next-sanity)
│       ├── image.ts             # Image URL builder
│       └── queries.ts           # GROQ queries
├── sanity/
│   └── schemaTypes/
│       ├── post.ts              # Post document schema
│       ├── blockContent.ts      # Rich text schema
│       └── index.ts
├── sanity.config.ts             # Sanity Studio configuration
├── middleware.ts                # Locale redirect (excludes /api, /studio)
└── .env.local                   # Local environment variables (gitignored)
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the variables below into `.env.local`:

```
RESEND_API_KEY=re_...
NEXT_PUBLIC_SANITY_PROJECT_ID=tmkmxkvs
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` — redirects to `/sq` (Albanian default).

### 4. Access Sanity Studio locally

Visit `http://localhost:3000/studio` and log in with your Sanity account.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key for contact form emails |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset (usually `production`) |

All three must also be added to **Vercel → Settings → Environment Variables**.

---

## Contact Form

Handled by `app/api/contact/route.ts`. On submission:
- Sends an email to `avokat@milazimmustafa.com` via Resend
- Sets `Reply-To` to the visitor's email so the lawyer can reply directly
- `from` address: `noreply@milazimmustafa.com`

---

## Blog (Sanity CMS)

### Writing posts

The lawyer logs into `https://milazimmustafi.com/studio` with his Sanity account (invited as Editor). From there he can:

- Create, edit, and publish posts
- Add a title, slug (auto-generated), main image with hotspot, excerpt, and rich body text
- Posts appear on the site within 60 seconds (ISR revalidation)

### Schema

Defined in `sanity/schemaTypes/post.ts`:

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Auto-generated from title |
| `mainImage` | image | Supports hotspot/crop |
| `publishedAt` | datetime | Controls order |
| `excerpt` | text | Shown in cards and post hero |
| `body` | blockContent | Rich text with H2, H3, quotes, lists, images, links |

### CORS (required for Studio to work on production)

In [sanity.io/manage](https://sanity.io/manage) → your project → API → CORS Origins, add:
- `https://milazimmustafi.com`
- `http://localhost:3000`

---

## URL Structure

| Page | Albanian | Macedonian | English |
|---|---|---|---|
| Home | `/sq` | `/mk` | `/en` |
| Services | `/sq/services` | `/mk/services` | `/en/services` |
| About | `/sq/about` | `/mk/about` | `/en/about` |
| Biography | `/sq/biography` | `/mk/biography` | `/en/biography` |
| Blog | `/sq/blog` | `/mk/blog` | `/en/blog` |
| Post | `/sq/blog/[slug]` | `/mk/blog/[slug]` | `/en/blog/[slug]` |
| Studio | `/studio` | (no locale) | — |

---

## Translation System

- `lib/translations/sq.ts` is the **canonical base** — must always be complete.
- `mk.ts` and `en.ts` define only strings that differ from Albanian. They are deep-merged on top of `sq` at runtime.
- Empty arrays in override files fall back to the Albanian base.
- **Always add new keys to all three files** — `sq.ts` with real content, `mk.ts` and `en.ts` with at least placeholder strings.

---

## Design System

| Element | Value |
|---|---|
| Heading font | Libre Baskerville (serif) — `--font-serif` |
| Body font | Inter (sans-serif) — `--font-sans` |
| Primary color | Slate (headings, nav) |
| Accent color | Teal (CTAs, borders, icons) |
| Background | Stone / warm white |
| Section padding | `py-16 lg:py-24` |
| Breakpoints | `md:` ≥ 768px, `lg:` ≥ 1024px |

---

## Commands

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check without emit
```

---

## Deployment

Deployed to **Vercel** via GitHub integration (auto-deploys on push to `main`).

---

## Support

- **Developer**: lavdrim.mustafi03@gmail.com / +389 71 760 068
- **Website**: www.milazimmustafa.com

© 2026 Milazim Mustafa. All rights reserved.
