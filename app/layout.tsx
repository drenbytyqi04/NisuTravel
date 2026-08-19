import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Jost } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { LoaderSeenScript, PageLoader } from '@/components/PageLoader';
import { TravelAgencyJsonLd } from '@/components/JsonLd';
import { site } from '@/data/site';

// Sans i kondensuar dhe i guximshëm për tituj.
const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Sans gjeometrik dhe i pastër për tekstin.
const body = Jost({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Nisu Travel — Agjenci udhëtimi në Prishtinë',
    template: '%s | Nisu Travel',
  },
  description: site.description,
  keywords: [
    'agjenci udhëtimi Prishtinë',
    'bileta ajrore Kosovë',
    'rezervime hotelesh',
    'aranzhmane turistike',
    'pushime Turqi',
    'fluturime Gjermani Zvicër',
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'sq_AL',
    url: site.url,
    siteName: site.name,
    title: 'Nisu Travel — Nisu me ne',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nisu Travel — Nisu me ne',
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#047857',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Duhet të jetë elementi i parë: vendos klasën para se ngarkuesi të lexohet. */}
        <LoaderSeenScript />

        {/*
          Rrjetë sigurie pa JavaScript: animacionet e skrollimit i nisin
          elementet me `opacity: 0`. Nëse skripti nuk ngarkohet, kjo rregull i
          kthen menjëherë në gjendje të dukshme, që përmbajtja të mbetet e
          lexueshme.
        */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>

        <TravelAgencyJsonLd />
        <a
          href="#permbajtja"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-emerald-deep"
        >
          Kalo te përmbajtja
        </a>
        <Navbar />
        <main id="permbajtja" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <PageLoader />
      </body>
    </html>
  );
}
