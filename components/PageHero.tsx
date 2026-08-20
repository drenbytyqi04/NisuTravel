import { SmartImage } from '@/components/SmartImage';
import { Stagger, StaggerItem } from '@/components/Reveal';
import type { Media } from '@/data/media';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image: Media;
};

/** Hero i ngushtë për faqet e brendshme — foto, mbulesë smeraldi, titull. */
export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <SmartImage
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-emerald-deep/90 to-charcoal/85"
      />

      {/* Pa zbehje: titulli i faqes është kandidati i LCP-së. */}
      <Stagger className="container-content relative pb-16 pt-36 sm:pb-20 sm:pt-40">
        {eyebrow ? (
          <StaggerItem fade={false}>
            <p className="eyebrow text-gold">{eyebrow}</p>
          </StaggerItem>
        ) : null}

        <StaggerItem fade={false}>
          <h1 className="section-title mt-3 max-w-3xl text-white">{title}</h1>
        </StaggerItem>

        {description ? (
          <StaggerItem fade={false}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{description}</p>
          </StaggerItem>
        ) : null}
      </Stagger>
    </section>
  );
}
