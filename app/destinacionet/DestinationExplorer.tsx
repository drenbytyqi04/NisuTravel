'use client';

import { useMemo, useState } from 'react';
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
              className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                active
                  ? 'bg-emerald-deep text-white shadow-soft'
                  : 'bg-white text-charcoal/70 shadow-soft hover:text-emerald-deep'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-charcoal/60" aria-live="polite">
        {visible.length === 1
          ? '1 destinacion'
          : `${visible.length} destinacione`}
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((destination, index) => (
          <li key={destination.slug}>
            <DestinationCard destination={destination} priority={index < 4} />
          </li>
        ))}
      </ul>
    </div>
  );
}
