import { describe, expect, it } from 'vitest'

import { filterSuggesties, markeerDelen, type ZoekStad } from '@/blocks/py/zoekSuggesties'

const locatie = (id: number, naam: string, adres: string) => ({
  id,
  naam,
  adres,
  href: `/parkeren/x/${id}`,
  prijs: null,
  prijsEenheid: 'per uur',
})

const STEDEN: ZoekStad[] = [
  {
    naam: 'Eindhoven',
    locaties: [
      locatie(1, 'Philips Stadion', 'Gerard Philipslaan'),
      locatie(2, 'TD Gebouw', 'Frederik van Eedenplein'),
    ],
  },
  { naam: 'Den Bosch', locaties: [locatie(3, 'Café Hoven', 'Markt 1')] },
  { naam: 'Utrecht', locaties: [locatie(4, 'Jaarbeurs', 'Jaarbeursplein')] },
]

describe('filterSuggesties', () => {
  it('returns every city with all its locations for an empty input', () => {
    expect(filterSuggesties(STEDEN, '  ')).toBe(STEDEN)
  })

  it('keeps all locations of a city whose name matches, and puts prefix matches first', () => {
    const result = filterSuggesties(STEDEN, 'hoven')
    expect(result.map((s) => s.naam)).toEqual(['Eindhoven', 'Den Bosch'])
    expect(result[0].locaties).toHaveLength(2)
    expect(result[1].locaties.map((l) => l.naam)).toEqual(['Café Hoven'])

    expect(filterSuggesties(STEDEN, 'ein')[0].naam).toBe('Eindhoven')
  })

  it('narrows a city to the locations that match by name or address', () => {
    const result = filterSuggesties(STEDEN, 'eedenplein')
    expect(result).toHaveLength(1)
    expect(result[0].locaties.map((l) => l.naam)).toEqual(['TD Gebouw'])
  })

  it('needs every word to match, across city, name and address', () => {
    expect(filterSuggesties(STEDEN, 'eindhoven stadion')[0].locaties.map((l) => l.id)).toEqual([1])
    expect(filterSuggesties(STEDEN, 'utrecht stadion')).toEqual([])
  })

  it('ignores case and accents', () => {
    expect(filterSuggesties(STEDEN, 'CAFE')[0].locaties[0].naam).toBe('Café Hoven')
  })
})

describe('markeerDelen', () => {
  it('marks every matching part', () => {
    expect(markeerDelen('Philips Stadion', 'phil sta')).toEqual([
      { tekst: 'Phil', treffer: true },
      { tekst: 'ips ', treffer: false },
      { tekst: 'Sta', treffer: true },
      { tekst: 'dion', treffer: false },
    ])
  })

  it('matches accented text without accents', () => {
    expect(markeerDelen('Café', 'cafe')).toEqual([{ tekst: 'Café', treffer: true }])
  })

  it('returns the text whole when nothing is typed', () => {
    expect(markeerDelen('Utrecht', '')).toEqual([{ tekst: 'Utrecht', treffer: false }])
  })
})
