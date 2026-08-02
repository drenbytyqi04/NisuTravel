/**
 * KONFIGURIMI QENDROR I FAQES
 * ---------------------------------------------------------------------------
 * Të gjitha të dhënat e kontaktit ndryshohen VETËM këtu. Numri i WhatsApp-it,
 * emaili, rrjetet sociale dhe orari përdoren automatikisht në çdo faqe,
 * në footer, në butonin pluskues dhe në të dhënat e strukturuara (JSON-LD).
 */

export const site = {
  name: 'Nisu Travel',
  tagline: 'Nisu me ne',
  description:
    'Bileta ajrore, hotele dhe aranzhmane turistike — të organizuara për ty. Agjenci udhëtimi në Prishtinë.',

  /** URL-ja publike e faqes (përdoret për SEO, sitemap dhe Open Graph). */
  url: 'https://nisutravel.com',

  contact: {
    /**
     * Numri i WhatsApp-it në format ndërkombëtar, PA "+", PA hapësira.
     * Shembull: +383 49 123 456  ->  '38349123456'
     * TODO: zëvendësoni me numrin real të agjencisë.
     */
    whatsapp: '38349123456',
    /** I njëjti numër, i formatuar për t'u shfaqur në faqe. */
    phoneDisplay: '+383 49 123 456',
    /** Numri për lidhjen tel: (me "+"). */
    phoneHref: '+38349123456',
    email: 'info@nisutravel.com',
  },

  address: {
    street: 'Rr. Nëna Terezë 12',
    city: 'Prishtinë',
    postalCode: '10000',
    country: 'Kosovë',
    countryCode: 'XK',
    /** Koordinatat e qendrës së Prishtinës — përditësoni me lokacionin e zyrës. */
    latitude: 42.6629,
    longitude: 21.1655,
  },

  hours: [
    { days: 'E hënë – E premte', time: '09:00 – 18:00' },
    { days: 'E shtunë', time: '09:00 – 14:00' },
    { days: 'E diel', time: 'Mbyllur' },
  ],

  /** Orari në format të lexueshëm nga makina (schema.org). */
  openingHoursSpecification: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    { days: ['Saturday'], opens: '09:00', closes: '14:00' },
  ],

  social: {
    instagram: {
      handle: '@nisutravel',
      url: 'https://instagram.com/nisutravel',
    },
    facebook: {
      handle: 'Nisu Travel',
      url: 'https://facebook.com/nisutravel',
    },
  },

  /** Mesazhi standard që hapet kur klikohet butoni i WhatsApp-it. */
  whatsappDefaultMessage:
    'Përshëndetje Nisu Travel! Dëshiroj një ofertë për udhëtim.',
} as const;

export type Site = typeof site;
