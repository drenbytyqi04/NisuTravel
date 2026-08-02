/**
 * VLERËSIMET E KLIENTËVE
 * ---------------------------------------------------------------------------
 * TODO: Zëvendësoni këto vlerësime vendmbajtëse me vlerësime reale klientësh
 * (me lejen e tyre). Mbani tekstin të shkurtër — 2 deri 3 fjali.
 */

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 'arta',
    name: 'Arta K.',
    location: 'Prishtinë',
    rating: 5,
    quote:
      'E rezervova udhëtimin për Antalia brenda një dite. Gjithçka ishte e organizuar — transferi na priti në aeroport dhe hoteli ishte pikërisht si në foto.',
  },
  {
    id: 'burim',
    name: 'Burim H.',
    location: 'Shtutgart',
    rating: 5,
    quote:
      'Çdo verë udhëtoj me familje nga Gjermania. Nisu Travel m’i gjen gjithmonë biletat më të mira dhe përgjigjet në WhatsApp brenda pak minutash.',
  },
  {
    id: 'diella',
    name: 'Diella M.',
    location: 'Ferizaj',
    rating: 5,
    quote:
      'Muaji i mjaltit në Santorini ishte perfekt. Na këshilluan për periudhën më të mirë dhe hoteli me pamje nga kaldera ia vlejti çdo moment.',
  },
];
