'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * NGARKUESI I FAQES
 * ---------------------------------------------------------------------------
 * Shfaqet vetëm në vizitën e parë të sesionit dhe zgjat rreth 1.2 sekonda.
 *
 * Ndarja e përgjegjësive është me qëllim:
 *   • CSS-ja e largon mbulesën (shih `.page-loader` te globals.css) — kështu
 *     faqja mbetet e përdorshme edhe nëse JavaScript-i vonohet ose dështon;
 *   • ky komponent vetëm shënon sesionin dhe e heq nga DOM-i pas animacionit.
 *
 * Markup-i është i njëjtë në server dhe në klient, prandaj nuk ka mospërputhje
 * gjatë hidratimit. Vizitat e mëpasme brenda sesionit nuk e shohin aspak, sepse
 * skripti te `LoaderSeenScript` vendos klasën `loader-seen` para se mbulesa të
 * lexohet nga shfletuesi.
 */

const SESSION_KEY = 'nisu-loader-seen';
/** Sa zgjat animacioni i plotë para se elementi të hiqet nga DOM-i. */
const TOTAL_MS = 1300;

export function PageLoader() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === '1';
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // Modaliteti privat mund ta bllokojë sessionStorage — vazhdojmë pa të.
    }

    if (seen) {
      setMounted(false);
      return;
    }

    const timer = window.setTimeout(() => setMounted(false), TOTAL_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="page-loader" aria-hidden="true">
      <div className="page-loader__mark">
        <Image
          src="/logo.svg"
          alt=""
          width={260}
          height={65}
          priority
          unoptimized
          className="h-auto w-[200px] sm:w-[260px]"
        />
        <svg
          className="page-loader__plane h-6 w-6 sm:h-7 sm:w-7"
          viewBox="-12 -27 124 54"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M112 0 L96 7 L58 10 L30 27 L17 27 L34 10 L14 11 L4 21 L-5 21 L1 8 L-12 0 L1 -8 L-5 -21 L4 -21 L14 -11 L34 -10 L17 -27 L30 -27 L58 -10 L96 -7 Z" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Skript i vogël bllokues në krye të <body>: nëse ngarkuesi është parë tashmë
 * në këtë sesion, shënon <html> që CSS-ja ta fshehë menjëherë. Pa këtë, një
 * rifreskim brenda sesionit do të shkaktonte një pulsim të shkurtër.
 */
export function LoaderSeenScript() {
  const script = `try{if(sessionStorage.getItem('${SESSION_KEY}')==='1'){document.documentElement.classList.add('loader-seen')}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
