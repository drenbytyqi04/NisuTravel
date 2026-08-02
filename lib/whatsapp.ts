import { site } from '@/data/site';

/**
 * NDËRTIMI I LIDHJEVE TË WHATSAPP-IT
 * ---------------------------------------------------------------------------
 * Faqja NUK ka motor rezervimesh. Çdo "kërkesë për ofertë" përfundon si një
 * mesazh i parambushur në WhatsApp, të cilin klienti vetëm e dërgon. Numri
 * merret nga /data/site.ts — ndryshohet vetëm atje.
 */

/** Lidhje wa.me me mesazh të parambushur. */
export function whatsappUrl(message: string = site.whatsappDefaultMessage): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type EnquiryDetails = {
  from: string;
  to: string;
  date: string;
  travellers: string;
};

/**
 * Mesazhi i shiritit të kërkimit në ballinë.
 *
 * Shiriti duket si një motor kërkimi, por nuk thërret asnjë API: fushat e
 * plotësuara shndërrohen në tekst dhe hapin bisedën në WhatsApp. Fushat e
 * zbrazëta thjesht nuk përfshihen në mesazh.
 */
export function enquiryMessage({ from, to, date, travellers }: EnquiryDetails): string {
  const lines = ['Përshëndetje Nisu Travel! Dëshiroj një ofertë për këtë udhëtim:'];

  if (from.trim()) lines.push(`• Nga: ${from.trim()}`);
  if (to.trim()) lines.push(`• Për: ${to.trim()}`);
  if (date.trim()) lines.push(`• Data: ${formatDate(date)}`);
  if (travellers.trim()) lines.push(`• Udhëtarë: ${travellers.trim()}`);

  lines.push('Faleminderit!');

  return lines.join('\n');
}

/** Mesazhi i butonit "Kërko ofertë" në faqen e një destinacioni. */
export function destinationMessage(destinationName: string): string {
  return `Përshëndetje Nisu Travel! Dëshiroj një ofertë për ${destinationName}. A mund të më dërgoni detajet?`;
}

/** Mesazhi i dërguar nga formulari i kontaktit si alternativë e shpejtë. */
export function contactMessage(name?: string): string {
  return name?.trim()
    ? `Përshëndetje Nisu Travel! Unë jam ${name.trim()} dhe dëshiroj një ofertë për udhëtim.`
    : site.whatsappDefaultMessage;
}

/** Shndërron 2026-07-14 në 14.07.2026 për një mesazh më të lexueshëm. */
function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return value.trim();
  const [, year, month, day] = match;
  return `${day}.${month}.${year}`;
}
