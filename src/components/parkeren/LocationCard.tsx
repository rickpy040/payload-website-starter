import React from 'react'
import Link from 'next/link'
import type { Location } from '@/payload-types'
import { Pin } from './Brandmark'
import { AvailabilityBadge } from './AvailabilityBadge'
import { getAvailabilityStatus, fmtPrice } from './availability'
import { cn } from '@/utilities/ui'

const CITY_LABEL: Record<Location['city'], string> = {
  eindhoven: 'Eindhoven',
  rotterdam: 'Rotterdam',
  amsterdam: 'Amsterdam',
  'den-haag': 'Den Haag',
  utrecht: 'Utrecht',
  tilburg: 'Tilburg',
  heerhugowaard: 'Heerhugowaard',
  zoetermeer: 'Zoetermeer',
  almere: 'Almere',
}

export function locationCityLabel(location: Pick<Location, 'city'>): string {
  return CITY_LABEL[location.city] ?? location.city
}

export function LocationCard({
  location,
  index,
  active = false,
  onSelect,
  className,
}: {
  location: Location
  index?: number
  active?: boolean
  onSelect?: () => void
  className?: string
}) {
  const status = getAvailabilityStatus(location.spotsFree, location.spotsTotal)
  const hasEv = location.amenities?.includes('ev-charging')

  return (
    <Link
      href={`/parkeren/${location.slug}`}
      onClick={onSelect}
      className={cn(
        'flex items-center gap-4 border-b border-py-line py-5 px-2 transition-colors hover:bg-py-paper',
        active && 'bg-py-aqua-soft shadow-[inset_3px_0_0_var(--py-aqua)]',
        className,
      )}
    >
      {index !== undefined && <Pin variant="navy" index={index} size={40} />}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[18px] font-bold leading-tight tracking-tight text-py-blauw">
          {location.name}
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-py-grijs-txt">
          <span>{locationCityLabel(location)}</span>
          {hasEv && <span>· laadpunt</span>}
        </span>
      </span>
      <AvailabilityBadge status={status} short className="hidden sm:inline-flex" />
      <span className="text-right font-bold tracking-tight text-py-blauw">
        <span className="text-[20px]">€ {fmtPrice(location.pricePerHour)}</span>
        <span className="block text-xs font-normal text-py-grijs-txt">/uur</span>
      </span>
    </Link>
  )
}
