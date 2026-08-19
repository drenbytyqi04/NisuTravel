'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { StarIcon } from '@/components/Icons';
import { testimonials } from '@/data/testimonials';

/**
 * Karusel i thjeshtë vlerësimesh: një vlerësim në ekran, me pika navigimi dhe
 * ndërrim automatik çdo 7 sekonda. Ndalon kur përdoruesi ndërvepron ose kur
 * sistemi kërkon më pak lëvizje.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const go = useCallback((next: number) => {
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || testimonials.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  const active = testimonials[index];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-content">
        <div
          className="mx-auto max-w-3xl text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <p className="eyebrow">Vlerësimet</p>
          <h2 className="section-title mt-3">Çfarë thonë udhëtarët</h2>

          <div
            className="relative mt-12 min-h-[15rem] sm:min-h-[13rem]"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="flex justify-center gap-1 text-gold">
                  {Array.from({ length: active.rating }).map((_, starIndex) => (
                    <StarIcon key={starIndex} className="h-5 w-5" />
                  ))}
                  <span className="sr-only">{active.rating} nga 5 yje</span>
                </div>

                <blockquote className="mt-6 text-xl leading-relaxed text-charcoal/85 sm:text-2xl">
                  “{active.quote}”
                </blockquote>

                <figcaption className="mt-6 text-sm font-semibold uppercase tracking-widest text-emerald-deep">
                  {active.name}
                  <span className="ml-2 font-normal normal-case tracking-normal text-charcoal/50">
                    {active.location}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-2.5">
            {testimonials.map((testimonial, dotIndex) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => go(dotIndex)}
                aria-current={dotIndex === index ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  dotIndex === index ? 'w-8 bg-emerald-deep' : 'w-2.5 bg-charcoal/20 hover:bg-charcoal/40'
                }`}
              >
                <span className="sr-only">Shfaq vlerësimin e {testimonial.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
