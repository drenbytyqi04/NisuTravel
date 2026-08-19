'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Stagger, StaggerItem } from '@/components/Reveal';
import { DestinationCard } from '@/components/DestinationCard';
import {
  destinationTypes,
  type Destination,
  type DestinationType,
} from '@/data/destinations';

type Filter = DestinationType | 'Të gjitha';

const filters: Filter[] = ['Të gjitha', ...destinationTypes];

/** Rrjetë destinacionesh me filtër sipas llojit (Plazh, Qytet, Ekzotike, Evropë). */
export function DestinationExplorer({ destinations }: { destinations: Destination[] }) {
  const [filter, setFilter] = useState<Filter>('Të gjitha');
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === 'Të gjitha'
        ? destinations
        : destinations.filter((destination) => destination.types.includes(filter)),
    [destinations, filter],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filtro sipas llojit">
        {filters.map((option) => {
          const active = option === filter;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={active}
              className={`relative rounded-2xl px-5 py-2.5 text-sm font-semibold shadow-soft transition-[color,transform] duration-200 hover:-translate-y-0.5 active:scale-95 motion-reduce:transform-none ${
                active ? 'text-white' : 'bg-white text-charcoal/70 hover:text-emerald-deep'
              }`}
            >
              {/* Sfondi i filtrit aktiv rrëshqet mes butonave. */}
              {active ? (
                <motion.span
                  layoutId="tregues-filtri"
                  className="absolute inset-0 rounded-2xl bg-emerald-deep"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 32 }
                  }
                />
              ) : null}
              <span className="relative z-10">{option}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-charcoal/60" aria-live="polite">
        {visible.length === 1
          ? '1 destinacion'
          : `${visible.length} destinacione`}
      </p>

      <Stagger
        as="ul"
        /* `key` i lidhur me filtrin: rrjeta rimontohet dhe animacioni rifillon
           sa herë ndryshon zgjedhja. */
        key={filter}
        className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {visible.map((destination, index) => (
          <StaggerItem as="li" key={destination.slug}>
            <DestinationCard destination={destination} priority={index < 4} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
