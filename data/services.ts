/**
 * SHËRBIMET
 * ---------------------------------------------------------------------------
 * Ndryshoni tekstin këtu për të përditësuar seksionin "Shërbimet" në ballinë.
 * `icon` i referohet një ikone vijëzuese të definuar në /components/Icons.tsx.
 */

export type ServiceIcon = 'plane' | 'bed' | 'compass';

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  /** Pikat e shkurtra nën përshkrim. */
  points: string[];
};

export const services: Service[] = [
  {
    id: 'bileta',
    title: 'Bileta Aeroplani',
    description:
      'Gjejmë fluturimin që ju kushton më pak kohë dhe më pak para — direkt ose me lidhje, për një drejtim ose kthim.',
    icon: 'plane',
    points: [
      'Të gjitha kompanitë ajrore në një kërkim',
      'Fluturime direkte drejt diasporës',
      'Ndryshime dhe anulime me përkrahje njerëzore',
    ],
  },
  {
    id: 'hotele',
    title: 'Rezervime Hotelesh',
    description:
      'Nga hotele familjare deri te rezorte 5 yje — ju rezervojmë vendin e duhur, në lagjen e duhur, me çmim të qartë.',
    icon: 'bed',
    points: [
      'Hotele të verifikuara dhe të vlerësuara mirë',
      'Opsione all-inclusive për familje',
      'Konfirmim i menjëhershëm i rezervimit',
    ],
  },
  {
    id: 'aranzhmane',
    title: 'Aranzhmane Turistike',
    description:
      'Paketa të plota: fluturim, hotel, transfer dhe ekskursione — të organizuara nga fillimi deri në fund.',
    icon: 'compass',
    points: [
      'Pushime verore dhe dimërore',
      'Udhëtime grupore dhe për çifte',
      'Itinerare të personalizuara sipas dëshirës',
    ],
  },
];

/**
 * ARSYET "PSE NISU TRAVEL"
 */
export type Reason = { title: string; description: string };

export const reasons: Reason[] = [
  {
    title: 'Çmime transparente',
    description:
      'Çfarë ju themi, atë paguani. Pa tarifa të fshehura dhe pa surpriza në fund.',
  },
  {
    title: 'Përkrahje 24/7',
    description:
      'Nëse diçka ndryshon gjatë udhëtimit, na gjeni në telefon ose WhatsApp — në çdo orë.',
  },
  {
    title: 'Rezervime të sigurta',
    description:
      'Punojmë vetëm me operatorë dhe kompani ajrore të licencuara. Çdo rezervim konfirmohet me shkrim.',
  },
  {
    title: 'Përvojë pa stres',
    description:
      'Ju zgjidhni ku doni të shkoni. Ne merremi me pjesën tjetër — nga bileta deri te transferi.',
  },
];
