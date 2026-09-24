'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Brandmark } from './Brandmark'
import { cn } from '@/utilities/ui'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function toInputValue(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

type Quick = '3h' | 'day' | 'night'

const QUICK_OPTIONS: { key: Quick; label: string }[] = [
  { key: '3h', label: 'Nu · 3 uur' },
  { key: 'day', label: 'Hele dag' },
  { key: 'night', label: 'Nacht' },
]

function quickRange(key: Quick): { arrival: Date; departure: Date } {
  const now = new Date()
  if (key === 'night') {
    const arrival = new Date(now)
    arrival.setHours(18, 0, 0, 0)
    const departure = new Date(arrival)
    departure.setDate(departure.getDate() + 1)
    departure.setHours(8, 0, 0, 0)
    return { arrival, departure }
  }
  const hours = key === 'day' ? 9 : 3
  const departure = new Date(now.getTime() + hours * 3600_000)
  return { arrival: now, departure }
}

export function SearchPanel({
  initialDestination = '',
  initialArrival,
  initialDeparture,
  submitLabel = 'Zoek parkeerplaatsen',
  onSubmit,
  className,
}: {
  initialDestination?: string
  initialArrival?: string
  initialDeparture?: string
  submitLabel?: string
  onSubmit?: (values: { destination: string; arrival: string; departure: string }) => void
  className?: string
}) {
  const router = useRouter()
  const [destination, setDestination] = useState(initialDestination)
  const [arrival, setArrival] = useState(initialArrival ?? '')
  const [departure, setDeparture] = useState(initialDeparture ?? '')
  const [activeQuick, setActiveQuick] = useState<Quick | null>(null)
  const [locating, setLocating] = useState(false)

  function applyQuick(key: Quick) {
    setActiveQuick(key)
    const { arrival: a, departure: d } = quickRange(key)
    setArrival(toInputValue(a))
    setDeparture(toInputValue(d))
  }

  function useLocation() {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      () => {
        setDestination('Huidige locatie')
        setLocating(false)
      },
      () => setLocating(false),
      { timeout: 4000 },
    )
  }

  function submit() {
    if (onSubmit) {
      onSubmit({ destination, arrival, departure })
      return
    }
    const params = new URLSearchParams()
    if (destination) params.set('stad', destination)
    if (arrival) params.set('arrival', arrival)
    if (departure) params.set('departure', departure)
    router.push(`/parkeren?${params.toString()}`)
  }

  return (
    <div
      className={cn(
        'rounded-[28px] bg-white p-3 shadow-[0_1px_0_var(--py-line),0_24px_64px_rgba(20,40,95,0.16)]',
        className,
      )}
    >
      <div className="flex items-center gap-4 px-5 py-4">
        <Brandmark variant="duotone" className="h-[31px] w-[26px] flex-none" />
        <span className="min-w-0 flex-1">
          <label htmlFor="dest" className="block text-[11.5px] font-medium uppercase tracking-wider text-py-grijs-txt">
            Bestemming
          </label>
          <input
            id="dest"
            type="text"
            placeholder="Stad, garage of adres"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className="w-full border-0 bg-transparent pt-1 text-[clamp(19px,2.1vw,24px)] font-bold tracking-tight text-py-blauw outline-none placeholder:font-medium placeholder:text-[#ABB1BE]"
          />
        </span>
        <button
          type="button"
          onClick={useLocation}
          className="flex flex-none items-center gap-2 rounded-full bg-py-paper px-4 py-2.5 text-[13px] font-medium text-py-blauw transition-colors hover:bg-py-blauw-soft"
        >
          {locating ? 'Bepalen…' : 'Mijn locatie'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 px-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-[18px] bg-py-paper px-4 py-3">
          <span className="min-w-0 flex-1">
            <label htmlFor="arrival" className="block text-[11.5px] font-medium uppercase tracking-wider text-py-grijs-txt">
              Aankomst
            </label>
            <input
              id="arrival"
              type="datetime-local"
              value={arrival}
              onChange={(e) => {
                setArrival(e.target.value)
                setActiveQuick(null)
              }}
              className="w-full border-0 bg-transparent pt-0.5 text-[15px] font-medium text-py-blauw outline-none"
            />
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-[18px] bg-py-paper px-4 py-3">
          <span className="min-w-0 flex-1">
            <label htmlFor="departure" className="block text-[11.5px] font-medium uppercase tracking-wider text-py-grijs-txt">
              Vertrek
            </label>
            <input
              id="departure"
              type="datetime-local"
              value={departure}
              onChange={(e) => {
                setDeparture(e.target.value)
                setActiveQuick(null)
              }}
              className="w-full border-0 bg-transparent pt-0.5 text-[15px] font-medium text-py-blauw outline-none"
            />
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3.5 px-3 pb-1.5 pt-4">
        <div className="flex flex-1 flex-wrap gap-2">
          {QUICK_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => applyQuick(opt.key)}
              className={cn(
                'rounded-full px-4 py-2.5 text-[13.5px] font-medium shadow-[inset_0_0_0_1.5px_var(--py-line)] transition-all hover:text-py-blauw hover:shadow-[inset_0_0_0_1.5px_var(--py-blauw)]',
                activeQuick === opt.key
                  ? 'bg-py-blauw text-white shadow-none'
                  : 'bg-transparent text-py-grijs-txt',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={submit}
          className="flex min-h-[56px] flex-none items-center justify-center gap-2.5 rounded-full bg-py-oranje px-8 text-[16px] font-bold text-white transition-colors hover:bg-py-oranje-hi"
        >
          {submitLabel}
          <svg width="17" height="17" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M3.5 9h11M9.5 4l5 5-5 5"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
