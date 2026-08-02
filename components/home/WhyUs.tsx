import { CheckIcon } from '@/components/Icons';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { reasons } from '@/data/services';

export function WhyUs() {
  return (
    <section id="pse-nisu" className="py-20 lg:py-28">
      <div className="container-content grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
        <SectionHeading
          eyebrow="Pse Nisu Travel"
          title="Udhëtim pa pyetje të pahijshme"
          description="Jemi agjenci e vogël me shumë përvojë — dhe kjo është pikërisht arsyeja pse ju përgjigjemi shpejt dhe qartë."
        />

        <ul className="grid gap-6 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal as="li" key={reason.title} delay={index * 0.08}>
              <div className="card h-full p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-deep text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl tracking-wide">{reason.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-charcoal/70">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
