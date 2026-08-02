import { BedIcon, CheckIcon, CompassIcon, PlaneIcon } from '@/components/Icons';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { services, type ServiceIcon } from '@/data/services';

const icons: Record<ServiceIcon, typeof PlaneIcon> = {
  plane: PlaneIcon,
  bed: BedIcon,
  compass: CompassIcon,
};

export function Services() {
  return (
    <section id="sherbimet" className="py-20 lg:py-28">
      <div className="container-content">
        <SectionHeading
          eyebrow="Shërbimet"
          title="Çfarë bëjmë për ju"
          description="Tri shërbime, një bisedë. Ju thoni ku doni të shkoni — ne kujdesemi për pjesën tjetër."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal as="li" key={service.id} delay={index * 0.1}>
                <article className="card h-full p-8 transition-shadow duration-300 hover:shadow-lift">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-soft text-emerald-deep">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl tracking-wide">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-charcoal/70">{service.description}</p>
                  <ul className="mt-6 space-y-2.5 text-sm text-charcoal/80">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-mid" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
