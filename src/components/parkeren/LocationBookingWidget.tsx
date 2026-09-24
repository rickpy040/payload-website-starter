'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Location } from '@/payload-types'
import { Brandmark } from './Brandmark'
import { fmtPrice, getAvailabilityStatus, hasPrice } from './availability'
import { AvailabilityBadge } from './AvailabilityBadge'
import { locationHref } from '@/utilities/locationHref'

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
  return { arrival: now, departure: new Date(now.getTime() + hours * 3600_000) }
}

type Quote = { available: boolean; price: number; currency: string }

export function LocationBookingWidget({ location }: { location: Location }) {
  const router = useRouter()
  const now = new Date()
  const [arrival, setArrival] = useState(toInputValue(now))
  const [departure, setDeparture] = useState(toInputValue(new Date(now.getTime() + 9 * 3600_000)))
  const [activeQuick, setActiveQuick] = useState<Quick | null>(null)
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function applyQuick(key: Quick) {
    setActiveQuick(key)
    const { arrival: a, departure: d } = quickRange(key)
    setArrival(toInputValue(a))
    setDeparture(toInputValue(d))
  }

  async function reserveerNu() {
    setLoading(true)
    setError(null)
    setQuote(null)
    try {
      const res = await fetch('/api/aeroparker/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aeroparkerProductId: location.aeroparkerProductId,
          arrival,
          departure,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        // Aeroparker isn't configured yet (or the request failed) — fall back to
        // the CMS's own price/availability so the flow still works end to end.
        proceedToCheckout()
        return
      }
      setQuote(data)
      if (data.available) {
        proceedToCheckout(data)
      }
    } catch {
      setError('Beschikbaarheid controleren is niet gelukt. Probeer het opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  function proceedToCheckout(q?: Quote) {
    const params = new URLSearchParams({ arrival, departure })
    if (q) {
      params.set('price', String(q.price))
      params.set('currency', q.currency)
    }
    router.push(`${locationHref(location)}/boeken?${params.toString()}`)
  }

  const status = getAvailabilityStatus(location.spotsFree, location.spotsTotal)
  const displayPrice = quote?.price ?? location.pricePerHour

  return (
    <div className="flex flex-col gap-4.5">
      <div className="rounded-[26px] bg-white p-3 shadow-[0_1px_0_var(--py-line),0_20px_50px_rgba(20,40,95,0.12)]">
        <div className="flex items-center gap-4 px-5 py-4">
          <Brandmark variant="duotone" className="h-7 w-6 flex-none" />
          <span className="min-w-0 flex-1">
            <span className="block text-[11.5px] font-medium uppercase tracking-wider text-py-grijs-txt">
              Bestemming
            </span>
            <span className="block truncate pt-0.5 text-[19px] font-bold tracking-tight text-py-blauw">
              {location.name}
            </span>
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 px-3 sm:grid-cols-2">
          <div className="rounded-[18px] bg-py-paper px-4.5 py-3.5">
            <label htmlFor="wArrival" className="block text-[11.5px] font-medium uppercase tracking-wider text-py-grijs-txt">
              Aankomst
            </label>
            <input
              id="wArrival"
              type="datetime-local"
              value={arrival}
              onChange={(e) => {
                setArrival(e.target.value)
                setActiveQuick(null)
              }}
              className="w-full border-0 bg-transparent pt-0.5 text-[15px] font-medium text-py-blauw outline-none"
            />
          </div>
          <div className="rounded-[18px] bg-py-paper px-4.5 py-3.5">
            <label htmlFor="wDeparture" className="block text-[11.5px] font-medium uppercase tracking-wider text-py-grijs-txt">
              Vertrek
            </label>
            <input
              id="wDeparture"
              type="datetime-local"
              value={departure}
              onChange={(e) => {
                setDeparture(e.target.value)
                setActiveQuick(null)
              }}
              className="w-full border-0 bg-transparent pt-0.5 text-[15px] font-medium text-py-blauw outline-none"
            />
          </div>
        </div>
        <div className="px-3 pb-1.5 pt-3.5">
          <div className="mb-3 flex flex-wrap gap-2">
            {QUICK_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => applyQuick(opt.key)}
                className={
                  'rounded-full px-4 py-2.5 text-[13.5px] font-medium transition-all ' +
                  (activeQuick === opt.key
                    ? 'bg-py-blauw text-white'
                    : 'bg-transparent text-py-grijs-txt shadow-[inset_0_0_0_1.5px_var(--py-line)] hover:text-py-blauw hover:shadow-[inset_0_0_0_1.5px_var(--py-blauw)]')
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={reserveerNu}
            disabled={loading || !hasPrice(displayPrice)}
            className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-py-oranje text-[16px] font-bold text-white transition-colors hover:bg-py-oranje-hi disabled:opacity-60"
          >
            {loading ? 'Even checken…' : 'Reserveer nu'}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}
      {quote && !quote.available && (
        <p className="text-sm text-red-700">Geen plek beschikbaar voor deze periode.</p>
      )}

      <div className="rounded-[20px] p-6 shadow-[inset_0_0_0_1px_var(--py-line)]">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[26px] font-bold tracking-tight text-py-blauw">
            {hasPrice(displayPrice) ? (
              <>
                € {fmtPrice(displayPrice)} <span className="text-[13px] font-normal text-py-grijs-txt">/uur</span>
              </>
            ) : (
              <span className="text-[16px] font-normal text-py-grijs-txt">Prijs op aanvraag</span>
            )}
          </span>
          {location.spotsFree != null && location.spotsTotal != null ? (
            <span className="text-[13.5px] text-py-grijs-txt">
              {location.spotsFree} van {location.spotsTotal} vrij
            </span>
          ) : (
            <AvailabilityBadge status={status} short />
          )}
        </div>
        <div className="mt-3.5 border-t border-py-line pt-3.5 text-[13.5px] font-light text-py-grijs-txt">
          Gratis annuleren tot 1 uur voor aankomst. Betaal vooraf vast tarief, geen verrassingen achteraf.
        </div>
      </div>
    </div>
  )
}
