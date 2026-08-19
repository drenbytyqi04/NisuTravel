'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

/**
 * Fotografi me rrjetë sigurie dhe me skelet gjatë ngarkimit.
 *
 * • Derisa fotoja ngarkohet, në vend të saj shfaqet një skelet me shkëlqim
 *   (`.skeleton`), që faqja të mos duket bosh në lidhje të ngadalta.
 * • Kur fotoja mbërrin, shfaqet me një kalim të butë vetëm në `opacity`.
 * • Nëse URL-ja dështon, shfaqet sfond me gradient të markës — kurrë ikonë e
 *   thyer. Fotot vendmbajtëse vijnë nga një host i jashtëm (shih /data), prandaj
 *   kjo rrjetë ka rëndësi.
 */
export function SmartImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
    <>
      {/*
        Skeleti qëndron nën fotografinë e pozicionuar absolutisht: derisa
        fotoja të mbërrijë, elementi i saj është i tejdukshëm dhe duket
        shkëlqimi; sapo ngarkohet, fotoja e mbulon dhe skeleti hiqet.

        Me qëllim NUK i vendoset `transition-opacity` vetë fotografisë —
        do të binte ndesh me `transition-transform` që i kalon thirrësi
        (p.sh. zmadhimi në hover te kartelat e destinacioneve).
      */}
      {!loaded && props.fill ? (
        <div aria-hidden="true" className="skeleton absolute inset-0 h-full w-full" />
      ) : null}

      <Image
        alt={alt}
        className={className}
        onError={() => setFailed(true)}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </>
  );
}
