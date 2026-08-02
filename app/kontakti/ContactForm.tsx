'use client';

import { useId, useState, type FormEvent } from 'react';
import { ArrowRightIcon, CheckIcon } from '@/components/Icons';

type Fields = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const empty: Fields = { name: '', email: '', phone: '', destination: '', message: '' };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d][\d\s()-]{5,19}$/;

/** E njëjta logjikë validimi si në server — këtu vetëm për përgjigje të shpejtë. */
function validate(values: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Ju lutemi shkruani emrin tuaj.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Ju lutemi shkruani një email të vlefshëm.';
  if (!PHONE_PATTERN.test(values.phone.trim())) errors.phone = 'Ju lutemi shkruani një numër telefoni të vlefshëm.';
  if (values.destination.trim().length < 2) errors.destination = 'Ju lutemi shkruani destinacionin.';
  if (values.message.trim().length < 10) errors.message = 'Mesazhi duhet të ketë së paku 10 karaktere.';
  return errors;
}

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  function update<K extends keyof Fields>(field: K, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      setFeedback('Ju lutemi kontrolloni fushat e shënuara.');
      return;
    }

    setStatus('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message: string;
        errors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus('error');
        setFeedback(result.message ?? 'Diçka shkoi keq. Provoni përsëri.');
        return;
      }

      setStatus('success');
      setFeedback(result.message);
      setValues(empty);
    } catch {
      setStatus('error');
      setFeedback(
        'Nuk arritëm ta dërgojmë kërkesën. Provoni përsëri ose na shkruani në WhatsApp.',
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center sm:p-10" role="status">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft text-emerald-deep">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-3xl tracking-wide">Faleminderit!</h2>
        <p className="mt-3 leading-relaxed text-charcoal/70">{feedback}</p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFeedback('');
          }}
          className="btn-outline mt-8"
        >
          Dërgo një kërkesë tjetër
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-8 sm:p-10">
      <h2 className="font-display text-3xl tracking-wide">Dërgoni kërkesën tuaj</h2>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
        Plotësoni formularin dhe ju kthejmë përgjigje me opsionet më të mira. Fushat
        me yll janë të detyrueshme.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <TextField
          id={`${id}-emri`}
          label="Emri"
          required
          value={values.name}
          onChange={(value) => update('name', value)}
          error={errors.name}
          autoComplete="name"
          placeholder="Emri dhe mbiemri"
        />
        <TextField
          id={`${id}-email`}
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={(value) => update('email', value)}
          error={errors.email}
          autoComplete="email"
          placeholder="ju@example.com"
        />
        <TextField
          id={`${id}-telefoni`}
          label="Telefoni"
          type="tel"
          required
          value={values.phone}
          onChange={(value) => update('phone', value)}
          error={errors.phone}
          autoComplete="tel"
          placeholder="+383 4X XXX XXX"
        />
        <TextField
          id={`${id}-destinacioni`}
          label="Destinacioni"
          required
          value={values.destination}
          onChange={(value) => update('destination', value)}
          error={errors.destination}
          placeholder="p.sh. Antalia, Dubai, Cyrih"
        />

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-mesazhi`} className="text-sm font-semibold text-charcoal">
            Mesazhi <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${id}-mesazhi`}
            name="mesazhi"
            rows={5}
            required
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${id}-mesazhi-gabimi` : undefined}
            placeholder="Datat e udhëtimit, numri i udhëtarëve, preferencat për hotelin…"
            className={`mt-2 w-full rounded-2xl bg-offwhite px-4 py-3 text-base outline-none transition-colors placeholder:text-charcoal/40 focus:bg-emerald-soft ${
              errors.message ? 'ring-2 ring-red-600' : ''
            }`}
          />
          {errors.message ? (
            <p id={`${id}-mesazhi-gabimi`} className="mt-2 text-sm font-medium text-red-700">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      {status === 'error' && feedback ? (
        <p role="alert" className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {feedback}
        </p>
      ) : null}

      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-8 w-full sm:w-auto">
        {status === 'sending' ? 'Duke dërguar…' : 'Dërgo kërkesën'}
        {status === 'sending' ? null : <ArrowRightIcon className="h-4 w-4" />}
      </button>
    </form>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-charcoal">
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-gabimi` : undefined}
        className={`mt-2 w-full rounded-2xl bg-offwhite px-4 py-3 text-base outline-none transition-colors placeholder:text-charcoal/40 focus:bg-emerald-soft ${
          error ? 'ring-2 ring-red-600' : ''
        }`}
      />
      {error ? (
        <p id={`${id}-gabimi`} className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
