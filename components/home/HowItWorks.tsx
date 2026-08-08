import Link from 'next/link';
import {
  ArrowRightIcon,
  CompassIcon,
  TakeoffIcon,
  WhatsAppIcon,
} from '@/components/Icons';
import { Reveal } from '@/components/Reveal';
import { whatsappUrl } from '@/lib/whatsapp';

/**
 * "Si të merrni ofertën tuaj" — kartela që mbivendoset mbi fund të hero-s.
 *
 * Zëvendëson shiritin e mëparshëm të kërkimit. Faqja nuk ka motor rezervimesh,
 * prandaj në vend që të imitojë një kërkim që nuk ekziston, ky seksion shpjegon
 * qartë rrugën reale: një mesazh, një ofertë, një udhëtim.
 */

const steps = [
  {
    icon: WhatsAppIcon,
    title: 'Na shkruani',
    description:
      'Dërgoni destinacionin, datat dhe numrin e udhëtarëve. Një mesazh i shkurtër mjafton.',
  },
  {
    icon: CompassIcon,
    title: 'Merrni ofertën',
    description:
      'Ju kthejmë opsionet më të mira me çmim të qartë — pa detyrim dhe pa tarifa të fshehura.',
  },
  {
    icon: TakeoffIcon,
    title: 'Nisuni',
    description:
      'Ne kujdesemi për biletat, hotelin dhe transferin. Ju përgatitni vetëm valixhen.',
  },
];

export function HowItWorks() {
  return (
    <div id="kerko-oferte" className="card scroll-mt-28 p-8 shadow-lift sm:p-10">
      <div className="max-w-2xl">
        <p className="eyebrow">Si funksionon</p>
        <h2 className="mt-3 font-display text-3xl tracking-wide sm:text-4xl">
          Si të merrni ofertën tuaj
        </h2>
        <p className="mt-4 leading-relaxed text-charcoal/70">
          Pa formularë të gjatë dhe pa rezervim online. Ju shkruani, ne punojmë —
          dhe ju përgjigjet një person i vërtetë, jo një sistem.
        </p>
      </div>

      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 0.1}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-soft text-emerald-deep">
                <step.icon className="h-6 w-6" />
              </span>
              <span
                aria-hidden="true"
                className="font-display text-3xl leading-none text-charcoal/15"
              >
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl tracking-wide">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
              {step.description}
            </p>
          </Reveal>
        ))}
      </ol>

      <div className="mt-10 flex flex-col gap-3 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-charcoal/60">
          Përgjigjemi brenda pak minutash gjatë orarit të punës.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Kërko ofertë në WhatsApp
          </a>
          <Link href="/kontakti" className="btn-outline">
            Plotëso formularin
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
