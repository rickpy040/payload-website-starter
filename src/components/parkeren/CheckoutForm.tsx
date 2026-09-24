'use client'

import React, { useState } from 'react'
import type { Location } from '@/payload-types'
import { Pin } from './Brandmark'
import { fmtPrice } from './availability'
import { locationCityLabel } from './LocationCard'

const PAY_OPTIONS = [
  { value: 'ideal', label: 'iDEAL', ic: 'iD' },
  { value: 'creditcard', label: 'Creditcard', ic: 'CC' },
  { value: 'parkingpass', label: 'ParkingPass saldo', ic: 'PP' },
] as const

function fmtWhen(arrival?: string, departure?: string) {
  if (!arrival || !departure) return null
  const a = new Date(arrival)
  const d = new Date(departure)
  if (Number.isNaN(a.getTime()) || Number.isNaN(d.getTime())) return null
  const dateFmt = new Intl.DateTimeFormat('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })
  const timeFmt = new Intl.DateTimeFormat('nl-NL', { hour: '2-digit', minute: '2-digit' })
  return { text: `${dateFmt.format(a)} · ${timeFmt.format(a)}–${timeFmt.format(d)}`, hours: (d.getTime() - a.getTime()) / 3_600_000 }
}

export function CheckoutForm({
  location,
  arrival,
  departure,
  price,
}: {
  location: Location
  arrival?: string
  departure?: string
  price?: number
}) {
  const [kenteken, setKenteken] = useState('')
  const [naam, setNaam] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [pay, setPay] = useState<(typeof PAY_OPTIONS)[number]['value']>('ideal')
  const [submitting, setSubmitting] = useState(false)

  const when = fmtWhen(arrival, departure)
  const rate = price ?? location.pricePerHour
  const total = when ? rate * when.hours : rate
  const addressLine = [location.address?.street, location.address?.cityName].filter(Boolean).join(', ')

  function confirmAndPay() {
    setSubmitting(true)
    // ParkingYou reserveert alleen door; Aeroparker int zelf de betaling en
    // bevestigt daar nogmaals prijs/beschikbaarheid (zelfde als "book-only=1"
    // vandaag). TODO: vervang door het echte Aeroparker deep-link/checkout-formaat
    // zodra dat is vastgesteld.
    const params = new URLSearchParams({
      productId: location.aeroparkerProductId,
      ...(arrival ? { checkIn: arrival } : {}),
      ...(departure ? { checkOut: departure } : {}),
      ...(kenteken ? { kenteken } : {}),
      ref: 'parkingyou-site',
    })
    window.location.href = `https://booking.aeroparker.com/checkout?${params.toString()}`
  }

  return (
    <div className="grid items-start gap-10 py-2 pb-20 md:grid-cols-[1.35fr_1fr] md:gap-16">
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2 className="mb-4 text-[19px] font-bold text-py-blauw">Kenteken</h2>
          <Field label="Kenteken van uw voertuig" htmlFor="kenteken">
            <input
              id="kenteken"
              type="text"
              placeholder="XX-999-X"
              value={kenteken}
              onChange={(e) => setKenteken(e.target.value.toUpperCase())}
              className="w-full rounded-[14px] bg-py-paper px-4.5 py-3.5 font-bold uppercase tracking-wider text-py-blauw outline-none ring-py-blauw focus:ring-1.5"
            />
          </Field>
        </div>

        <div className="mt-9">
          <h2 className="mb-4 text-[19px] font-bold text-py-blauw">Contactgegevens</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Naam" htmlFor="naam">
              <input
                id="naam"
                type="text"
                placeholder="Uw volledige naam"
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                className="w-full rounded-[14px] bg-py-paper px-4.5 py-3.5 text-[15px] text-py-blauw outline-none focus:ring-1.5 focus:ring-py-blauw"
              />
            </Field>
            <Field label="Telefoon" htmlFor="tel">
              <input
                id="tel"
                type="tel"
                placeholder="06 12 34 56 78"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                className="w-full rounded-[14px] bg-py-paper px-4.5 py-3.5 text-[15px] text-py-blauw outline-none focus:ring-1.5 focus:ring-py-blauw"
              />
            </Field>
          </div>
          <div className="mt-3">
            <Field label="E-mailadres" htmlFor="email">
              <input
                id="email"
                type="email"
                placeholder="naam@voorbeeld.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[14px] bg-py-paper px-4.5 py-3.5 text-[15px] text-py-blauw outline-none focus:ring-1.5 focus:ring-py-blauw"
              />
            </Field>
          </div>
        </div>

        <div className="mt-9">
          <h2 className="mb-4 text-[19px] font-bold text-py-blauw">Betaalmethode</h2>
          <div className="flex flex-col gap-2.5">
            {PAY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={
                  'flex cursor-pointer items-center gap-3.5 rounded-[14px] px-4.5 py-3.5 transition-all ' +
                  (pay === opt.value
                    ? 'bg-py-blauw-soft shadow-[inset_0_0_0_2px_var(--py-blauw)]'
                    : 'shadow-[inset_0_0_0_1.5px_var(--py-line)] hover:shadow-[inset_0_0_0_1.5px_var(--py-grijs)]')
                }
              >
                <input
                  type="radio"
                  name="pay"
                  className="sr-only"
                  checked={pay === opt.value}
                  onChange={() => setPay(opt.value)}
                />
                <span
                  className={
                    'relative h-4.5 w-4.5 flex-none rounded-full shadow-[inset_0_0_0_1.5px_var(--py-grijs)] ' +
                    (pay === opt.value
                      ? 'shadow-[inset_0_0_0_1.5px_var(--py-blauw)] after:absolute after:inset-[3px] after:rounded-full after:bg-py-blauw'
                      : '')
                  }
                />
                <span className="flex h-7.5 w-7.5 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-bold text-py-blauw shadow-[inset_0_0_0_1px_var(--py-line)]">
                  {opt.ic}
                </span>
                <b className="text-[15px] font-semibold text-py-blauw">{opt.label}</b>
              </label>
            ))}
          </div>
        </div>
      </form>

      <aside className="rounded-[22px] p-6 shadow-[inset_0_0_0_1px_var(--py-line)] md:sticky md:top-24">
        <div className="flex items-center gap-3.5">
          <Pin variant="navy" size={34} />
          <span>
            <b className="block text-[16.5px] font-bold tracking-tight text-py-blauw">{location.name}</b>
            <span className="text-[13px] text-py-grijs-txt">{addressLine || locationCityLabel(location)}</span>
          </span>
        </div>
        {when && (
          <div className="mt-4.5 flex items-center justify-between border-t border-py-line pt-4 text-[14.5px] font-medium text-py-blauw">
            {when.text}
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2 border-t border-py-line pt-4 text-[14.5px] text-py-grijs-txt">
          <div className="flex items-baseline justify-between">
            <span>Tarief</span>
            <b className="font-semibold text-py-blauw">€ {fmtPrice(rate)} / uur</b>
          </div>
          {when && (
            <div className="flex items-baseline justify-between">
              <span>Duur</span>
              <b className="font-semibold text-py-blauw">{when.hours} uur</b>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-baseline justify-between border-t border-py-line pt-4">
          <span className="text-py-grijs-txt">Totaal</span>
          <b className="text-[25px] font-bold tracking-tight text-py-blauw">€ {fmtPrice(total)}</b>
        </div>
        <button
          type="button"
          onClick={confirmAndPay}
          disabled={submitting}
          className="mt-5 flex min-h-[56px] w-full items-center justify-center rounded-full bg-py-oranje text-[15.5px] font-bold text-white transition-colors hover:bg-py-oranje-hi disabled:opacity-60"
        >
          {submitting ? 'Even geduld…' : 'Bevestig en betaal'}
        </button>
        <p className="mt-3.5 text-center text-[12.5px] font-light text-py-grijs-txt">
          U rondt de betaling af bij Aeroparker. Gratis annuleren tot 1 uur voor aankomst.
        </p>
      </aside>
    </div>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[11.5px] font-medium uppercase tracking-wider text-py-grijs-txt"
      >
        {label}
      </label>
      {children}
    </div>
  )
}
