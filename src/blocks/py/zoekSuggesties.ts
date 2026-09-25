/** A location as the search panel suggests it, grouped under its city. */
export type ZoekLocatie = {
  id: number
  naam: string
  adres: string
  href: string
  prijs: string | null
  prijsEenheid: string
}

export type ZoekStad = {
  naam: string
  locaties: ZoekLocatie[]
}

/** Lower case without accents, so "cafe" finds "Café". */
export function normaliseer(tekst: string): string {
  return tekst
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

const woorden = (invoer: string) => normaliseer(invoer).split(/\s+/).filter(Boolean)

/**
 * The cities and locations that match what the visitor typed. Every word has
 * to match, anywhere in the city name, location name or address, so
 * "eindhoven stadion" finds Philips Stadion. A city whose own name matches
 * keeps all its locations; otherwise only the matching ones are left. Cities
 * whose name starts with the input come first.
 */
export function filterSuggesties(steden: ZoekStad[], invoer: string): ZoekStad[] {
  const termen = woorden(invoer)
  if (termen.length === 0) return steden

  const treffers: { stad: ZoekStad; rang: number }[] = []
  for (const stad of steden) {
    const stadNaam = normaliseer(stad.naam)
    if (termen.every((t) => stadNaam.includes(t))) {
      treffers.push({ stad, rang: stadNaam.startsWith(termen[0]) ? 0 : 1 })
      continue
    }
    const locaties = stad.locaties.filter((l) => {
      const tekst = normaliseer(`${stad.naam} ${l.naam} ${l.adres}`)
      return termen.every((t) => tekst.includes(t))
    })
    if (locaties.length) treffers.push({ stad: { ...stad, locaties }, rang: 2 })
  }
  return treffers.sort((a, b) => a.rang - b.rang).map((t) => t.stad)
}

/**
 * Splits `tekst` into plain and matching parts for highlighting. Only when
 * normalising keeps the length, so the positions still line up; otherwise the
 * text comes back whole.
 */
export function markeerDelen(tekst: string, invoer: string): { tekst: string; treffer: boolean }[] {
  const termen = woorden(invoer)
  const genormaliseerd = normaliseer(tekst)
  if (termen.length === 0 || genormaliseerd.length !== tekst.length) {
    return [{ tekst, treffer: false }]
  }

  const geraakt = new Array<boolean>(tekst.length).fill(false)
  for (const term of termen) {
    for (let i = genormaliseerd.indexOf(term); i !== -1; i = genormaliseerd.indexOf(term, i + 1)) {
      geraakt.fill(true, i, i + term.length)
    }
  }

  const delen: { tekst: string; treffer: boolean }[] = []
  for (let i = 0; i < tekst.length; i++) {
    const laatste = delen[delen.length - 1]
    if (laatste && laatste.treffer === geraakt[i]) laatste.tekst += tekst[i]
    else delen.push({ tekst: tekst[i], treffer: geraakt[i] })
  }
  return delen
}
