'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

interface ContactFormProps {
  translations: any;
}

export function ContactForm({ translations }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // TODO: Integrate with Formspree, EmailJS, or Next.js API route
    // Example integration point:
    //
    // Option 1: Formspree
    // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formState),
    // });
    //
    // Option 2: EmailJS
    // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formState, 'YOUR_PUBLIC_KEY');
    //
    // Option 3: Next.js API Route
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formState),
    // });

    // Simulated submission for now
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-stone-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {translations.contact.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 max-w-3xl mx-auto">
            {translations.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="bg-white p-8 shadow-sm border border-stone-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                {translations.contact.info.title}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">
                      {translations.nav.contact}
                    </h4>
                    <a href='https://maps.app.goo.gl/4uVCavZw9XKwr5H27'
                    target='_blank'
                    rel='noopener noreferrer'
                    className="text-slate-600 text-sm leading-relaxed hover:text-teal-700 transition-colors">
                      {translations.contact.info.address}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">
                      {translations.contact.form.phone}
                    </h4>
                    <a
                      href={`tel:${translations.contact.info.phone.replace(/\s/g, '')}`}
                      className="text-slate-600 text-sm hover:text-teal-700 transition-colors"
                    >
                      {translations.contact.info.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">
                      {translations.contact.form.email}
                    </h4>
                    <a
                      href={`mailto:${translations.contact.info.email}`}
                      className="text-slate-600 text-sm hover:text-teal-700 transition-colors"
                    >
                      {translations.contact.info.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">
                      {translations.contact.hours.title}
                    </h4>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p>{translations.contact.hours.weekdays}</p>
                      <p>{translations.contact.hours.saturday}</p>
                      <p>{translations.contact.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm border border-stone-200">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-900 mb-2"
                  >
                    {translations.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-900 mb-2"
                  >
                    {translations.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-900 mb-2"
                  >
                    {translations.contact.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-900 mb-2"
                  >
                    {translations.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-shadow resize-none"
                  />
                </div>

                {status === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm">
                    {translations.contact.form.success}
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
                    {translations.contact.form.error}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                >
                  {status === 'sending'
                    ? translations.contact.form.sending
                    : translations.contact.form.submit}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
