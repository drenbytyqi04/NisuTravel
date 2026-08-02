import { site } from '@/data/site';

/**
 * Të dhëna të strukturuara (schema.org) për një agjenci udhëtimi.
 * Ndihmojnë Google-in të shfaqë adresën, telefonin dhe orarin në rezultate.
 * Të gjitha vlerat vijnë nga /data/site.ts.
 */
export function TravelAgencyJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${site.url}#agjencia`,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    telephone: site.contact.phoneHref,
    email: site.contact.email,
    image: `${site.url}/logo.svg`,
    logo: `${site.url}/logo.svg`,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    areaServed: { '@type': 'Country', name: 'Kosovë' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    openingHoursSpecification: site.openingHoursSpecification.map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: [site.social.instagram.url, site.social.facebook.url],
  };

  return (
    <script
      type="application/ld+json"
      // Përmbajtja është statike dhe e kontrolluar nga /data/site.ts.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Të dhëna të strukturuara për një destinacion të veçantë. */
export function DestinationJsonLd({
  name,
  description,
  image,
  url,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
    image,
    url,
    touristType: 'Udhëtarë nga Kosova dhe diaspora',
    provider: { '@id': `${site.url}#agjencia` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
