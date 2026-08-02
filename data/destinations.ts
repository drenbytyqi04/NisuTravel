/**
 * DESTINACIONET
 * ---------------------------------------------------------------------------
 * Për të shtuar një destinacion të ri: kopjoni një objekt të plotë më poshtë,
 * ndryshoni `slug` (duhet të jetë unik — ai bëhet adresa /destinacionet/<slug>)
 * dhe përditësoni tekstin e fotografitë.
 *
 * FOTOGRAFITË: aktualisht janë foto vendmbajtëse nga Unsplash. Për t'i
 * zëvendësuar me foto tuajat, ngarkojini në /public/images/ dhe vendosni
 * `image: { src: '/images/emri-i-fotos.jpg', alt: '...' }`. Nëse përdorni një
 * shërbim tjetër të jashtëm, shtoni hostin te `images.remotePatterns` në
 * next.config.mjs. Çdo foto DUHET të ketë tekst alternativ (alt) shqip.
 */

export const destinationTypes = ['Plazh', 'Qytet', 'Ekzotike', 'Evropë'] as const;

export type DestinationType = (typeof destinationTypes)[number];

export type Destination = {
  slug: string;
  name: string;
  /** Rreshti i shkurtër që shfaqet mbi kartelë. */
  shortLine: string;
  types: DestinationType[];
  image: { src: string; alt: string };
  /** Përshkrimi i plotë në faqen e destinacionit (paragrafë të ndarë). */
  description: string[];
  highlights: string[];
  /** Shfaqet në rrjetin e zgjedhur në ballinë. */
  featured?: boolean;
  /** Destinacion i lidhur me diasporën (fluturime direkte). */
  diaspora?: boolean;
};

