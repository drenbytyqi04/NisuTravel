'use client';

import { WhatsAppIcon } from '@/components/Icons';
import { whatsappUrl } from '@/lib/whatsapp';

/**
 * Butoni pluskues i WhatsApp-it — poshtë djathtas.
 * Shfaqet gjithmonë në celular; në desktop pas 1024px fshihet, sepse aty
 * butoni i WhatsApp-it është pjesë e navbar-it.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#04301a] shadow-lift transition-transform duration-200 hover:scale-105 active:scale-95 motion-reduce:transform-none motion-reduce:transition-none lg:hidden"
    >
      <span className="sr-only">Shkruaj në WhatsApp</span>
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
