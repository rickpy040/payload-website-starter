import { NextRequest, NextResponse } from 'next/server'

// Server-side proxy naar Aeroparker. Houdt de API-key uit de browser en
// normaliseert de respons voor de BookingWidget.
export async function POST(req: NextRequest) {
  const { aeroparkerProductId, arrival, departure } = await req.json()

  if (!aeroparkerProductId || !arrival || !departure) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  if (!process.env.AEROPARKER_API_BASE || !process.env.AEROPARKER_API_KEY) {
    return NextResponse.json({ error: 'Aeroparker not configured' }, { status: 500 })
  }

  // TODO: vervang endpoint + veldnamen door wat er echt in de Aeroparker
  // API-documentatie staat (zelfde velden als in aeroprobe.py).
  const res = await fetch(`${process.env.AEROPARKER_API_BASE}/availability`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AEROPARKER_API_KEY}`,
    },
    body: JSON.stringify({
      productId: aeroparkerProductId,
      checkIn: arrival, // ISO 8601
      checkOut: departure,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Aeroparker unavailable' }, { status: 502 })
  }

  const data = await res.json()

  return NextResponse.json({
    available: data.available, // TODO: check echte veldnaam
    price: data.price, // TODO: check echte veldnaam / valuta
    currency: data.currency ?? 'EUR',
  })
}