export const destinations: Destination[] = [
  {
    slug: 'turqi',
    name: 'Turqi',
    shortLine: 'Plazhe të gjata, ushqim i mrekullueshëm dhe hotele all-inclusive.',
    types: ['Plazh'],
    image: {
      src: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=80',
      alt: 'Bregdeti i Antalias në Turqi me det të kaltër dhe hotele përgjatë plazhit',
    },
    description: [
      'Turqia mbetet zgjedhja numër një për familjet nga Kosova — dhe me arsye. Antalia, Bodrumi dhe Marmarisi ofrojnë hotele all-inclusive me çmime të arsyeshme, plazhe të pastra dhe fluturime të shpeshta gjatë gjithë sezonit.',
      'Ne ju gjejmë hotelin që i përshtatet vërtet udhëtimit tuaj: i qetë për çiftet, me park uji për fëmijët, ose afër qendrës nëse doni jetë nate dhe pazar. Transferi nga aeroporti organizohet gjithmonë paraprakisht.',
    ],
    highlights: [
      'Hotele all-inclusive për familje dhe çifte',
      'Transfer i përfshirë nga aeroporti te hoteli',
      'Ekskursione ditore: Pamukkale, Side, kroçiera me varkë',
      'Fluturime direkte gjatë sezonit veror',
    ],
    featured: true,
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    shortLine: 'Luks, shkretëtirë dhe qiellgërvishtës — një qytet që nuk fle.',
    types: ['Ekzotike', 'Qytet'],
    image: {
      src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
      alt: 'Panorama e Dubait me Burj Khalifa gjatë perëndimit të diellit',
    },
    description: [
      'Dubai është destinacioni ideal për ata që duan gjithçka në një udhëtim: plazhe me rërë të bardhë, qendra tregtare gjigante, safari në shkretëtirë dhe restorante të nivelit botëror.',
      'Periudha më e mirë është nga tetori deri në prill, kur temperaturat janë të këndshme. Ne ju ndihmojmë me vizat, hotelin dhe të gjitha ekskursionet — ju vetëm mbani pasaportën gati.',
    ],
    highlights: [
      'Vizita në Burj Khalifa dhe Dubai Mall',
      'Safari në shkretëtirë me darkë beduine',
      'Hotele 4* dhe 5* me plazh privat',
      'Ndihmë e plotë me dokumentacionin dhe vizat',
    ],
    featured: true,
  },
  {
    slug: 'egjipt',
    name: 'Egjipt',
    shortLine: 'Deti i Kuq, piramidat dhe diell gjatë gjithë vitit.',
    types: ['Plazh', 'Ekzotike'],
    image: {
      src: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=80',
      alt: 'Piramidat e Gizës në Egjipt nën qiell të kthjellët',
    },
    description: [
      'Sharm el-Sheikh dhe Hurghada ofrojnë ujë të ngrohtë dhe zhytje mes koraleve edhe kur në Kosovë bie borë. Egjipti është destinacioni perfekt për pushime dimërore me diell.',
      'Për ata që duan më shumë se plazh, organizojmë ekskursion në Kajro për të parë piramidat dhe Muzeun Egjiptian — një ditë që nuk harrohet kurrë.',
    ],
    highlights: [
      'Rezorte all-inclusive buzë Detit të Kuq',
      'Zhytje dhe snorkeling mes koraleve',
      'Ekskursion në Kajro dhe piramidat e Gizës',
      'Destinacion ideal për pushime dimërore',
    ],
    featured: true,
  },
  {
    slug: 'barcelone',
    name: 'Barcelonë',
    shortLine: 'Gaudí, tapas dhe plazh mesdhetar brenda të njëjtës ditë.',
    types: ['Qytet', 'Evropë'],
    image: {
      src: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80',
      alt: 'Sagrada Família dhe çatitë e Barcelonës në dritën e mbrëmjes',
    },
    description: [
      'Barcelona është qyteti ku arkitektura, deti dhe gastronomia takohen. Sagrada Família, Park Güell dhe rruga La Rambla janë vetëm fillimi — magjia e vërtetë është te lagjet e vogla si El Born dhe Gràcia.',
      'Rekomandojmë tre deri në katër netë. Ne rezervojmë hotelin në lagjen që ju përshtatet dhe ju sigurojmë biletat për atraksionet kryesore pa pritje në radhë.',
    ],
    highlights: [
      'Bileta pa radhë për Sagrada Família dhe Park Güell',
      'Hotele në qendër ose afër plazhit Barceloneta',
      'Ture gastronomike me tapas',
      'Fundjavë e gjatë ose pushim një-javor',
    ],
    featured: true,
  },
  {
    slug: 'gjermani',
    name: 'Gjermani',
    shortLine: 'Fluturime direkte te familja — Frankfurt, Mynih, Shtutgart.',
    types: ['Qytet', 'Evropë'],
    image: {
      src: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80',
      alt: 'Qendra e një qyteti gjerman me arkitekturë klasike dhe rrugë të gjelbëruara',
    },
    description: [
      'Gjermania është shtëpia e dytë për mijëra familje kosovare. Ne sigurojmë biletat më të përshtatshme drejt Frankfurtit, Mynihut, Shtutgartit, Dyseldorfit dhe Berlinit — përfshirë periudhat e ngarkuara të verës dhe festave.',
      'Nëse udhëtoni me fëmijë, me bagazh shtesë ose ju duhet ndihmë në aeroport, na tregoni paraprakisht dhe ne e organizojmë gjithçka.',
    ],
    highlights: [
      'Fluturime direkte nga Prishtina gjatë gjithë vitit',
      'Bileta për verë dhe festa të rezervuara me kohë',
      'Bagazh shtesë dhe ndihmë për udhëtarë me fëmijë',
      'Rezervime hoteli për qëndrime të shkurtra',
    ],
    diaspora: true,
  },
  {
    slug: 'zviccer',
    name: 'Zvicër',
    shortLine: 'Cyrih, Bazel, Gjenevë — afër familjes, sa një fluturim larg.',
    types: ['Evropë', 'Qytet'],
    image: {
      src: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80',
      alt: 'Liqen zviceran me Alpet e mbuluara me borë në sfond',
    },
    description: [
      'Cyrihu, Baseli dhe Gjeneva janë ndër destinacionet më të kërkuara nga udhëtarët tanë. Fluturimet janë të shpeshta, por vendet mbarojnë shpejt — sidomos në dhjetor dhe gusht.',
      'Përveç biletave, ju ndihmojmë me rezervime hoteli nëse qëndroni pak ditë ose planifikoni një udhëtim nëpër Alpe.',
    ],
    highlights: [
      'Fluturime direkte drejt Cyrihut, Baselit dhe Gjenevës',
      'Çmime më të mira kur rezervoni herët',
      'Udhëtime në Alpet zvicerane me tren panoramik',
      'Përkrahje edhe pas rezervimit',
    ],
    diaspora: true,
  },
  {
    slug: 'santorini',
    name: 'Santorini',
    shortLine: 'Shtëpi të bardha, kupola blu dhe perëndime që t’i mban mend.',
    types: ['Plazh', 'Evropë'],
    image: {
      src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80',
      alt: 'Shtëpi të bardha me kupola blu në Santorini mbi detin Egje',
    },
    description: [
      'Santorini është destinacioni i çifteve, i muajit të mjaltit dhe i atyre që duan diçka më të qetë se një rezort i madh. Oia dhe Fira ofrojnë pamje që i keni parë në foto — dhe janë edhe më të bukura nga afër.',
      'Rekomandojmë maj, qershor ose shtator: moti është i shkëlqyer dhe ishulli më i qetë. Organizojmë traget ose fluturim përmes Athinës.',
    ],
    highlights: [
      'Hotele me pamje nga kaldera në Oia dhe Fira',
      'Kroçiera me perëndim dielli',
      'Ideale për çifte dhe muaj mjalti',
      'Kombinim i mundshëm me Athinën ose Mikonosin',
    ],
    featured: true,
  },
  {
    slug: 'bali',
    name: 'Bali',
    shortLine: 'Xhungël, tempuj dhe plazhe — udhëtimi që e keni shtyrë gjithmonë.',
    types: ['Ekzotike', 'Plazh'],
    image: {
      src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80',
      alt: 'Tarraca orizi të gjelbra dhe tempull tradicional në Bali',
    },
    description: [
      'Bali është udhëtimi i madh — ai që planifikohet me kohë dhe kujtohet përjetë. Ubudi me tarracat e orizit, Seminyaku me plazhet dhe ishujt Gili për zhytje: gjithçka në një aranzhman.',
      'Për shkak të distancës, rekomandojmë së paku dhjetë ditë. Ne kujdesemi për fluturimet me lidhje, hotelet dhe transferet e brendshme.',
    ],
    highlights: [
      'Aranzhmane 10–14 ditore me fluturime me lidhje',
      'Kombinim Ubud + plazh + ishujt Gili',
      'Vila private me pishinë',
      'Përkrahje 24/7 gjatë gjithë udhëtimit',
    ],
    featured: true,
  },
];

/** Gjen një destinacion sipas slug-ut (përdoret nga /destinacionet/[slug]). */
export function getDestination(slug: string): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}

/** Destinacionet e zgjedhura për ballinë. */
export const featuredDestinations = destinations.filter((d) => d.featured);

/** Destinacionet e lidhura me diasporën. */
export const diasporaDestinations = destinations.filter((d) => d.diaspora);
