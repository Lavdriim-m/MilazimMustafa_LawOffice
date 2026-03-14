import './globals.css';
import type { Metadata } from 'next';
import { Libre_Baskerville, Inter } from 'next/font/google';

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Milazim Mustafa',
  description: 'Law Office',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${libreBaskerville.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-stone-50">{children}</body>
    </html>
  );
}
