import React from 'react'
import { cn } from '@/utilities/ui'
import {
  AVAILABILITY_LABEL,
  AVAILABILITY_SHORT_LABEL,
  type AvailabilityStatus,
} from './availability'

const DOT_CLASS: Record<AvailabilityStatus, string> = {
  ruim: 'bg-py-aqua',
  beperkt: 'bg-py-oranje',
  vol: 'bg-red-600',
  onbekend: 'bg-py-grijs',
}

const TEXT_CLASS: Record<AvailabilityStatus, string> = {
  ruim: 'text-py-blauw',
  beperkt: 'text-amber-700',
  vol: 'text-red-700',
  onbekend: 'text-py-grijs-txt',
}

export function AvailabilityBadge({
  status,
  short = false,
  className,
}: {
  status: AvailabilityStatus
  short?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium',
        TEXT_CLASS[status],
        className,
      )}
    >
      <i className={cn('inline-block h-2 w-2 flex-none rounded-full', DOT_CLASS[status])} />
      {short ? AVAILABILITY_SHORT_LABEL[status] : AVAILABILITY_LABEL[status]}
    </span>
  )
}
