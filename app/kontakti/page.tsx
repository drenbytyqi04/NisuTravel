import type { Metadata } from 'next';
import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '@/components/Icons';
import { ContactForm } from '@/app/kontakti/ContactForm';
import { PageHero } from '@/components/PageHero';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import { media } from '@/data/media';
import { site } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Kontakti',
  description:
    'Kontaktoni Nisu Travel në Prishtinë — telefon, WhatsApp, email dhe formular kërkese për ofertë udhëtimi.',
  alternates: { canonical: '/kontakti' },
  openGraph: {
    title: 'Kontakti | Nisu Travel',
    description: 'Na shkruani për ofertë udhëtimi — përgjigjemi shpejt, çdo ditë pune.',
    url: '/kontakti',
  },
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${site.address.latitude},${site.address.longitude}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakti"
        title="Na shkruani — jemi këtu"
        description="Përgjigjemi në WhatsApp brenda pak minutash gjatë orarit të punës, dhe në email brenda së njëjtës ditë."
        image={media.contact}
      />

      <section className="py-16 lg:py-24">
        <div className="container-content grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <div className="card p-8">
              <h2 className="font-display text-2xl tracking-wide">Kontakti i drejtpërdrejtë</h2>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-6 w-full"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Shkruaj në WhatsApp
              </a>

              <Stagger as="ul" className="mt-8 space-y-5 text-sm">
                <StaggerItem as="li" className="flex gap-3">
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
                  <span>
                    <span className="block text-charcoal/50">Telefoni</span>
                    <a href={`tel:${site.contact.phoneHref}`} className="font-medium text-emerald-deep">
                      {site.contact.phoneDisplay}
                    </a>
                  </span>
                </StaggerItem>
                <StaggerItem as="li" className="flex gap-3">
                  <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
                  <span>
                    <span className="block text-charcoal/50">Emaili</span>
                    <a href={`mailto:${site.contact.email}`} className="font-medium text-emerald-deep">
                      {site.contact.email}
                    </a>
                  </span>
                </StaggerItem>
                <StaggerItem as="li" className="flex gap-3">
                  <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
                  <span>
                    <span className="block text-charcoal/50">Instagram</span>
                    <a
                      href={site.social.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-emerald-deep"
                    >
                      {site.social.instagram.handle}
                    </a>
                  </span>
                </StaggerItem>
                <StaggerItem as="li" className="flex gap-3">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
                  <span>
                    <span className="block text-charcoal/50">Zyra</span>
                    <address className="not-italic font-medium">
                      {site.address.street}, {site.address.postalCode} {site.address.city}
                    </address>
                  </span>
                </StaggerItem>
                <StaggerItem as="li" className="flex gap-3">
                  <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
                  <span>
                    <span className="block text-charcoal/50">Orari</span>
                    {site.hours.map((entry) => (
                      <span key={entry.days} className="block font-medium">
                        {entry.days}: {entry.time}
                      </span>
                    ))}
                  </span>
                </StaggerItem>
              </Stagger>
            </div>

            <MapPlaceholder />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/**
 * HARTA — vendmbajtëse.
 * Nuk ngarkojmë hartë të jashtme që të mos ngadalësohet faqja pa nevojë.
 *
 * TODO: për hartë reale, zëvendësoni bllokun e mëposhtëm me një <iframe>:
 *   <iframe
 *     title="Harta — Nisu Travel, Prishtinë"
 *     src="https://www.google.com/maps/embed?pb=..."   // merret nga Google Maps → Share → Embed
 *     loading="lazy"
 *     referrerPolicy="no-referrer-when-downgrade"
 *     className="h-full w-full border-0"
 *   />
 */
function MapPlaceholder() {
  return (
    <div className="card overflow-hidden">
      <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-emerald-deep to-emerald-mid">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div className="relative text-center text-white">
          <MapPinIcon className="mx-auto h-9 w-9" />
          <p className="mt-2 font-display text-2xl tracking-widest">Prishtinë</p>
          <p className="text-sm text-white/80">{site.address.street}</p>
        </div>
      </div>
      <div className="p-6">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline w-full"
        >
          <MapPinIcon className="h-5 w-5" />
          Hap në Google Maps
        </a>
      </div>
    </div>
  );
}
