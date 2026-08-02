'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
 * Navbar-i ngjitës: transparent mbi hero, i mbushur me smerald pas skrollimit.
 * Në faqet e brendshme (jo ballina) fillon i mbushur, sepse nuk ka hero të errët.
 */
export function Navbar() {
  const pathname = usePathname();
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-emerald-deep shadow-soft' : 'bg-gradient-to-b from-black/45 to-transparent'
      }`}
    >
      <nav aria-label="Navigimi kryesor" className="container-content flex h-20 items-center justify-between">
        <Logo width={140} className="h-auto w-[124px] sm:w-[140px]" />

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-xl px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white/15 ${
                  active ? 'bg-white/15' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-deep transition-colors hover:bg-emerald-soft"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/15 lg:hidden"
        >
          <span className="sr-only">{menuOpen ? 'Mbyll menynë' : 'Hap menynë'}</span>
          {menuOpen ? <MenuIconSwap open /> : <MenuIconSwap />}
        </button>
      </nav>

      {/* Menyja mobile */}
      <div
        id="menu-mobil"
        hidden={!menuOpen}
        className="border-t border-white/15 bg-emerald-deep lg:hidden"
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
      </div>
    </header>
  );
}

function MenuIconSwap({ open = false }: { open?: boolean }) {
  return open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />;
}
