import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';

export default function NotFound() {
  return (
    <section className="bg-emerald-deep">
      <div className="container-content flex min-h-[70svh] flex-col justify-center py-24 text-center">
        <p className="eyebrow text-gold">Gabim 404</p>
        <h1 className="section-title mt-4 text-white">Kjo faqe nuk ekziston</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
          Ndoshta destinacioni ka ndryshuar adresë. Kthehuni te ballina ose shikoni të
          gjitha destinacionet tona.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn bg-white text-emerald-deep hover:bg-emerald-soft">
            Kthehu te ballina
          </Link>
          <Link href="/destinacionet" className="btn-ghost">
            Shiko destinacionet
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
