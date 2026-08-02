import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 * ---------------------------------------------------------------------------
 * Pranon formularin e kontaktit, e validon në server dhe e regjistron në log.
 *
 * TODO (hapi i ardhshëm): dërgimi i emailit me Resend.
 *   1. npm install resend
 *   2. Shtoni RESEND_API_KEY te .env.local (dhe te Vercel → Project Settings →
 *      Environment Variables).
 *   3. Zëvendësoni bllokun "REGJISTRIM" më poshtë me:
 *
 *        import { Resend } from 'resend';
 *        const resend = new Resend(process.env.RESEND_API_KEY);
 *        await resend.emails.send({
 *          from: 'Nisu Travel <faqja@nisutravel.com>',
 *          to: site.contact.email,
 *          replyTo: data.email,
 *          subject: `Kërkesë e re nga ${data.name}`,
 *          text: `...`,
 *        });
 *
 * Deri atëherë, kërkesat shihen te logjet e serverit (Vercel → Logs).
 */

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Numra si +383 49 123 456, 049123456, 0049 49 123 456. */
const PHONE_PATTERN = /^[+()\d][\d\s()-]{5,19}$/;

function validate(input: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Ju lutemi shkruani emrin tuaj.';
  }

  if (!input.email || !EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'Ju lutemi shkruani një email të vlefshëm.';
  }

  if (!input.phone || !PHONE_PATTERN.test(input.phone.trim())) {
    errors.phone = 'Ju lutemi shkruani një numër telefoni të vlefshëm.';
  }

  if (!input.destination || input.destination.trim().length < 2) {
    errors.destination = 'Ju lutemi shkruani destinacionin.';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Mesazhi duhet të ketë së paku 10 karaktere.';
  }

  return errors;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Kërkesa nuk mund të lexohej.' },
      { status: 400 },
    );
  }

  const errors = validate(body);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: 'Ju lutemi kontrolloni fushat e shënuara.', errors },
      { status: 422 },
    );
  }

  const data: ContactPayload = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    phone: body.phone!.trim(),
    destination: body.destination!.trim(),
    message: body.message!.trim(),
  };

  // --- REGJISTRIM (përkohësisht, deri te lidhja me Resend) --------------------
  console.info('[kontakt] Kërkesë e re:', {
    ...data,
    receivedAt: new Date().toISOString(),
  });
  // ---------------------------------------------------------------------------

  return NextResponse.json({
    ok: true,
    message: 'Faleminderit! Kërkesa u dërgua — ju kontaktojmë sa më shpejt.',
  });
}
