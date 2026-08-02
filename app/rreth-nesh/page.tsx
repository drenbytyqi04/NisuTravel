import type { Metadata } from 'next';
import { CheckIcon, ShieldIcon, TakeoffIcon, UsersIcon } from '@/components/Icons';
import { CtaBand } from '@/components/CtaBand';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { media } from '@/data/media';
import { reasons } from '@/data/services';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Rreth nesh',
  description:
    'Nisu Travel është agjenci udhëtimi në Prishtinë. Njihuni me historinë tonë, misionin dhe ekipin që organizon udhëtimet tuaja.',
  alternates: { canonical: '/rreth-nesh' },
  openGraph: {
    title: 'Rreth nesh | Nisu Travel',
    description: 'Agjenci udhëtimi në Prishtinë — bileta, hotele dhe aranzhmane turistike.',
    url: '/rreth-nesh',
  },
};

/**
 * EKIPI — seksion vendmbajtës.
 * TODO: Zëvendësoni emrat, rolet dhe (nëse dëshironi) shtoni fotografi te
 * /public/images/ekipi/ dhe përditësoni komponentin që të shfaqë foton.
 */
const team = [
  { name: 'Emri Mbiemri', role: 'Themelues & Këshilltar udhëtimesh', initials: 'NT' },
  { name: 'Emri Mbiemri', role: 'Rezervime dhe bileta ajrore', initials: 'NT' },
  { name: 'Emri Mbiemri', role: 'Aranzhmane turistike', initials: 'NT' },
];

const values = [
  {
    icon: ShieldIcon,
    title: 'Besueshmëria para gjithçkaje',
    description:
      'Çdo rezervim konfirmohet me shkrim dhe punojmë vetëm me partnerë të licencuar.',
  },
  {
    icon: UsersIcon,
    title: 'Njerëz, jo formularë',
    description:
      'Ju përgjigjet një person që e njeh destinacionin — jo një robot dhe jo një sistem automatik.',
  },
  {
    icon: TakeoffIcon,
    title: 'Përvojë e vërtetë',
    description:
      'Destinacionet që ju rekomandojmë i njohim nga afër, prandaj këshillat tona janë praktike.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Rreth nesh"
        title="Një agjenci që udhëton bashkë me ju"
        description="Nisu Travel lindi nga një ide e thjeshtë: udhëtimi duhet të fillojë pa stres, që në bisedën e parë."
        image={media.about}
      />

      <section className="py-20 lg:py-28">
        <div className="container-content grid gap-14 lg:grid-cols-2 lg:items-start">
          <SectionHeading eyebrow="Historia jonë" title="Nga Prishtina, për këdo që niset" />

          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-charcoal/75">
            <p>
              Kemi filluar duke ndihmuar miqtë dhe familjen të gjenin bileta për te të
              afërmit në Gjermani dhe Zvicër. Kërkesat u shtuan, dhe bashkë me to edhe
              destinacionet: Turqi, Egjipt, Dubai, Barcelonë, Santorini, Bali.
            </p>
            <p>
              Sot Nisu Travel është agjenci e plotë udhëtimesh me zyrë në Prishtinë. Ajo që
              nuk ka ndryshuar është mënyra e punës — ju shkruani, ne përgjigjemi si njerëz,
              dhe udhëtimi organizohet deri në detajin e fundit.
            </p>
            <p className="font-display text-2xl tracking-wide text-emerald-deep">
              “{site.tagline}” — sepse pjesa e vështirë duhet të jetë vetëm zgjedhja e
              destinacionit.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-content">
          <SectionHeading
            eyebrow="Misioni"
            title="Udhëtime të organizuara mirë, për çdo buxhet"
            description="Misioni ynë është ta bëjmë planifikimin e udhëtimit aq të thjeshtë sa një bisedë e shkurtër — me informacion të qartë, pa tarifa të fshehura dhe me përkrahje kur ju duhet."
          />

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={index * 0.1}>
                <div className="h-full rounded-2xl bg-offwhite p-8">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-deep text-white">
                    <value.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl tracking-wide">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-charcoal/70">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-content grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <SectionHeading
            eyebrow="Besimi"
            title="Pse na besojnë udhëtarët"
            description="Mbi gjithçka tjetër, klientët kthehen sepse e dinë se kanë me kë të flasin kur diçka ndryshon."
          />

          <ul className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <Reveal as="li" key={reason.title} delay={index * 0.08}>
                <div className="flex h-full gap-3 rounded-2xl bg-white p-6 shadow-soft">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
                  <div>
                    <h3 className="font-display text-lg tracking-wide">{reason.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-content">
          <SectionHeading
            eyebrow="Ekipi"
            title="Njerëzit pas udhëtimeve tuaja"
            description="Një ekip i vogël, i specializuar dhe i arritshëm — në zyrë, në telefon ose në WhatsApp."
          />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <Reveal as="li" key={`${member.name}-${index}`} delay={index * 0.1}>
                <div className="h-full rounded-2xl bg-offwhite p-8 text-center">
                  {/* Vend për fotografinë e anëtarit të ekipit. */}
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-deep to-emerald-mid font-display text-3xl tracking-widest text-white"
                  >
                    {member.initials}
                  </span>
                  <h3 className="mt-6 font-display text-xl tracking-wide">{member.name}</h3>
                  <p className="mt-1.5 text-sm text-charcoal/60">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Le të planifikojmë udhëtimin tuaj"
        description="Na shkruani dhe brenda pak minutash e nisim bisedën për destinacionin, datat dhe buxhetin."
      />
    </>
  );
}
