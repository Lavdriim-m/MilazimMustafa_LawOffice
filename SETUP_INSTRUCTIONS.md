# Setup Instructions for Milazim Mustafa Law Office Website

## Quick Summary

This is a complete, production-ready multilingual law office website with:
- ✅ Albanian content (complete and accurate from provided copy)
- ⏳ Macedonian and English content structure (ready for translation)
- ✅ All 4 pages implemented (Home, Services, About, Biography)
- ✅ Responsive design (mobile-first, tablet, desktop)
- ✅ Contact form (frontend ready, needs backend integration)

---

## Part 1: Adding English and Macedonian Translations

### Where to Add Translations

Translation files are located in:
- `/lib/translations/en.ts` - English
- `/lib/translations/mk.ts` - Macedonian

### Current Status

The Albanian file (`/lib/translations/sq.ts`) contains ALL the correct content from your provided PDF. The English and Macedonian files have:
- ✅ Navigation and UI labels translated
- ⏳ Main content marked with `[TODO: ...]` placeholders

### How to Add Translations

**IMPORTANT**: Do NOT change the structure or keys, ONLY translate the string values.

#### Step 1: Open the translation file

For English: `/lib/translations/en.ts`
For Macedonian: `/lib/translations/mk.ts`

#### Step 2: Find and replace TODO markers

Look for lines like:
```typescript
description: '[TODO: Add English translation for services preview description]',
```

Replace with your translation:
```typescript
description: 'Your professional English translation here',
```

#### Step 3: Translate the main content sections

Focus on these key areas:

**Home Page** (`home` object):
- `servicesPreview.description`
- `aboutPreview.title` and `description`
- `biographyPreview.description`

**Services Page** (`services` object):
- `subtitle`
- Each item in `sections` array:
  - `title`
  - `description`
  - All items in the `items` array
- `cta`

**About Page** (`about` object):
- `subtitle`
- `intro.content`
- `philosophy.content`
- All items in `why.items` array (title and description for each)

**Biography Page** (`biography` object):
- `subtitle`
- `intro`
- `career`
- All items in `highlights` array (title and description for each)

#### Step 4: Use Albanian as reference

Open `/lib/translations/sq.ts` and use it as your source for accurate translation. The Albanian content is exactly as provided in your PDF.

### Example Translation

**Before (English):**
```typescript
services: {
  title: 'Our Services',
  subtitle: '[TODO: Add full English services content from Albanian version]',
  sections: [
    {
      title: '[TODO: Service 1 Title in English]',
      description: '[TODO: Service 1 Description]',
      items: [
        '[TODO: Service 1 Item 1]',
      ],
    },
  ],
}
```

**After (English):**
```typescript
services: {
  title: 'Our Services',
  subtitle: 'Milazim Mustafa Law Office provides comprehensive legal assistance, combining extensive experience with a modern approach to solving legal problems in the Republic of North Macedonia and beyond.',
  sections: [
    {
      title: 'Judicial and Administrative Representation',
      description: 'We offer professional protection of your interests at all levels of the judicial system:',
      items: [
        'First Instance Courts and Courts of Appeal.',
        'Supreme Court and Constitutional Court of North Macedonia.',
        // ... etc
      ],
    },
  ],
}
```

---

## Part 2: Connecting the Contact Form

The contact form is located in `/components/ContactForm.tsx`. It's currently frontend-only with simulated submission.

### Option A: Formspree (Easiest - Recommended)

**Why**: No coding required, free tier available, handles spam filtering.

**Steps**:

