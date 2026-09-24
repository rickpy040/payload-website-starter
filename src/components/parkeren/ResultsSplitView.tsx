'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import type { Location } from '@/payload-types'
import { LocationCard } from './LocationCard'
import { cn } from '@/utilities/ui'

const LocationsMap = dynamic(() => import('./LocationsMap').then((m) => m.LocationsMap), {
  ssr: false,
})

export function ResultsSplitView({ locations }: { locations: Location[] }) {
  const [active, setActive] = useState<string | null>(null)
  const [mode, setMode] = useState<'list' | 'map'>('list')

  return (
    <div>
      <div className="mb-4 flex justify-end md:hidden">
        <div className="flex gap-1 rounded-full bg-py-paper p-1">
          <button
            type="button"
            onClick={() => setMode('list')}
            className={cn(
              'min-h-[38px] rounded-full px-4.5 text-[13.5px] font-bold text-py-blauw',
              mode === 'list' && 'bg-white shadow-[inset_0_0_0_1px_var(--py-line)]',
            )}
          >
            Lijst
          </button>
          <button
            type="button"
            onClick={() => setMode('map')}
            className={cn(
              'min-h-[38px] rounded-full px-4.5 text-[13.5px] font-bold text-py-blauw',
              mode === 'map' && 'bg-white shadow-[inset_0_0_0_1px_var(--py-line)]',
            )}
          >
            Kaart
          </button>
        </div>
      </div>

      <div className="grid items-start gap-6 pb-20 md:grid-cols-[1.22fr_1fr] md:gap-10">
        <div className={cn('flex flex-col', mode === 'map' && 'hidden md:flex')}>
          <div className="border-t-2 border-py-blauw">
            {locations.map((loc, i) => (
              <LocationCard
                key={loc.id}
                location={loc}
                index={i + 1}
                active={active === loc.slug}
                onSelect={() => setActive(loc.slug)}
              />
            ))}
            {locations.length === 0 && (
              <p className="py-10 text-center text-py-grijs-txt">
                Geen locaties gevonden voor deze zoekopdracht.
              </p>
            )}
          </div>
        </div>
        <div
          className={cn(
            'top-6 h-[70vh] min-h-[440px] overflow-hidden rounded-[22px] shadow-[inset_0_0_0_1px_var(--py-line)] md:sticky md:block',
            mode === 'list' ? 'hidden' : 'relative h-[340px] min-h-0 md:h-[70vh]',
          )}
        >
          <LocationsMap locations={locations} activeSlug={active} onSelect={setActive} />
        </div>
      </div>
    </div>
  )
}
