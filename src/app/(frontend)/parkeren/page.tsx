import React from 'react'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { SearchPanel } from '@/components/parkeren/SearchPanel'
import { ResultsSplitView } from '@/components/parkeren/ResultsSplitView'
import { locationCityLabel } from '@/components/parkeren/LocationCard'
import type { Location } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Parkeerlocaties — parkingyou',
  description: 'Vergelijk beschikbaarheid en tarieven en reserveer vooraf een parkeerplek.',
}

type Args = {
  searchParams: Promise<{ stad?: string; arrival?: string; departure?: string }>
}

function matchesQuery(location: Location, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    location.name.toLowerCase().includes(q) ||
    locationCityLabel(location).toLowerCase().includes(q) ||
    location.address?.cityName?.toLowerCase().includes(q) ||
    location.address?.street?.toLowerCase().includes(q)
  )
}

function fmtDateRange(arrival?: string, departure?: string) {
  if (!arrival || !departure) return null
  const a = new Date(arrival)
  const d = new Date(departure)
  if (Number.isNaN(a.getTime()) || Number.isNaN(d.getTime())) return null
  const dateFmt = new Intl.DateTimeFormat('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })
  const timeFmt = new Intl.DateTimeFormat('nl-NL', { hour: '2-digit', minute: '2-digit' })
  return `${dateFmt.format(a)} · ${timeFmt.format(a)}–${timeFmt.format(d)}`
}

export default async function ParkerenPage({ searchParams }: Args) {
  const { stad = '', arrival, departure } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'locations',
    draft: false,
    limit: 100,
    pagination: false,
    overrideAccess: false,
  })

  const locations = result.docs.filter((loc) => matchesQuery(loc, stad))
  const countMeta = fmtDateRange(arrival, departure)

  return (
    <div>
      <section className="bg-py-blauw py-14">
        <div className="mx-auto max-w-[1360px] px-6 md:px-10">
          <SearchPanel
            initialDestination={stad}
            initialArrival={arrival}
            initialDeparture={departure}
            submitLabel="Zoeken"
            className="max-w-[900px]"
          />
        </div>
      </section>

      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex flex-wrap items-center gap-4 py-8">
          <h1 className="text-[23px] font-bold text-py-blauw md:text-[29px]">
            {locations.length} {locations.length === 1 ? 'locatie' : 'locaties'}
            {stad ? ` bij ${stad}` : ''}
          </h1>
          {countMeta && <span className="text-[14.5px] text-py-grijs-txt">{countMeta}</span>}
        </div>

        <ResultsSplitView locations={locations} />
      </div>
    </div>
  )
}
