import Link from 'next/link';
import { ArrowRightIcon, WhatsAppIcon } from '@/components/Icons';
import { Stagger, StaggerItem } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';
import { media } from '@/data/media';
import { whatsappUrl } from '@/lib/whatsapp';

type CtaBandProps = {
  title?: string;
  description?: string;
};

export function CtaBand({
  title = 'Gati për t’u nisur?',
  description = 'Na shkruani ku dëshironi të shkoni dhe kur — përgjigjen e merrni brenda pak minutash gjatë orarit të punës.',
}: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <SmartImage
        src={media.cta.src}
        alt={media.cta.alt}
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-charcoal/75" />

      <Stagger className="container-content relative py-20 text-center lg:py-24">
        <StaggerItem>
          <h2 className="section-title mx-auto max-w-3xl text-white">{title}</h2>
        </StaggerItem>

        <StaggerItem>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {description}
          </p>
        </StaggerItem>

        <StaggerItem className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <WhatsAppIcon className="h-5 w-5" />
            Shkruaj në WhatsApp
          </a>
          <Link href="/kontakti" className="btn-ghost">
            Plotëso formularin
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
