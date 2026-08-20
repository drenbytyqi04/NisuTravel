import Link from 'next/link';
import { Logo } from '@/components/Logo';
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '@/components/Icons';
import { Stagger, StaggerItem } from '@/components/Reveal';
import { site } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';

const pages = [
  { href: '/', label: 'Ballina' },
  { href: '/destinacionet', label: 'Destinacionet' },
  { href: '/rreth-nesh', label: 'Rreth nesh' },
  { href: '/kontakti', label: 'Kontakti' },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <Stagger className="container-content grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <StaggerItem className="lg:col-span-1">
          <Logo width={168} className="h-auto w-[150px]" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Agjenci udhëtimi në Prishtinë. Bileta ajrore, hotele dhe aranzhmane
            turistike — të organizuara për ty.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <span className="sr-only">Instagram {site.social.instagram.handle}</span>
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={site.social.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <span className="sr-only">Facebook — {site.social.facebook.handle}</span>
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/20 motion-reduce:transform-none"
            >
              <span className="sr-only">Shkruaj në WhatsApp</span>
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </StaggerItem>

        <StaggerItem>
          <nav aria-label="Faqet">
            <h2 className="font-display text-xl tracking-widest text-white">Faqet</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="transition-colors hover:text-white">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </StaggerItem>

        <StaggerItem>
          <h2 className="font-display text-xl tracking-widest text-white">Kontakti</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
              <a href={`tel:${site.contact.phoneHref}`} className="transition-colors hover:text-white">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">
                {site.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
              <address className="not-italic">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}, {site.address.country}
              </address>
            </li>
          </ul>
        </StaggerItem>

        <StaggerItem>
          <h2 className="font-display text-xl tracking-widest text-white">Orari</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {site.hours.map((entry) => (
              <li key={entry.days} className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
                <span>
                  <span className="block text-white">{entry.days}</span>
                  {entry.time}
                </span>
              </li>
            ))}
          </ul>
        </StaggerItem>
      </Stagger>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Të gjitha të drejtat e rezervuara.
          </p>
          <p className="text-white/50">Prishtinë, Kosovë · {site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
