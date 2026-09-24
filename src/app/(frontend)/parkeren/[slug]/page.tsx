import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import { AvailabilityBadge } from '@/components/parkeren/AvailabilityBadge'
import { LocationCard, locationCityLabel } from '@/components/parkeren/LocationCard'
import { LocationBookingWidget } from '@/components/parkeren/LocationBookingWidget'
import { getAvailabilityStatus } from '@/components/parkeren/availability'
import type { Location } from '@/payload-types'

const AMENITY_LABEL: Record<string, string> = {
  covered: 'Overdekt',
  'ev-charging': 'Laadpunt',
  'disabled-access': 'Mindervaliden plekken',
  '24-7': '24/7 open',
  guarded: 'Bewaakt',
}

type Args = {
  params: Promise<{ slug: string }>
}

async function getLocation(slug: string): Promise<Location | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'locations',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const location = await getLocation(slug)
  if (!location) return {}
  return {
    title: `${location.name} — parkingyou`,
    description: `Reserveer vooraf bij ${location.name} in ${locationCityLabel(location)}.`,
  }
}

export default async function LocationPage({ params }: Args) {
  const { slug } = await params
  const location = await getLocation(slug)
  if (!location) notFound()

  const payload = await getPayload({ config: configPromise })
  const nearbyResult = await payload.find({
    collection: 'locations',
    draft: false,
    limit: 3,
    overrideAccess: false,
    where: { and: [{ city: { equals: location.city } }, { slug: { not_equals: location.slug } }] },
  })

  const status = getAvailabilityStatus(location.spotsFree, location.spotsTotal)
  const addressLine = [location.address?.street, location.address?.postalCode, location.address?.cityName]
    .filter(Boolean)
    .join(', ')

  return (
    <div>
      <section className="bg-py-blauw py-11">
        <div className="mx-auto max-w-[1360px] px-6 md:px-10">
          <Link
            href="/parkeren"
            className="mb-5 inline-flex items-center gap-2 text-[14.5px] font-medium text-white/70 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 18 18" aria-hidden="true" className="rotate-180">
              <path
                d="M3.5 9h11M9.5 4l5 5-5 5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            Alle locaties
          </Link>
          <h1 className="max-w-[24ch] text-[clamp(28px,3.6vw,44px)] font-bold tracking-tight text-white">
            {location.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[15px] text-white/70">
            {location.rating != null && (
              <span>
                ★ <b className="text-white">{location.rating}</b>
              </span>
            )}
            {addressLine && <span>{addressLine}</span>}
          </div>
          <AvailabilityBadge status={status} className="mt-5 [&_i]:h-2.5 [&_i]:w-2.5" />
        </div>
      </section>

      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="grid items-start gap-10 py-14 md:grid-cols-[1.5fr_1fr] md:gap-16 md:py-20">
          <div className="order-2 md:order-1">
            <section>
              <h2 className="mb-4 text-[clamp(22px,2.2vw,27px)] font-bold text-py-blauw">
                Over deze locatie
              </h2>
              {location.description ? (
                <RichText data={location.description} className="max-w-[60ch] text-[16.5px] font-light leading-relaxed" />
              ) : (
                <p className="max-w-[60ch] text-[16.5px] font-light leading-relaxed text-py-grijs-txt">
                  Meer informatie over deze locatie volgt binnenkort.
                </p>
              )}
            </section>

            {location.amenities && location.amenities.length > 0 && (
              <section className="mt-11 border-t border-py-line pt-10">
                <h2 className="mb-4 text-[clamp(22px,2.2vw,27px)] font-bold text-py-blauw">
                  Voorzieningen
                </h2>
                <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                  {location.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 font-medium text-py-blauw">
                      <span className="flex h-9.5 w-9.5 flex-none items-center justify-center rounded-full bg-py-blauw-soft">
                        <span className="h-2 w-2 rounded-full bg-py-blauw" />
                      </span>
                      {AMENITY_LABEL[a] ?? a}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-11 border-t border-py-line pt-10">
              <h2 className="mb-4 text-[clamp(22px,2.2vw,27px)] font-bold text-py-blauw">
                Praktische informatie
              </h2>
              <div className="flex flex-col">
                <InfoRow label="Openingstijden" value={location.openingHours ?? '—'} />
                <InfoRow label="Maximale hoogte" value={location.maxHeight ?? '—'} />
                <InfoRow label="Adres" value={addressLine || '—'} />
                <InfoRow label="Betaalmethoden" value="iDEAL · Creditcard · ParkingPass" last />
              </div>
            </section>

            {nearbyResult.docs.length > 0 && (
              <section className="mt-11 border-t border-py-line pt-10">
                <h2 className="mb-4 text-[clamp(22px,2.2vw,27px)] font-bold text-py-blauw">
                  Andere locaties in de buurt
                </h2>
                <div>
                  {nearbyResult.docs.map((loc, i) => (
                    <LocationCard key={loc.id} location={loc} index={i + 1} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="order-1 md:sticky md:top-6 md:order-2">
            <LocationBookingWidget location={location} />
          </aside>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-3.5 text-[15px] ${last ? '' : 'border-b border-py-line'}`}>
      <span className="text-py-grijs-txt">{label}</span>
      <span className="text-right font-semibold text-py-blauw">{value}</span>
    </div>
  )
}
