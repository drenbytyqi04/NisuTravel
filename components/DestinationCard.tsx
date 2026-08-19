import Link from 'next/link';
import { SmartImage } from '@/components/SmartImage';
import type { Destination } from '@/data/destinations';

type DestinationCardProps = {
  destination: Destination;
  /** `true` vetëm për kartelat mbi palosje (ngarkohen menjëherë). */
  priority?: boolean;
  className?: string;
};

/**
 * Kartelë destinacioni.
 *
 * Në hover: kartela ngrihet lehtë, fotoja zmadhohet brenda kornizës dhe emri
 * kalon në tonin e artë të markës. Të gjitha animohen me `transform` dhe
 * ngjyrë — pa ndikim në layout. Pa çmime — kurrë.
 */
export function DestinationCard({ destination, priority = false, className }: DestinationCardProps) {
  return (
    <article
      className={`group relative isolate h-full overflow-hidden rounded-2xl shadow-soft transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none ${className ?? ''}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4]">
        <SmartImage
          src={destination.image.src}
          alt={destination.image.alt}
          fill
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/45 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-3xl uppercase leading-none tracking-wide text-white transition-colors duration-300 group-hover:text-gold">
          {destination.name}
        </h3>
        <p className="mt-2 text-sm leading-snug text-white/85">{destination.shortLine}</p>
      </div>

      {/* Lidhja mbulon tërë kartelën, por mbetet një lidhje e vetme e kapshme. */}
      <Link
        href={`/destinacionet/${destination.slug}`}
        className="absolute inset-0 rounded-2xl focus-visible:outline-offset-[-3px]"
      >
        <span className="sr-only">Shiko destinacionin {destination.name}</span>
      </Link>
    </article>
  );
}
