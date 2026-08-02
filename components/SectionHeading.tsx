import { Reveal } from '@/components/Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Në sfond të errët teksti kthehet i bardhë. */
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
}: SectionHeadingProps) {
  const dark = tone === 'dark';

  return (
    <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? (
        <p className={`eyebrow ${dark ? 'text-gold' : ''}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`section-title mt-3 ${dark ? 'text-white' : 'text-charcoal'}`}>{title}</h2>
      {description ? (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/80' : 'text-charcoal/70'}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
