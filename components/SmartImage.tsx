'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

/**
 * Fotografi me rrjetë sigurie.
 *
 * Fotot vendmbajtëse vijnë nga një burim i jashtëm (Unsplash). Nëse një URL
 * ndryshon ose nuk arrihet, në vend të një ikone të thyer shfaqet një sfond
 * me gradient të markës — faqja mbetet e bukur edhe kur fotoja mungon.
 * Kur t'i zëvendësoni me foto tuajat, sillja e komponentit mbetet e njëjtë.
 */
export function SmartImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-emerald-deep via-emerald-mid to-emerald-deep ${
          // Me `fill`, fotoja mbulon prindin — zëvendësuesi duhet të bëjë të njëjtën gjë.
          props.fill ? 'absolute inset-0 h-full w-full' : ''
        } ${className ?? ''}`}
      />
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
