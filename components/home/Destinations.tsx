import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';
import { DestinationCard } from '@/components/DestinationCard';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { destinations } from '@/data/destinations';

export function Destinations() {
  return (
    <section id="destinacionet" className="bg-white py-20 lg:py-28">
      <div className="container-content">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Destinacionet"
            title="Ku po nisemi këtë vit"
            description="Nga plazhet e Turqisë te tempujt e Balit — zgjidhni destinacionin dhe ne organizojmë gjithçka."
          />
          <Reveal delay={0.15}>
            <Link href="/destinacionet" className="btn-outline">
              Të gjitha destinacionet
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <StaggerItem as="li" key={destination.slug}>
              <DestinationCard destination={destination} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
