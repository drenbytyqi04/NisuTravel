import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Services } from '@/components/home/Services';
import { Destinations } from '@/components/home/Destinations';
import { WhyUs } from '@/components/home/WhyUs';
import { Diaspora } from '@/components/home/Diaspora';
import { Testimonials } from '@/components/home/Testimonials';
import { CtaBand } from '@/components/CtaBand';

export const metadata: Metadata = {
  title: 'Nisu Travel — Agjenci udhëtimi në Prishtinë',
  description:
    'Bileta ajrore, rezervime hotelesh dhe aranzhmane turistike nga Prishtina. Turqi, Dubai, Egjipt, Barcelonë, Gjermani, Zvicër, Santorini dhe Bali. Nisu me ne.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Destinations />
      <WhyUs />
      <Diaspora />
      <Testimonials />
      <CtaBand />
    </>
  );
}
