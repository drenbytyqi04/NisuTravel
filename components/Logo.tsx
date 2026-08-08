import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  className?: string;
  /**
   * Gjerësia në piksela; lartësia llogaritet nga raporti i logos.
   * Nëse zëvendësoni /public/logo.svg me një raport tjetër, përditësoni
   * `LOGO_RATIO` më poshtë.
   */
  width?: number;
  /** Nëse është `false`, logoja nuk mbështillet me lidhje drejt ballinës. */
  linked?: boolean;
};

/** Raporti gjerësi:lartësi i skedarit /public/logo.svg (440 × 110). */
const LOGO_RATIO = 4;

/**
 * Logoja e markës — wordmark i bardhë "NISU TRAVEL" me aeroplan mbi shkronjën N.
 * Skedari: /public/logo.svg (zëvendësohet me logon zyrtare pa ndryshuar kod).
 */
export function Logo({ className, width = 156, linked = true }: LogoProps) {
  const image = (
    <Image
      src="/logo.svg"
      alt="Nisu Travel"
      width={width}
      height={Math.round(width / LOGO_RATIO)}
      priority
      /* SVG-të nuk kanë nevojë për optimizim dhe optimizuesi i Next.js
         i refuzon si parazgjedhje — prandaj shërbehet drejtpërdrejt. */
      unoptimized
      className={className}
    />
  );

  if (!linked) return image;

  return (
    <Link
      href="/"
      aria-label="Nisu Travel — kthehu te ballina"
      className="inline-flex items-center rounded-lg"
    >
      {image}
    </Link>
  );
}
