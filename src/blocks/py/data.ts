import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type Where } from 'payload'

import type { Evenementen, Location, Media, Steden } from '@/payload-types'
import { Locations } from '@/collections/Locations'
import { locationHref } from '@/utilities/locationHref'
import type { ZoekStad } from './zoekSuggesties'

/**
 * Data access for the prototype section blocks. Published documents only,
 * except in draft mode (admin preview / live preview), where drafts show up
 * too so an editor can see a page with its not-yet-published locations and
 * events before publishing them.
 */
async function leesOpties() {
  const { isEnabled } = await draftMode()
  return { draft: isEnabled, overrideAccess: isEnabled }
}

const cityOptions = (() => {
  const field = Locations.fields.find((f) => 'name' in f && f.name === 'city')
  const options = field && 'options' in field ? field.options : []
  return new Map(
    (options as Array<{ label: string; value: string } | string>).map((o) =>
      typeof o === 'string' ? [o, o] : [o.value, o.label],
    ),
  )
})()

/** Leaves out the {{TODO-NL: …}} placeholders the import migrations wrote. */
const echt = (value?: string | null): string => (value && !value.includes('{{') ? value.trim() : '')

export function stadNaam(loc: Pick<Location, 'stad' | 'city'>): string {
  if (loc.stad && typeof loc.stad === 'object') return (loc.stad as Steden).naam
  return cityOptions.get(loc.city) ?? loc.city
}

export function formatPrijs(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace('.', ',')
}

export type LocatieKaart = {
  id: number
  naam: string
  href: string
  stad: string
  adres: string
  prijs: string | null
  prijsEenheid: string
  prijsWaarde: number | null
  rating: number | null
  labels: string[]
  loopafstand: string
  plekken: number | null
  afbeelding: Media | null
}

function afgeleideLabels(loc: Location): string[] {
  const labels: string[] = []
  const faciliteiten = (loc.faciliteiten ?? []).map((f) => f.tekst.toLowerCase())
  if (loc.reserveerbaar) labels.push('Reserveerbaar')
  if (loc.abonnementen) labels.push('Abonnementen')
  if (loc.parkingPass) labels.push('ParkingPass')
  if (loc.uren?.open247 || loc.amenities?.includes('24-7')) labels.push('24/7')
  if (loc.amenities?.includes('ev-charging') || faciliteiten.some((f) => f.includes('laad')))
    labels.push('EV-laden')
  if (loc.amenities?.includes('covered')) labels.push('Overdekt')
  return labels
}

export function naarLocatieKaart(loc: Location): LocatieKaart {
  const dagprijs = echt(loc.aeroparkerSync?.dagprijs)
  const perUur =
    typeof loc.pricePerHour === 'number' && loc.pricePerHour > 0 ? loc.pricePerHour : null
  const prijs = dagprijs || (perUur !== null ? formatPrijs(perUur) : null)
  const prijsWaarde = dagprijs ? Number(dagprijs.replace(',', '.')) : perUur
  const straat = [echt(loc.address?.street), echt(loc.address?.huisnummer)]
    .filter(Boolean)
    .join(' ')
  const eigenLabels = (loc.kaartLabels ?? []).map((l) => l.tekst).filter(Boolean)
  const eersteFoto = loc.images?.find((img) => img.image && typeof img.image === 'object')?.image
  return {
    id: loc.id,
    naam: loc.name,
    href: locationHref(loc),
    stad: stadNaam(loc),
    adres: straat || echt(loc.address?.cityName) || stadNaam(loc),
    prijs,
    prijsEenheid: dagprijs ? 'per dag' : 'per uur',
    prijsWaarde: Number.isFinite(prijsWaarde) ? prijsWaarde : null,
    rating: typeof loc.rating === 'number' ? loc.rating : null,
    labels: (eigenLabels.length ? eigenLabels : afgeleideLabels(loc)).slice(0, 3),
    loopafstand: echt(loc.loopafstand),
    plekken: typeof loc.spotsTotal === 'number' ? loc.spotsTotal : null,
    afbeelding: eersteFoto && typeof eersteFoto === 'object' ? (eersteFoto as Media) : null,
  }
}

export type LocatieBron = 'alle' | 'abonnementen' | 'parkingpass' | 'handmatig'

