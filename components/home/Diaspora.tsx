import Link from 'next/link';
import { ArrowRightIcon, TakeoffIcon, WhatsAppIcon } from '@/components/Icons';
import { Stagger, StaggerItem } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';
import { media } from '@/data/media';
import { destinationMessage, whatsappUrl } from '@/lib/whatsapp';

/**
 * Vendet e diasporës me fluturime direkte nga Prishtina.
 * Gjermania dhe Zvicra kanë faqe të veten; Austria dërgon direkt në WhatsApp.
 */
const countries = [
  { name: 'Gjermani', href: '/destinacionet/gjermani' },
  { name: 'Zvicër', href: '/destinacionet/zviccer' },
  { name: 'Austri', href: whatsappUrl(destinationMessage('Austri')), external: true },
];

export function Diaspora() {
  return (
    <section id="diaspora" className="relative isolate overflow-hidden bg-emerald-deep">
      <SmartImage
        src={media.diaspora.src}
        alt={media.diaspora.alt}
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-emerald-deep via-emerald-deep/92 to-emerald-deep/70"
      />

      <div className="container-content relative py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">Diaspora</p>
          <h2 className="section-title mt-3 text-white">Afër familjes, sa një fluturim larg</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            Krishtlindje, Bajram, dasma, ose thjesht një fundjavë me prindërit — ne i njohim
            udhëtimet që kanë rëndësi. Fluturime direkte nga Prishtina drejt Gjermanisë,
            Zvicrës dhe Austrisë, të rezervuara me kohë dhe me çmim të qartë.
          </p>

          <Stagger as="ul" className="mt-9 flex flex-wrap gap-3">
            {countries.map((country) => (
              <StaggerItem as="li" key={country.name}>
                {country.external ? (
                  <a
                    href={country.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    <TakeoffIcon className="h-5 w-5" />
                    {country.name}
                  </a>
                ) : (
                  <Link
                    href={country.href}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    <TakeoffIcon className="h-5 w-5" />
                    {country.name}
                  </Link>
                )}
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl('Përshëndetje Nisu Travel! Dëshiroj një ofertë për fluturim drejt diasporës.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Pyet për biletat
            </a>
            <Link href="/kontakti" className="btn-ghost">
              Na kontaktoni
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
