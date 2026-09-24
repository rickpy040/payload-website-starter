import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { SearchPanel } from '@/components/parkeren/SearchPanel'
import { LocationCard } from '@/components/parkeren/LocationCard'
import { Pin } from '@/components/parkeren/Brandmark'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'parkingyou — voordelig parkeren zonder gedoe',
  description:
    'Reserveer vooraf een parkeerplek in 25+ Nederlandse steden. Vast laag tarief, gegarandeerde plek, naar binnen op kenteken.',
  openGraph: mergeOpenGraph({
    title: 'parkingyou — voordelig parkeren zonder gedoe',
  }),
}

const STEPS = [
  {
    title: 'Zoek & vergelijk',
    text: 'Vergelijk tarieven en beschikbaarheid — in realtime, voordat u instapt.',
  },
  {
    title: 'Reserveer',
    text: 'Kies uw kenteken en reken vooraf af met iDEAL, creditcard of ParkingPass.',
  },
  {
    title: 'Rijd naar binnen',
    text: 'Kentekenherkenning opent de slagboom. Uw plek is gereserveerd, ook in de spits.',
  },
  {
    title: 'Klaar',
    text: 'Factuur en QR-code staan in de app. Verlengen kan onderweg, met één tik.',
  },
]

const POPULAR_CITIES = ['Amsterdam', 'Rotterdam', 'Eindhoven', 'Utrecht', 'Tilburg']

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'locations',
    draft: false,
    limit: 5,
    overrideAccess: false,
    sort: 'name',
  })
  const locations = result.docs
  const totalResult = await payload.count({ collection: 'locations', overrideAccess: false })

  return (
    <div>
      <section className="relative bg-py-blauw py-16 md:py-24">
        <div className="mx-auto max-w-[760px] px-6 md:px-10">
          <span className="inline-flex items-center gap-2 text-[12.5px] font-medium uppercase tracking-wider text-py-aqua before:h-2 before:w-2 before:flex-none before:rounded-full before:bg-py-aqua">
            Parkeren in 25+ Nederlandse steden
          </span>
          <h1 className="mt-6 max-w-[19ch] text-[clamp(38px,5vw,68px)] font-bold leading-[1.05] tracking-tight text-white">
            Voordelig parkeren{' '}
            <span className="font-bold italic text-py-aqua">zonder gedoe.</span>
          </h1>
          <p className="mt-5 max-w-[44ch] text-[clamp(16.5px,1.4vw,19px)] font-light text-white/72">
            Reserveer vooraf tegen een vast laag tarief. De slagboom kent uw kenteken — u rijdt zo naar
            binnen.
          </p>

          <SearchPanel className="mt-9 max-w-[900px] md:mt-12" />

          <div className="mt-8 flex flex-wrap items-center gap-5 md:mt-11 md:gap-11">
            <div className="flex flex-wrap items-center gap-3.5">
              <span className="mr-0.5 text-[13.5px] text-white/50">Populair</span>
              {POPULAR_CITIES.map((city) => (
                <Link
                  key={city}
                  href={`/parkeren?stad=${encodeURIComponent(city)}`}
                  className="border-b-2 border-transparent pb-0.5 text-[15px] font-medium text-white/80 transition-colors hover:border-py-aqua hover:text-white"
                >
                  {city}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3.5 text-[14.5px] font-light text-white/56">
              <span>
                <b className="font-bold text-white">500.000+</b> reserveringen p/j
              </span>
              <span>
                <b className="font-bold text-white">40+</b> locaties
              </span>
              <span>
                <b className="font-bold text-white">4,5</b> beoordeling
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[clamp(90px,11vw,150px)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-8 px-6 md:grid-cols-[minmax(230px,0.82fr)_2.2fr] md:gap-16 md:px-10">
          <aside className="md:sticky md:top-[130px]">
            <h2 className="text-[clamp(27px,3vw,39px)] font-bold text-py-blauw">
              Plekken in de buurt
            </h2>
            <p className="mt-4 max-w-[30ch] text-[15.5px] font-light text-py-grijs-txt">
              Tarieven per uur. Kosteloos wijzigen tot een uur voor aankomst.
            </p>
            <div className="mt-6">
              <Link
                href="/parkeren"
                className="inline-flex items-center gap-2.5 border-b-0 pb-1 text-[15.5px] font-bold text-py-blauw shadow-[inset_0_-2px_0_var(--py-aqua)]"
              >
                Alle {totalResult.totalDocs} locaties
              </Link>
            </div>
          </aside>

          <div className="border-t-2 border-py-blauw">
            {locations.map((loc, i) => (
              <LocationCard key={loc.id} location={loc} index={i + 1} />
            ))}
            {locations.length === 0 && (
              <p className="py-10 text-center text-py-grijs-txt">
                Er zijn nog geen locaties toegevoegd in het CMS.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-py-paper py-[clamp(90px,11vw,150px)]">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <h2 className="max-w-[20ch] text-[clamp(27px,3.1vw,42px)] font-bold text-py-blauw">
            Vier stappen. Geen ticketje, geen zoekrondjes.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {STEPS.map((step, i) => (
              <div key={step.title}>
                <Pin variant={i === 2 ? 'aqua' : 'navy'} index={i + 1} size={56} />
                <h3 className="mt-5 text-[clamp(18px,1.9vw,22px)] font-bold text-py-blauw">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[15px] font-light leading-relaxed text-py-grijs-txt">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-py-blauw py-[clamp(70px,9vw,110px)]">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-8 px-6 md:px-10">
          <h2 className="max-w-[17ch] text-[clamp(30px,4vw,54px)] font-bold tracking-tight text-white">
            Reserveer uw plek in dertig seconden.
          </h2>
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/parkeren"
              className="flex min-h-[54px] items-center justify-center rounded-full px-7 text-[15.5px] font-bold text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.3)] transition-shadow hover:shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.85)]"
            >
              Zoek een parkeerplek
            </Link>
            <span className="text-[14.5px] font-light text-white/58">
              Vanaf € 1,20 per uur · 40+ locaties in 25+ steden
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
