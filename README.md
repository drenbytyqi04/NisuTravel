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
| [Motion](https://motion.dev) | Animacione të buta gjatë skrollimit |
| `next/font` | Bebas Neue (tituj) + Jost (tekst) |

Pa CMS: e gjithë përmbajtja qëndron në skedarë të tipizuar brenda `/data`.

> Motion është e njëjta bibliotekë që më parë quhej `framer-motion`; të dyja
> paketat publikohen nga i njëjti repo. Importet bëhen nga `motion/react`.

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

`public/logo.svg` është një **rindërtim vendmbajtës** i logos zyrtare: wordmark
"NISU TRAVEL" në një rresht, me aeroplan mbi shkronjën N.

Zëvendësojeni me skedarin origjinal duke ruajtur të njëjtin emër. Logoja duhet
të jetë **e bardhë** dhe me sfond transparent, sepse shfaqet mbi sfond të
gjelbër ose mbi foto të errësuara. Raporti aktual është 4:1 — nëse skedari juaj
ka raport tjetër, ndryshoni `LOGO_RATIO` te `components/Logo.tsx`.

> Nëse origjinali është PNG, vendoseni si `public/logo.png` dhe ndryshoni
> `src` te `components/Logo.tsx`. Prania e `unoptimized` mbetet e nevojshme
> vetëm për SVG; për PNG mund të hiqet.

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

Faqja **nuk ka motor rezervimesh**, dhe as nuk pretendon se ka. Nën hero
qëndron seksioni "Si të merrni ofertën tuaj"
(`components/home/HowItWorks.tsx`) — tre hapa që e shpjegojnë rrugën reale:

1. klienti shkruan në WhatsApp ose plotëson formularin,
2. agjencia kthen ofertën,
3. udhëtimi organizohet nga agjencia.

Çdo buton "Kërko ofertë" hap një bisedë WhatsApp me mesazh të parambushur.
Logjika qëndron te `lib/whatsapp.ts` dhe përdoret nga ky seksion, nga faqet e
destinacioneve dhe nga çdo buton tjetër WhatsApp — prandaj numri dhe mesazhet
ndryshohen në një vend të vetëm.

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

## Animacionet dhe ndërveprimet

Të gjitha realizohen me Motion dhe Tailwind — **pa asnjë varësi shtesë**
— dhe animojnë vetëm `transform` dhe `opacity`, që të mos prodhojnë zhvendosje
layout-i.

| Elementi | Skedari |
| --- | --- |
| Ngarkuesi i faqes (vetëm vizita e parë e sesionit) | `components/PageLoader.tsx` |
| Kalimi mes faqeve | `app/template.tsx` |
| Primitivat: `Reveal`, `Stagger`, `StaggerItem` | `components/Reveal.tsx` |
| Navbar që ngushtohet, tregues i faqes aktive, meny mobile e animuar | `components/Navbar.tsx` |
| Skelet me shkëlqim gjatë ngarkimit të fotove | `components/SmartImage.tsx` |
| Gjendjet e formularit (sukses, gabim) | `app/kontakti/ContactForm.tsx` |
| Butona, kartela, shirit skrollimi, ngjyra e përzgjedhjes, Ken Burns | `app/globals.css` |

Të gjitha seksionet e faqes janë të mbuluara: hero-t, shërbimet, destinacionet,
arsyet, banda e diasporës, vlerësimet, banda e CTA-së, footer-i dhe faqja 404.

### Kur të shtoni animacione të reja

Përdorni primitivat ekzistuese, jo `motion` drejtpërdrejt:

```tsx
<Stagger as="ul" className="grid gap-6">
  {items.map((item) => (
    <StaggerItem as="li" key={item.id}>…</StaggerItem>
  ))}
</Stagger>
```

Për tekst **mbi palosje** shtoni `fade={false}`: elementi rrëshqet pa u zbehur,
prandaj është i dukshëm që në kuadrin e parë dhe nuk e vonon matjen e LCP-së.

Tri garanci që nuk duhen prishur kur shtohen animacione të reja:

1. **`prefers-reduced-motion` çaktivizon gjithçka.** Komponentët e Motion
   kthejnë element të thjeshtë, dhe CSS-ja anulon çdo `transform` e `animation`.
2. **Faqja funksionon pa JavaScript.** Ngarkuesi largohet me animacion CSS, jo
   me skript; dhe elementet që nisin me `opacity: 0` mbajnë atributin
   `data-reveal`, të cilin një rregull te `<noscript>` e bën të dukshëm.
3. **Faqet mbeten statike.** `"use client"` shtohet vetëm te komponentët që e
   kërkojnë — asnjëherë te një faqe e tërë.

## SEO dhe qasshmëria

- Metadata shqip për çdo faqe, Open Graph dhe foto ndarjeje e gjeneruar
- `sitemap.xml` dhe `robots.txt` gjenerohen automatikisht
- JSON-LD `TravelAgency` (adresa, telefoni, orari) dhe `TouristDestination`
- HTML semantik, tekst alternativ në çdo foto, lidhje "Kalo te përmbajtja",
  fokus i dukshëm në tastierë dhe kontrast AA
- Animacionet çaktivizohen kur sistemi kërkon `prefers-reduced-motion`
- Fotot ngarkohen përmes `next/image` me `lazy loading` nën palosje
