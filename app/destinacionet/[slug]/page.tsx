import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from '@/components/Icons';
import { CtaBand } from '@/components/CtaBand';
import { DestinationCard } from '@/components/DestinationCard';
import { DestinationJsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { destinations, getDestination } from '@/data/destinations';
import { site } from '@/data/site';
import { destinationMessage, whatsappUrl } from '@/lib/whatsapp';

type PageProps = { params: Promise<{ slug: string }> };

/** Të gjitha faqet e destinacioneve gjenerohen statikisht gjatë build-it. */
export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    return { title: 'Destinacioni nuk u gjet' };
  }

  const description = destination.description[0];

  return {
    title: destination.name,
    description,
    alternates: { canonical: `/destinacionet/${destination.slug}` },
    openGraph: {
      title: `${destination.name} | Nisu Travel`,
      description,
      url: `/destinacionet/${destination.slug}`,
      images: [{ url: destination.image.src, alt: destination.image.alt }],
    },
  };
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) notFound();

  const related = destinations
    .filter(
      (item) =>
        item.slug !== destination.slug &&
        item.types.some((type) => destination.types.includes(type)),
    )
    .slice(0, 4);

  return (
    <>
      <DestinationJsonLd
        name={destination.name}
        description={destination.description[0]}
        image={destination.image.src}
        url={`${site.url}/destinacionet/${destination.slug}`}
      />

      <PageHero
        eyebrow={destination.types.join(' · ')}
        title={destination.name}
        description={destination.shortLine}
        image={destination.image}
      />

      <section className="py-16 lg:py-24">
        <div className="container-content grid gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <Reveal>
            <nav aria-label="Rruga e faqes" className="mb-8 text-sm text-charcoal/60">
              <Link href="/destinacionet" className="hover:text-emerald-deep">
                Destinacionet
              </Link>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <span className="text-charcoal">{destination.name}</span>
            </nav>

            <div className="space-y-5 text-lg leading-relaxed text-charcoal/80">
              {destination.description.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-12 font-display text-3xl tracking-wide">Çfarë përfshihet</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {destination.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 rounded-2xl bg-white p-5 shadow-soft">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-mid" />
                  <span className="text-sm leading-relaxed text-charcoal/80">{highlight}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Kartela e kërkesës — ngjitëse në desktop. */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div className="card p-8">
              <h2 className="font-display text-2xl tracking-wide">
                Kërko ofertë për {destination.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                Klikoni butonin dhe mesazhi hapet i gatshëm në WhatsApp me emrin e
                destinacionit. Ne kthejmë përgjigje me opsionet dhe çmimet aktuale.
              </p>

              <a
                href={whatsappUrl(destinationMessage(destination.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-6 w-full"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Kërko ofertë në WhatsApp
              </a>

              <Link href="/kontakti" className="btn-outline mt-3 w-full">
                Plotëso formularin
                <ArrowRightIcon className="h-4 w-4" />
              </Link>

              <dl className="mt-8 space-y-3 border-t border-charcoal/10 pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-charcoal/60">Telefoni</dt>
                  <dd>
                    <a href={`tel:${site.contact.phoneHref}`} className="font-medium text-emerald-deep">
                      {site.contact.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-charcoal/60">Emaili</dt>
                  <dd>
                    <a href={`mailto:${site.contact.email}`} className="font-medium text-emerald-deep">
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-white py-16 lg:py-20">
          <div className="container-content">
            <h2 className="font-display text-3xl tracking-wide">Destinacione të ngjashme</h2>
            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item, index) => (
                <Reveal as="li" key={item.slug} delay={index * 0.08}>
                  <DestinationCard destination={item} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
