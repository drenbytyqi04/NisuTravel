'use client';

import { useId, useState, type FormEvent } from 'react';
import { CalendarIcon, MapPinIcon, TakeoffIcon, UsersIcon, WhatsAppIcon } from '@/components/Icons';
import { enquiryMessage, whatsappUrl } from '@/lib/whatsapp';

/**
 * SHIRITI I KËRKESËS ("search bar" pamor)
 * ---------------------------------------------------------------------------
 * Duket si një motor kërkimi udhëtimesh, por ME QËLLIM nuk kërkon asnjë API
 * dhe nuk shfaq rezultate. Në dërgim:
 *
 *   1. fushat e plotësuara shndërrohen në një mesazh teksti (enquiryMessage),
 *   2. mesazhi kodohet në një lidhje wa.me (whatsappUrl),
 *   3. lidhja hapet në një dritare të re — biseda vazhdon në WhatsApp.
 *
 * Kur të lidhet motori i vërtetë i rezervimeve përmes API-t, zëvendësohet
 * vetëm trupi i `handleSubmit`; pjesa tjetër e komponentit mbetet e njëjtë.
 */
export function EnquiryBar() {
  const id = useId();
  const [from, setFrom] = useState('Prishtinë');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [travellers, setTravellers] = useState('2 të rritur');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!to.trim()) {
      setError('Ju lutemi shkruani destinacionin.');
      return;
    }

    setError(null);
    const message = enquiryMessage({ from, to, date, travellers });
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <form
      id="kerko-oferte"
      onSubmit={handleSubmit}
      aria-labelledby={`${id}-titulli`}
      className="card scroll-mt-28 p-6 shadow-lift sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={`${id}-titulli`} className="font-display text-2xl tracking-wide sm:text-3xl">
          Kërko ofertë
        </h2>
        <p className="text-sm text-charcoal/60">
          Plotësoni fushat — kërkesa hapet e gatshme në WhatsApp.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Field label="Nga" htmlFor={`${id}-nga`} icon={<TakeoffIcon className="h-5 w-5" />}>
          <input
            id={`${id}-nga`}
            name="nga"
            type="text"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            placeholder="Prishtinë"
            autoComplete="off"
            className="w-full bg-transparent text-base font-medium outline-none placeholder:font-normal placeholder:text-charcoal/40"
          />
        </Field>

        <Field label="Për" htmlFor={`${id}-per`} icon={<MapPinIcon className="h-5 w-5" />}>
          <input
            id={`${id}-per`}
            name="per"
            type="text"
            value={to}
            onChange={(event) => {
              setTo(event.target.value);
              if (error) setError(null);
            }}
            placeholder="p.sh. Antalia"
            autoComplete="off"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-gabimi` : undefined}
            className="w-full bg-transparent text-base font-medium outline-none placeholder:font-normal placeholder:text-charcoal/40"
          />
        </Field>

        <Field label="Data" htmlFor={`${id}-data`} icon={<CalendarIcon className="h-5 w-5" />}>
          <input
            id={`${id}-data`}
            name="data"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full bg-transparent text-base font-medium outline-none"
          />
        </Field>

        <Field label="Udhëtarë" htmlFor={`${id}-udhetare`} icon={<UsersIcon className="h-5 w-5" />}>
          <select
            id={`${id}-udhetare`}
            name="udhetare"
            value={travellers}
            onChange={(event) => setTravellers(event.target.value)}
            className="w-full appearance-none bg-transparent text-base font-medium outline-none"
          >
            <option>1 i rritur</option>
            <option>2 të rritur</option>
            <option>2 të rritur + 1 fëmijë</option>
            <option>2 të rritur + 2 fëmijë</option>
            <option>3 të rritur</option>
            <option>4 të rritur</option>
            <option>Grup (5+)</option>
          </select>
        </Field>
      </div>

      {error ? (
        <p id={`${id}-gabimi`} role="alert" className="mt-4 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-charcoal/60">
          Pa rezervim online — një person i vërtetë ju përgjigjet.
        </p>
        <button type="submit" className="btn-whatsapp w-full sm:w-auto">
          <WhatsAppIcon className="h-5 w-5" />
          Dërgo kërkesën
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  icon,
  children,
}: {
  label: string;
  htmlFor: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-offwhite px-4 py-3 transition-colors focus-within:bg-emerald-soft">
      <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-widest text-charcoal/50">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2.5 text-emerald-deep">
        <span aria-hidden="true">{icon}</span>
        <span className="min-w-0 flex-1 text-charcoal">{children}</span>
      </div>
    </div>
  );
}
