import { Logo } from '@/components/Logo';
import { SmartImage } from '@/components/SmartImage';
import { WhatsAppIcon, ArrowRightIcon } from '@/components/Icons';
import { HowItWorks } from '@/components/home/HowItWorks';
import { media } from '@/data/media';
import { whatsappUrl } from '@/lib/whatsapp';

export function Hero() {
  return (
    <section className="relative">
      <div className="relative min-h-[92svh] overflow-hidden pb-40 sm:pb-32 lg:min-h-[88svh]">
        {/* Fotografia — e vetmja foto që ngarkohet me prioritet (LCP). */}
        {/*
          Ken Burns: zmadhim shumë i ngadaltë (22s) vetëm me `transform`.
          Realizohet me CSS, prandaj hero-ja mbetet komponent serveri dhe nuk
          shton asnjë JavaScript. Prindi ka `overflow-hidden`, që zmadhimi të
          mos dalë jashtë kornizës.
        */}
        <SmartImage
          src={media.hero.src}
          alt={media.hero.alt}
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover"
        />

        {/* Mbulesa smeraldi për kontrast AA të tekstit të bardhë. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-emerald-deep/85 via-emerald-deep/70 to-charcoal/85"
        />

        <div className="container-content relative flex min-h-[92svh] flex-col justify-center pb-24 pt-28 lg:min-h-[88svh]">
          <div className="max-w-2xl">
            <Logo width={200} linked={false} className="h-auto w-[168px] sm:w-[200px]" />

            <h1 className="mt-8 font-display text-6xl leading-[0.9] text-white sm:text-7xl lg:text-8xl">
              Nisu me ne
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Bileta ajrore, hotele dhe aranzhmane turistike — të organizuara për ty.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#kerko-oferte" className="btn bg-white text-emerald-deep shadow-soft hover:bg-emerald-soft">
                Kërko ofertë
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Shkruaj në WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Kartela "Si funksionon" — mbivendoset mbi fund të hero-s. */}
      <div className="container-content relative -mt-32 sm:-mt-24">
        <HowItWorks />
      </div>
    </section>
  );
}