export async function haalLocaties({
  bron = 'alle',
  handmatig,
  stad,
  limit = 0,
}: {
  bron?: LocatieBron | null
  handmatig?: (number | Location)[] | null
  stad?: number | Steden | null
  limit?: number | null
}): Promise<Location[]> {
  const payload = await getPayload({ config: configPromise })
  const opties = await leesOpties()
  const where: Where[] = []

  if (bron === 'handmatig') {
    const ids = (handmatig ?? []).map((l) => (typeof l === 'object' ? l.id : l))
    if (ids.length === 0) return []
    where.push({ id: { in: ids } })
  }
  if (bron === 'abonnementen') where.push({ abonnementen: { equals: true } })
  if (bron === 'parkingpass') where.push({ parkingPass: { equals: true } })
  if (stad) where.push({ stad: { equals: typeof stad === 'object' ? stad.id : stad } })

  const result = await payload.find({
    collection: 'locations',
    ...opties,
    depth: 1,
    limit: limit && limit > 0 ? limit : 200,
    pagination: false,
    sort: 'name',
    where: where.length ? { and: where } : undefined,
  })

  if (bron === 'handmatig') {
    const volgorde = (handmatig ?? []).map((l) => (typeof l === 'object' ? l.id : l))
    return [...result.docs].sort((a, b) => volgorde.indexOf(a.id) - volgorde.indexOf(b.id))
  }
  return result.docs
}

/**
 * Every city that has a location, each with its locations, for the search
 * panel's "Waar" suggestions. A failed lookup returns no suggestions rather
 * than breaking the hero the panel sits in.
 */
export async function haalZoekSuggesties(): Promise<ZoekStad[]> {
  let locaties: Location[]
  try {
    locaties = await haalLocaties({})
  } catch {
    return []
  }
  const perStad = new Map<string, ZoekStad>()
  for (const kaart of locaties.map(naarLocatieKaart)) {
    if (!kaart.stad) continue
    const stad = perStad.get(kaart.stad) ?? { naam: kaart.stad, locaties: [] }
    stad.locaties.push({
      id: kaart.id,
      naam: kaart.naam,
      adres: kaart.adres,
      href: kaart.href,
      prijs: kaart.prijs,
      prijsEenheid: kaart.prijsEenheid,
    })
    perStad.set(kaart.stad, stad)
  }
  return [...perStad.values()].sort((a, b) => a.naam.localeCompare(b.naam, 'nl'))
}

export type EvenementKaart = {
  id: number
  naam: string
  tagline: string
  soort: string
  kleur: string
  stad: string
  datums: string
  aantalLocaties: number
  prijs: string
  href: string
  afbeelding: Media | null
}

export function naarEvenementKaart(ev: Evenementen): EvenementKaart {
  const locaties = (ev.locaties ?? []).filter((l): l is Location => typeof l === 'object')
  const eerste = locaties[0]
  return {
    id: ev.id,
    naam: ev.naam,
    tagline: ev.tagline ?? '',
    soort: ev.soort ?? '',
    kleur: ev.kleur ?? 'orange',
    stad: ev.plaats || (eerste ? stadNaam(eerste) : ''),
    datums: ev.datums ?? '',
    aantalLocaties: (ev.locaties ?? []).length,
    prijs: ev.vanafPrijs ?? '',
    href: ev.link || (eerste ? locationHref(eerste) : '/evenementen'),
    afbeelding: ev.afbeelding && typeof ev.afbeelding === 'object' ? ev.afbeelding : null,
  }
}

export async function haalEvenementen(limit?: number | null): Promise<Evenementen[]> {
  const payload = await getPayload({ config: configPromise })
  const opties = await leesOpties()
  const result = await payload.find({
    collection: 'evenementen',
    ...opties,
    depth: 2,
    limit: limit && limit > 0 ? limit : 100,
    pagination: false,
    // Oldest first: the order in which the events were added, as in the prototype.
    sort: 'createdAt',
  })
  return result.docs
}

export async function haalSteden(limit?: number | null): Promise<Steden[]> {
  const payload = await getPayload({ config: configPromise })
  const opties = await leesOpties()
  const result = await payload.find({
    collection: 'steden',
    ...opties,
    depth: 0,
    limit: limit && limit > 0 ? limit : 50,
    pagination: false,
    sort: 'id',
    where: { isRegio: { not_equals: true } },
  })
  return result.docs
}
