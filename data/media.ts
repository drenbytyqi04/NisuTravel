/**
 * FOTOGRAFITË E SEKSIONEVE
 * ---------------------------------------------------------------------------
 * Të gjitha fotot jashtë destinacioneve mblidhen këtu, që të zëvendësohen
 * lehtë. Aktualisht janë foto vendmbajtëse nga Unsplash.
 *
 * Për foto tuajat: ngarkojini në /public/images/ dhe vendosni
 * `src: '/images/emri.jpg'`. Teksti `alt` duhet të përshkruajë fotografinë.
 */

export type Media = { src: string; alt: string };

export const media = {
  /** Ballina — krahu i aeroplanit mbi re në orën e artë. */
  hero: {
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80',
    alt: 'Krahu i aeroplanit mbi re gjatë perëndimit të diellit',
  },
  /** Banda e diasporës. */
  diaspora: {
    src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1800&q=80',
    alt: 'Familje duke u përqafuar në sallën e mbërritjeve të një aeroporti',
  },
  /** Faqja "Rreth nesh" — hero. */
  about: {
    src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80',
    alt: 'Hartë, kamera dhe pasaportë mbi një tavolinë druri gjatë planifikimit të udhëtimit',
  },
  /** Faqja "Kontakti" — hero. */
  contact: {
    src: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1800&q=80',
    alt: 'Aeroplan në pistë gjatë mbrëmjes, gati për nisje',
  },
  /** Banda e thirrjes për veprim para footer-it. */
  cta: {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
    alt: 'Plazh me rërë të bardhë dhe det të kthjellët turkez',
  },
} satisfies Record<string, Media>;
