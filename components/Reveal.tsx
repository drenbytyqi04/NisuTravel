'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * PRIMITIVAT E ANIMACIONIT NË SKROLLIM
 * ---------------------------------------------------------------------------
 * Të gjitha animohen VETËM me `opacity` dhe `transform`, prandaj nuk shkaktojnë
 * rillogaritje të layout-it dhe mbeten të buta edhe në celular.
 *
 * Kur sistemi kërkon `prefers-reduced-motion`, elementet shfaqen menjëherë në
 * gjendjen e tyre përfundimtare — pa lëvizje fare.
 *
 *   <Reveal>            një element i vetëm
 *   <Stagger><StaggerItem>…   listë ku elementet hyjnë njëri pas tjetrit
 *
 * Elementet nisin me `opacity: 0` edhe në HTML-në e serverit. Që përmbajtja të
 * mos mbetet e padukshme nëse JavaScript-i dështon, secili mban atributin
 * `data-reveal`, të cilin një rregull CSS te <noscript> (shih app/layout.tsx)
 * e kthen në gjendje të dukshme.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const DISTANCE = 18;

/** Vonesa mes elementeve të një liste (sekonda). */
const STAGGER_STEP = 0.09;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/**
 * Variant vetëm me rrëshqitje, pa zbehje.
 *
 * Përdoret për tekstin mbi palosje (hero-t): elementi është i dukshëm që në
 * kuadrin e parë, prandaj nuk e vonon matjen e LCP-së — thjesht rrëshqet në
 * vend. Zbehja mbetet për përmbajtjen nën palosje.
 */
const slideVariants: Variants = {
  hidden: { y: DISTANCE },
  show: { y: 0, transition: { duration: 0.55, ease: EASE } },
};

type ElementTag = 'div' | 'section' | 'li' | 'article';

type RevealProps = {
  children: ReactNode;
  /** Vonesa në sekonda — për të shkallëzuar elemente të pavarura. */
  delay?: number;
  className?: string;
  as?: ElementTag;
};

/** Animacion i butë "fade-up" kur elementi hyn në ekran. Nuk përsëritet. */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      // Shënohet që CSS-ja te <noscript> ta bëjë të dukshëm nëse JS nuk vjen.
      data-reveal=""
      initial={{ opacity: 0, y: DISTANCE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol';
  /** Vonesa para se të nisë elementi i parë. */
  delay?: number;
};

/**
 * Kontejner liste: fëmijët e mbështjellë me <StaggerItem> hyjnë njëri pas
 * tjetrit. Vetëm kontejneri e vëzhgon ekranin, jo çdo element veç e veç.
 */
export function Stagger({ children, className, as = 'div', delay = 0 }: StaggerProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: STAGGER_STEP, delayChildren: delay } },
      }}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: ElementTag;
  /**
   * `false` = vetëm rrëshqitje, pa zbehje. Përdoreni për tekst mbi palosje,
   * që të mos vonohet LCP-ja.
   */
  fade?: boolean;
};

/** Një element brenda <Stagger>. Radhën e cakton kontejneri. */
export function StaggerItem({ children, className, as = 'div', fade = true }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      data-reveal=""
      variants={fade ? itemVariants : slideVariants}
    >
      {children}
    </Component>
  );
}
