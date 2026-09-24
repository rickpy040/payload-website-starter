/**
 * One-off local script to seed a handful of demo Locations for development.
 * Run with: npx tsx --env-file=.env scripts/seed-locations.ts
 */
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import type { Location } from '../src/payload-types'

type AmenityValue = NonNullable<Location['amenities']>[number]

const LOCATIONS: Array<Omit<Location, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'sizes' | 'amenities'> & { amenities: AmenityValue[] }> = [
  {
    name: 'Parkeergarage Emmasingel',
    slug: 'eindhoven-emmasingel',
    city: 'eindhoven' as const,
    address: { street: 'Emmasingel 31', postalCode: '5611 AZ', cityName: 'Eindhoven' },
    coordinates: [5.474, 51.439] as [number, number],
    aeroparkerProductId: 'EIN-EMMASINGEL',
    pricePerHour: 2.5,
    rating: 4.6,
    openingHours: '24/7 geopend',
    maxHeight: '2,10 m',
    spotsTotal: 420,
    spotsFree: 128,
    amenities: ['ev-charging', 'disabled-access', 'covered', 'guarded'],
  },
  {
    name: 'Parkeergarage Vestdijk',
    slug: 'eindhoven-vestdijk',
    city: 'eindhoven' as const,
    address: { street: 'Vestdijk 100', postalCode: '5611 CA', cityName: 'Eindhoven' },
    coordinates: [5.4805, 51.4362] as [number, number],
    aeroparkerProductId: 'EIN-VESTDIJK',
    pricePerHour: 2.2,
    rating: 4.3,
    openingHours: '24/7 geopend',
    maxHeight: '1,95 m',
    spotsTotal: 260,
    spotsFree: 24,
    amenities: ['ev-charging', 'disabled-access', 'covered', 'guarded'],
  },
  {
    name: 'Parkeergarage Heuvel',
    slug: 'eindhoven-heuvel',
    city: 'eindhoven' as const,
    address: { street: 'Heuvel Galerie 10', postalCode: '5611 DK', cityName: 'Eindhoven' },
    coordinates: [5.4772, 51.4348] as [number, number],
    aeroparkerProductId: 'EIN-HEUVEL',
    pricePerHour: 1.9,
    rating: 4.1,
    openingHours: '06:00 – 01:00',
    maxHeight: '2,00 m',
    spotsTotal: 500,
    spotsFree: 210,
    amenities: ['disabled-access', 'covered', 'guarded'],
  },
  {
    name: 'Parkeergarage Stationsplein',
    slug: 'eindhoven-stationsplein',
    city: 'eindhoven' as const,
    address: { street: 'Stationsplein 1', postalCode: '5611 AB', cityName: 'Eindhoven' },
    coordinates: [5.4796, 51.4432] as [number, number],
    aeroparkerProductId: 'EIN-STATIONSPLEIN',
    pricePerHour: 2.8,
    rating: 4.5,
    openingHours: '24/7 geopend',
    maxHeight: '2,05 m',
    spotsTotal: 340,
    spotsFree: 9,
    amenities: ['ev-charging', 'disabled-access', 'covered', 'guarded'],
  },
  {
    name: 'Parkeerterrein Kanaaldijk',
    slug: 'eindhoven-kanaaldijk',
    city: 'eindhoven' as const,
    address: { street: 'Kanaaldijk-Noord 20', postalCode: '5613 LR', cityName: 'Eindhoven' },
    coordinates: [5.501, 51.4485] as [number, number],
    aeroparkerProductId: 'EIN-KANAALDIJK',
    pricePerHour: 1.2,
    rating: 3.9,
    openingHours: '06:00 – 00:00',
    maxHeight: undefined,
    spotsTotal: 600,
    spotsFree: 380,
    amenities: ['disabled-access', 'guarded'],
  },
]

async function run() {
  const payload = await getPayload({ config: configPromise })

  for (const location of LOCATIONS) {
    const existing = await payload.find({
      collection: 'locations',
      where: { slug: { equals: location.slug } },
      limit: 1,
    })
    const data = { ...location, _status: 'published' as const }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'locations', id: existing.docs[0].id, data })
      console.log(`Updated: ${location.name}`)
    } else {
      await payload.create({ collection: 'locations', data })
      console.log(`Created: ${location.name}`)
    }
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
