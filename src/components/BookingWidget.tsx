'use client'

import { useState } from 'react'

type Location = {
  id: string
  name: string
  city: string
  aeroparkerProductId: string
}

type Quote = { available: boolean; price: number; currency: string }

export default function BookingWidget({ locations }: { locations: Location[] }) {
  const [locationId, setLocationId] = useState('')
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selected = locations.find((l) => l.id === locationId)

  async function checkAvailability() {
    if (!selected || !arrival || !departure) return
    setLoading(true)
    setQuote(null)
    setError(null)
    try {
      const res = await fetch('/api/aeroparker/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aeroparkerProductId: selected.aeroparkerProductId,
          arrival,
          departure,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Er ging iets mis, probeer het later opnieuw.')
        return
      }
      setQuote(data)
    } catch {
      setError('Er ging iets mis, probeer het later opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  function goToAeroparker() {
    if (!selected) return
    // TODO: vervang door het echte Aeroparker deep-link/checkout-formaat.
    // Dit is de stap die vandaag overeenkomt met "...&book-only=1": Aeroparker
    // bevestigt daar zelf nogmaals prijs/beschikbaarheid en int de betaling,
    // ParkingYou hoeft dus geen betaalgegevens te verwerken.
    const params = new URLSearchParams({
      productId: selected.aeroparkerProductId,
      checkIn: arrival,
      checkOut: departure,
      ref: 'parkingyou-site',
    })
    window.location.href = `https://booking.aeroparker.com/checkout?${params.toString()}`
  }

  return (
    <div className="booking-widget">
      <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
        <option value="">Kies locatie...</option>
        {locations.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name} ({l.city})
          </option>
        ))}
      </select>

      <input type="datetime-local" value={arrival} onChange={(e) => setArrival(e.target.value)} />
      <input type="datetime-local" value={departure} onChange={(e) => setDeparture(e.target.value)} />

      <button onClick={checkAvailability} disabled={!selected || !arrival || !departure || loading}>
        {loading ? 'Even checken...' : 'Check beschikbaarheid'}
      </button>

      {error && <p className="error">{error}</p>}

      {quote?.available && (
        <div className="quote">
          <p>
            Vanaf {quote.price} {quote.currency}
          </p>
          <button onClick={goToAeroparker}>Direct reserveren</button>
        </div>
      )}

      {quote && !quote.available && <p>Geen plek beschikbaar voor deze periode.</p>}
    </div>
  )
}
