import type { Metadata } from 'next';
import { CtaBand } from '@/components/CtaBand';
import { PageHero } from '@/components/PageHero';
import { DestinationExplorer } from '@/app/destinacionet/DestinationExplorer';
import { destinations } from '@/data/destinations';
import { media } from '@/data/media';

export const metadata: Metadata = {
  title: 'Destinacionet',
  description:
    'Të gjitha destinacionet e Nisu Travel — plazhe, qytete, destinacione ekzotike dhe Evropë. Turqi, Dubai, Egjipt, Barcelonë, Gjermani, Zvicër, Santorini dhe Bali.',
  alternates: { canonical: '/destinacionet' },
  openGraph: {
    title: 'Destinacionet | Nisu Travel',
    description:
      'Zgjidhni destinacionin tuaj të radhës — ne organizojmë biletat, hotelin dhe transferin.',
    url: '/destinacionet',
  },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinacionet"
        title="Zgjidhni ku doni të nisemi"
        description="Filtroni sipas llojit të udhëtimit dhe hapni destinacionin që ju intereson. Për çdo ofertë na shkruani në WhatsApp."
        image={media.cta}
      />

      <section className="py-16 lg:py-20">
        <div className="container-content">
          <DestinationExplorer destinations={destinations} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
