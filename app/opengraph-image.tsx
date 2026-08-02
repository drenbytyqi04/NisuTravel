import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

/**
 * Fotografia që shfaqet kur faqja ndahet në WhatsApp, Facebook ose Instagram.
 * Gjenerohet automatikisht — nuk ka nevojë për skedar PNG.
 */
export const alt = 'Nisu Travel — Nisu me ne';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #047857 0%, #059669 55%, #04543d 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 18,
              height: 88,
              background: '#D4AF37',
              borderRadius: 9,
              display: 'flex',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 44, letterSpacing: 10, fontWeight: 700 }}>NISU TRAVEL</div>
            <div style={{ fontSize: 26, opacity: 0.85, letterSpacing: 2 }}>Prishtinë, Kosovë</div>
          </div>
        </div>

        <div style={{ fontSize: 132, fontWeight: 800, marginTop: 48, lineHeight: 1 }}>
          {site.tagline}
        </div>

        <div style={{ fontSize: 34, opacity: 0.9, marginTop: 28, maxWidth: 900 }}>
          Bileta ajrore, hotele dhe aranzhmane turistike — të organizuara për ty.
        </div>
      </div>
    ),
    size,
  );
}