1. **Sign up**: Go to [formspree.io](https://formspree.io) and create an account

2. **Create a form**: Click "New Form" and get your form endpoint (looks like `https://formspree.io/f/YOUR_FORM_ID`)

3. **Update the code**: Open `/components/ContactForm.tsx` and find the `handleSubmit` function (around line 29)

4. **Replace the simulation code** with:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('sending');

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    });

    if (response.ok) {
      setStatus('success');
      setFormState({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  } catch (error) {
    setStatus('error');
    setTimeout(() => setStatus('idle'), 3000);
  }
};
```

5. **Replace `YOUR_FORM_ID`** with your actual Formspree form ID

6. **Done!** Deploy and test

---

### Option B: EmailJS (No backend needed)

**Why**: Frontend-only solution, good for static hosting.

**Steps**:

1. **Sign up**: Go to [emailjs.com](https://www.emailjs.com)

2. **Install package**:
```bash
npm install @emailjs/browser
```

3. **Setup in EmailJS dashboard**:
   - Add an email service (Gmail, Outlook, etc.)
   - Create an email template with variables: `{{name}}`, `{{email}}`, `{{phone}}`, `{{message}}`
   - Get your Service ID, Template ID, and Public Key

4. **Update the code**: In `/components/ContactForm.tsx`, add at the top:

```typescript
import emailjs from '@emailjs/browser';
```

5. **Replace `handleSubmit`**:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('sending');

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        message: formState.message,
      },
      'YOUR_PUBLIC_KEY'
    );

    setStatus('success');
    setFormState({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  } catch (error) {
    setStatus('error');
    setTimeout(() => setStatus('idle'), 3000);
  }
};
```

6. **Replace the IDs** with your actual EmailJS credentials

---

### Option C: Next.js API Route (Full control)

**Why**: Complete control, can save to database, works with any email provider.

**Steps**:

1. **Install nodemailer**:
```bash
npm install nodemailer
```

2. **Create API route**: Create file `/app/api/contact/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Create transporter (example with Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: email,
      to: 'avokat@milazimmustafa.com',
      subject: `New contact form submission from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
```

3. **Add environment variables**: Create `.env.local`:

```
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**Important**: For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

4. **Update ContactForm.tsx** - replace `handleSubmit`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('sending');

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    });

    if (response.ok) {
      setStatus('success');
      setFormState({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  } catch (error) {
    setStatus('error');
    setTimeout(() => setStatus('idle'), 3000);
  }
};
```

---

## Part 3: Testing the Website

### Local Testing

1. **Start dev server**:
```bash
npm run dev
```

2. **Open in browser**: `http://localhost:3000`

3. **Test all pages**:
   - Home page
   - Services page
   - About Us page
   - Biography page

4. **Test language switcher**:
   - Click the language dropdown in header
   - Switch between Albanian, Macedonian, English
   - Verify the URL changes to `/sq`, `/mk`, `/en`

5. **Test mobile menu**:
   - Resize browser to mobile size (< 768px)
   - Click hamburger menu
   - Verify menu opens and closes smoothly

6. **Test contact form**:
   - Fill in all fields
   - Submit
   - Check for success message
   - Verify form clears after submission

### Responsive Testing

Test on these screen sizes:
- **Mobile**: 375px (iPhone), 360px (Android)
- **Tablet**: 768px (iPad)
- **Desktop**: 1280px, 1920px

Or use browser dev tools:
- Chrome: F12 → Toggle device toolbar (Ctrl+Shift+M)
- Firefox: F12 → Responsive Design Mode (Ctrl+Shift+M)

---

## Part 4: Deployment

### Deploy to Netlify

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Build settings are already configured in `netlify.toml`
   - Click "Deploy"

3. **Add environment variables** (if using API routes):
   - In Netlify dashboard → Site settings → Environment variables
   - Add your EMAIL_USER and EMAIL_PASSWORD

### Deploy to Vercel (Alternative)

1. **Install Vercel CLI** (optional):
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

Or connect via GitHub in the Vercel dashboard.

---

## Part 5: Content Updates

### Updating Contact Information

Edit `/lib/translations/sq.ts` (and mk.ts, en.ts):

```typescript
contact: {
  info: {
    address: 'Your new address here',
    phone: '+389 70 123 456',
    email: 'newemail@domain.com',
    website: 'www.yoursite.com',
  },
  hours: {
    weekdays: 'Monday – Friday: 09:00 – 17:00',
    saturday: 'Saturday: By appointment',
    sunday: 'Sunday: Closed',
  },
}
```

### Replacing Images

**Logo**:
- Replace `/public/logo.svg` with your new logo
- Keep the same filename
- SVG format recommended for scalability

**Portrait**:
- Replace `/public/portrait.jpeg` with new image
- Keep the same filename
- Recommended size: At least 800px wide, high quality

---

## Troubleshooting

### Build fails with type errors
```bash
npm run typecheck
```
Fix any TypeScript errors shown

### Language switcher not working
Check that:
- Middleware is set up correctly in `/middleware.ts`
- All translation files export the correct structure

### Contact form not sending
- Check browser console for errors
- Verify your email service credentials
- Test the API endpoint directly

### Images not loading
- Verify files exist in `/public/` folder
- Check filename matches exactly (case-sensitive)
- Clear Next.js cache: `rm -rf .next`

---

## Need Help?

If you encounter any issues:

1. Check the browser console for errors (F12)
2. Check the terminal for build errors
3. Review this document for missed steps
4. Contact: avokat@milazimmustafa.com

---

## Summary Checklist

- [ ] Add English translations to `/lib/translations/en.ts`
- [ ] Add Macedonian translations to `/lib/translations/mk.ts`
- [ ] Connect contact form (choose Formspree, EmailJS, or API route)
- [ ] Test all pages on mobile, tablet, and desktop
- [ ] Test language switching
- [ ] Test contact form submission
- [ ] Deploy to hosting platform
- [ ] Verify deployed site works correctly
- [ ] Update contact information if needed
- [ ] Replace logo/images if needed

**Congratulations!** Your law office website is ready to go live!
