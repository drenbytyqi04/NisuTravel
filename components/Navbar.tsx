'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { CloseIcon, MenuIcon, WhatsAppIcon } from '@/components/Icons';
import { whatsappUrl } from '@/lib/whatsapp';

const links = [
  { href: '/', label: 'Ballina' },
  { href: '/destinacionet', label: 'Destinacionet' },
  { href: '/rreth-nesh', label: 'Rreth nesh' },
  { href: '/kontakti', label: 'Kontakti' },
];

/**
 * Navbar-i ngjitës.
 *
 * Mbi hero është transparent; pas skrollimit mbushet me smerald, ngushtohet
 * pak, merr `backdrop-blur` dhe një hije të hollë. Në faqet e brendshme nis
 * i mbushur, sepse aty nuk ka hero të errët.
 *
 * Shënim mbi lartësinë: ndryshimi i saj animohet me tranzicion CSS. Header-i
 * është `fixed`, pra jashtë rrjedhës së dokumentit — ngushtimi nuk e lëviz
 * përmbajtjen e faqes dhe nuk prodhon zhvendosje layout-i (CLS).
 */
export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const solid = scrolled || !isHome || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mbyll menynë kur ndryshon faqja.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Ndalon skrollimin e faqes kur menyja mobile është e hapur.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid
          ? 'bg-emerald-deep/90 shadow-[0_1px_0_rgba(255,255,255,0.08),0_10px_30px_-16px_rgba(0,0,0,0.55)] backdrop-blur-md supports-[backdrop-filter]:bg-emerald-deep/80'
          : 'bg-gradient-to-b from-black/45 to-transparent'
      }`}
    >
      <nav
        aria-label="Navigimi kryesor"
        className={`container-content flex items-center justify-between transition-[height] duration-300 ease-out ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <Logo
          width={140}
          className={`h-auto w-[124px] origin-left transition-transform duration-300 ease-out motion-reduce:transform-none sm:w-[140px] ${
            scrolled ? 'scale-95' : 'scale-100'
          }`}
        />

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className="relative rounded-xl px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white/10"
              >
                {/* Treguesi i faqes aktive rrëshqet mes lidhjeve me layoutId. */}
                {active ? (
                  <motion.span
                    layoutId="tregues-navigimi"
                    className="absolute inset-0 rounded-xl bg-white/15"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 380, damping: 32 }
                    }
                  />
                ) : null}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-deep transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-emerald-soft active:scale-95 motion-reduce:transform-none"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobil"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/15 active:scale-95 motion-reduce:transform-none lg:hidden"
        >
          <span className="sr-only">{menuOpen ? 'Mbyll menynë' : 'Hap menynë'}</span>
          {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Menyja mobile — hapet me zbehje dhe rrëshqitje të shkurtër. */}
      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="menu-mobil"
            className="overflow-hidden border-t border-white/15 bg-emerald-deep lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container-content flex flex-col gap-1 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-white transition-colors hover:bg-white/15"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Shkruaj në WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
