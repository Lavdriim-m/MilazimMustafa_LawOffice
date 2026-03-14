# Milazim Mustafa Law Office Website

A complete, polished, responsive, mobile-first multilingual law office website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Multilingual Support**: Albanian (sq), Macedonian (mk), and English (en)
- **4 Core Pages**: Home, Services, About Us, Biography
- **Responsive Design**: Mobile-first approach with elegant desktop layouts
- **Professional Design**: Light, modern, premium feel suitable for a law office
- **Contact Form**: Ready for integration with email services
- **SEO-Friendly**: Proper metadata and semantic HTML structure
- **Performance**: Optimized images and efficient Next.js App Router

## Project Structure

```
project/
├── app/
│   ├── [locale]/                 # Locale-based routing
│   │   ├── layout.tsx            # Main layout with Header/Footer
│   │   ├── page.tsx              # Home page
│   │   ├── services/
│   │   │   └── page.tsx          # Services page
│   │   ├── about/
│   │   │   └── page.tsx          # About Us page
│   │   └── biography/
│   │       └── page.tsx          # Biography page
│   └── globals.css               # Global styles
├── components/
│   ├── Header.tsx                # Sticky header with navigation
│   ├── Footer.tsx                # Footer with contact info
│   ├── LanguageSwitcher.tsx      # Language selection dropdown
│   ├── MobileMenu.tsx            # Mobile hamburger menu
│   ├── ContactForm.tsx           # Contact form component
│   ├── Container.tsx             # Max-width container
│   ├── Button.tsx                # Reusable button component
│   └── SectionHeading.tsx        # Consistent section headings
├── lib/
│   ├── i18n.ts                   # i18n configuration
│   └── translations/
│       ├── index.ts              # Translation exports
│       ├── sq.ts                 # Albanian translations (COMPLETE)
│       ├── mk.ts                 # Macedonian translations (TODO)
│       └── en.ts                 # English translations (TODO)
├── public/
│   ├── logo.svg                  # Law office logo
│   └── portrait.jpeg             # Lawyer portrait
└── middleware.ts                 # Locale routing middleware
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

The website will be available at `http://localhost:3000`, which will redirect to `http://localhost:3000/sq` (Albanian as default).

## URL Structure

The website uses locale-based routing:

- **Albanian**: `/sq` (default)
- **Macedonian**: `/mk`
- **English**: `/en`

Examples:
- Home: `/sq`, `/mk`, `/en`
- Services: `/sq/services`, `/mk/services`, `/en/services`
- About: `/sq/about`, `/mk/about`, `/en/about`
- Biography: `/sq/biography`, `/mk/biography`, `/en/biography`


## Contact Form Integration

The contact form is currently set up for frontend only. To integrate with a real email service:

### Option 1: Formspree (Recommended for simplicity)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Open `/components/ContactForm.tsx`
4. In the `handleSubmit` function, uncomment and update:
   ```typescript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formState),
   });

   if (response.ok) {
     setStatus('success');
     setFormState({ name: '', email: '', phone: '', message: '' });
   } else {
     setStatus('error');
   }
   ```

### Option 2: EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Install the package: `npm install @emailjs/browser`
3. Set up your email service and template
4. In `/components/ContactForm.tsx`, import and use:
   ```typescript
   import emailjs from '@emailjs/browser';

   await emailjs.send(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     formState,
     'YOUR_PUBLIC_KEY'
   );
   ```

### Option 3: Next.js API Route

1. Create `/app/api/contact/route.ts`:
   ```typescript
   import { NextResponse } from 'next/server';
   import nodemailer from 'nodemailer';

   export async function POST(request: Request) {
     const body = await request.json();

     // Configure your email transport
     const transporter = nodemailer.createTransport({
       // Your SMTP config
     });

     await transporter.sendMail({
       from: body.email,
       to: 'avokat@milazimmustafa.com',
       subject: `Contact form: ${body.name}`,
       text: body.message,
     });

     return NextResponse.json({ success: true });
   }
   ```

2. Update `ContactForm.tsx`:
   ```typescript
   const response = await fetch('/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formState),
   });
   ```

## Design System

### Colors

- **Primary**: Slate (headings, navigation)
- **Accent**: Teal (CTAs, highlights)
- **Background**: Stone/Warm whites
- **Text**: Slate shades for hierarchy

### Typography

- **Headings**: Libre Baskerville (serif, premium feel)
- **Body**: Inter (sans-serif, highly readable)
- **Hierarchy**: Consistent scale (text-4xl → text-3xl → text-2xl → text-xl → text-lg → text-base)

### Spacing

- Consistent 8px-based spacing system
- Generous whitespace for professional feel
- Section padding: `py-16 lg:py-24`

### Responsive Breakpoints

- Mobile: < 768px (default, mobile-first)
- Tablet: ≥ 768px (`md:`)
- Desktop: ≥ 1024px (`lg:`)

## Asset Management

### Logo
Located at `/public/logo.svg` - used in header and footer.

### Portrait Image
Located at `/public/portrait.jpeg` - used on Home page, Biography page.

To replace these assets:
1. Keep the same filenames
2. Place new files in `/public/` directory
3. For best results:
   - Logo: SVG format (scalable)
   - Portrait: High-quality JPEG/PNG, minimum 800px wide

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive down to 320px width

## Performance Optimizations

- Next.js Image component for optimized images
- Font optimization with `next/font`
- Static generation where possible
- Lazy loading for below-fold content

## Deployment

This website is ready to deploy to:

- **Vercel** (recommended for Next.js)
- **Netlify** (configured with netlify.toml)
- **Any hosting that supports Next.js**

### Environment Variables

No environment variables are required for the basic setup. If you add API integrations (contact form, analytics), add them to `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ID=your_id
# or
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
```

## Maintenance

### Adding New Content Sections

1. Add translation strings to all three language files (`/lib/translations/*.ts`)
2. Create or update page components in `/app/[locale]/`
3. Follow existing patterns for consistency

### Updating Contact Information

Update in `/lib/translations/sq.ts` (and mk.ts, en.ts):
```typescript
contact: {
  info: {
    address: 'Your new address',
    phone: 'Your new phone',
    email: 'your@email.com',
  },
}
```

### Adding New Pages

1. Create new page in `/app/[locale]/your-page/page.tsx`
2. Add navigation link in translations
3. Add route to Header and Footer components

## Support & Contact

For questions or support regarding this website:

- **Email**: lavdrim.mustafi03@gmail.com
- **Phone**: +389 71 760 068
- **Website**: www.milazimmustafa.com

## License

© 2026 Milazim Mustafa. All rights reserved.
