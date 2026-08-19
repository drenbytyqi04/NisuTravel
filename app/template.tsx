'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * KALIMI MES FAQEVE
 * ---------------------------------------------------------------------------
 * `template.tsx` rimontohet në çdo navigim (ndryshe nga `layout.tsx`), prandaj
 * është vendi i duhur për animacionin e hyrjes së faqes.
 *
 * Ky komponent është "use client", por fëmijët i merr si props — faqet mbeten
 * komponentë serveri dhe vazhdojnë të gjenerohen statikisht.
 *
 * Kujdes: elementet me `position: fixed` (navbar-i, butoni i WhatsApp-it,
 * ngarkuesi) qëndrojnë te layout-i, jashtë këtij mbështjellësi — një ancestor i
 * transformuar do t'ua prishte pozicionimin.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
