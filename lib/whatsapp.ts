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
