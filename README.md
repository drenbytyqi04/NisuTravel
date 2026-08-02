# Nisu Travel — faqja zyrtare

Faqe marketingu për **Nisu Travel**, agjenci udhëtimi në Prishtinë, Kosovë.
Faqja prezanton agjencinë dhe mbledh kërkesa — **rezervimet bëhen përmes
WhatsApp-it dhe formularit të kontaktit**, jo përmes një motori rezervimesh.

> Slogani: **Nisu me ne**

## Teknologjitë

| Teknologjia | Përdorimi |
| --- | --- |
| [Next.js 15](https://nextjs.org) (App Router) | Struktura e faqes, gjenerimi statik, SEO |
| TypeScript | Siguri tipesh në të dhëna dhe komponentë |
| [Tailwind CSS](https://tailwindcss.com) | Stilizimi |
| [Framer Motion](https://www.framer.com/motion/) | Animacione të buta gjatë skrollimit |
| `next/font` | Bebas Neue (tituj) + Jost (tekst) |

Pa CMS: e gjithë përmbajtja qëndron në skedarë të tipizuar brenda `/data`.

## Instalimi

```bash
npm install
npm run dev      # http://localhost:3000
```

Komandat e tjera:

```bash
npm run build      # ndërtimi për prodhim
npm run start      # nis versionin e ndërtuar
npm run lint       # ESLint
npm run typecheck  # kontroll tipesh (tsc)
```

Kërkohet Node.js 18.18 ose më i ri.

## Publikimi në Vercel

Projekti publikohet pa asnjë konfigurim shtesë:

1. Ngarkojeni depon në GitHub.
2. Në [vercel.com](https://vercel.com) → **Add New → Project** → zgjidhni depon.
3. Vercel e njeh vetë Next.js. Klikoni **Deploy**.

Pas publikimit, ndryshoni `url` te `data/site.ts` në domenin real (p.sh.
`https://nisutravel.com`) — nga aty merren `sitemap.xml`, `robots.txt`,
etiketat Open Graph dhe të dhënat e strukturuara.

---

## ✏️ Ku ndryshohet përmbajtja

Tri skedarë mbulojnë pothuajse gjithçka që ndryshon rregullisht.

### 1. Numri i WhatsApp-it, emaili dhe rrjetet sociale → `data/site.ts`

**Ky është skedari i vetëm ku ndryshohen të dhënat e kontaktit.** Ato përdoren
automatikisht në navbar, footer, butonin pluskues, çdo buton WhatsApp dhe në
të dhënat e strukturuara për Google.

```ts
contact: {
  whatsapp: '38349123456',        // format ndërkombëtar, PA "+" dhe PA hapësira
  phoneDisplay: '+383 49 123 456', // ashtu si shfaqet në faqe
  phoneHref: '+38349123456',       // për lidhjen tel:
  email: 'info@nisutravel.com',
},
```

> ⚠️ Numri i WhatsApp-it shkruhet **pa `+` dhe pa hapësira** (`38349123456`),
> sepse kështu e kërkon `wa.me`. Numri i shfaqur në faqe merret nga
> `phoneDisplay`, prandaj mund të formatohet lirisht.

Në të njëjtin skedar ndryshohen edhe:

- `address` — adresa e zyrës dhe koordinatat për hartën
- `hours` dhe `openingHoursSpecification` — orari i punës (i dyti është për Google)
- `social` — Instagram dhe Facebook
- `whatsappDefaultMessage` — mesazhi standard i butonave të WhatsApp-it
- `url` — domeni publik i faqes

### 2. Destinacionet → `data/destinations.ts`

Çdo destinacion është një objekt në listën `destinations`. Për të shtuar një të
ri, kopjoni një ekzistues dhe ndryshoni fushat:

```ts
{
  slug: 'malta',                    // adresa: /destinacionet/malta (duhet unike)
  name: 'Maltë',
  shortLine: 'Ishull mesdhetar me histori dhe plazhe të fshehura.',
  types: ['Plazh', 'Evropë'],       // Plazh | Qytet | Ekzotike | Evropë
  image: { src: '...', alt: '...' },
  description: ['Paragrafi i parë…', 'Paragrafi i dytë…'],
  highlights: ['Pika 1', 'Pika 2'],
  featured: true,                   // shfaqet i zgjedhur
  diaspora: false,                  // vend me fluturime direkte për diasporën
}
```

Faqja e destinacionit, filtri, `sitemap.xml` dhe lidhjet përditësohen vetvetiu.

### 3. Shërbimet dhe vlerësimet

- `data/services.ts` — tri shërbimet dhe katër arsyet "Pse Nisu Travel"
- `data/testimonials.ts` — vlerësimet e klientëve (aktualisht vendmbajtëse)
- `data/media.ts` — fotot e hero-ve dhe bandave

---

## 🖼 Fotografitë

Të gjitha fotot janë **vendmbajtëse nga Unsplash** dhe mblidhen te
`data/destinations.ts` dhe `data/media.ts`, që të zëvendësohen lehtë.

Për foto tuajat:

1. Vendosini te `public/images/`.
2. Ndryshoni `src` në `'/images/emri.jpg'`.
3. Përshtatni tekstin `alt` (i detyrueshëm për qasshmërinë).

Për një host tjetër të jashtëm, shtoni domenin te `images.remotePatterns` në
`next.config.mjs`.

Nëse një URL e jashtme nuk arrihet, komponenti `SmartImage` shfaq automatikisht
një sfond me gradient të markës në vend të një fotoje të thyer.

### Logoja

`public/logo.svg` është **vendmbajtëse**. Zëvendësojeni me logon zyrtare duke
ruajtur të njëjtin emër dhe raportin 5:1 (wordmark i **bardhë**, sepse shfaqet
mbi sfond të gjelbër ose mbi foto të errësuara). Nëse ndryshoni raportin,
përditësoni llogaritjen e lartësisë te `components/Logo.tsx`.

---

## 📩 Formulari i kontaktit

Formulari te `/kontakti` dërgon një `POST` te `/api/contact`. Aktualisht ruta
**vetëm e validon kërkesën dhe e shkruan në log** (Vercel → Logs).

Për të aktivizuar dërgimin me email përmes [Resend](https://resend.com), ndiqni
TODO-në e shënuar te `app/api/contact/route.ts`:

```bash
npm install resend
```

```
# .env.local
RESEND_API_KEY=re_xxxxxxxx
```

Pastaj shtoni të njëjtën variabël te Vercel → Project Settings → Environment
Variables.

Harta te faqja e kontaktit është gjithashtu vendmbajtëse — udhëzimet për ta
zëvendësuar me një hartë reale janë në koment te `app/kontakti/page.tsx`.

---

## Si funksionon kërkesa për ofertë

Faqja **nuk ka motor rezervimesh**. Shiriti i kërkimit në ballinë duket si një
motor kërkimi, por në vend që të thërrasë një API:

1. i shndërron fushat e plotësuara (Nga, Për, Data, Udhëtarë) në tekst,
2. e kodon tekstin në një lidhje `wa.me`,
3. e hap bisedën në WhatsApp me mesazhin gati për dërgim.

E gjithë kjo logjikë qëndron te `lib/whatsapp.ts` dhe përdoret nga shiriti i
kërkesës, faqet e destinacioneve dhe çdo buton WhatsApp. Kur të lidhet API-ja e
vërtetë e rezervimeve, ndryshohet vetëm `handleSubmit` te
`components/home/EnquiryBar.tsx`.

---

## Struktura e projektit

```
app/
  page.tsx                    Ballina
  destinacionet/              Lista + filtri
  destinacionet/[slug]/       Faqja e çdo destinacioni (statike)
  rreth-nesh/                 Historia, misioni, ekipi
  kontakti/                   Formulari + kontakti i drejtpërdrejtë
  api/contact/route.ts        Validimi i formularit (TODO: Resend)
  sitemap.ts, robots.ts       SEO
  opengraph-image.tsx         Fotoja e ndarjes në rrjete sociale
components/                   Komponentët e ripërdorshëm
  home/                       Seksionet e ballinës
data/                         PËRMBAJTJA — shih më lart
lib/whatsapp.ts               Ndërtimi i lidhjeve wa.me
public/logo.svg               Logoja (vendmbajtëse)
```

## SEO dhe qasshmëria

- Metadata shqip për çdo faqe, Open Graph dhe foto ndarjeje e gjeneruar
- `sitemap.xml` dhe `robots.txt` gjenerohen automatikisht
- JSON-LD `TravelAgency` (adresa, telefoni, orari) dhe `TouristDestination`
- HTML semantik, tekst alternativ në çdo foto, lidhje "Kalo te përmbajtja",
  fokus i dukshëm në tastierë dhe kontrast AA
- Animacionet çaktivizohen kur sistemi kërkon `prefers-reduced-motion`
- Fotot ngarkohen përmes `next/image` me `lazy loading` nën palosje
