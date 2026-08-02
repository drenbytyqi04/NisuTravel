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
 * Kartelë destinacioni: fotografi me zoom të lehtë në hover, gradient smeraldi
 * në fund dhe emri me shkronja të mëdha të kondensuara. Pa çmime — kurrë.
 */
export function DestinationCard({ destination, priority = false, className }: DestinationCardProps) {
  return (
    <article
      className={`group relative isolate overflow-hidden rounded-2xl shadow-soft transition-shadow duration-300 hover:shadow-lift ${className ?? ''}`}
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[3/4]">
        <SmartImage
          src={destination.image.src}
          alt={destination.image.alt}
          fill
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/45 to-transparent opacity-90"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-3xl uppercase leading-none tracking-wide text-white">
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
