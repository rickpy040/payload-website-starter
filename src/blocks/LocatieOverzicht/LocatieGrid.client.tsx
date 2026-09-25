'use client'

import React, { useEffect, useMemo, useState } from 'react'

import type { LocatieKaart as LocatieKaartData } from '@/blocks/py/data'
import { ZOEK_EVENT } from '@/blocks/py/ZoekPaneel.client'
import { LocatieKaart } from './LocatieKaart'

type Props = {
  kaarten: LocatieKaartData[]
  toonStadFilter: boolean
  toonSortering: boolean
  toonAantal: boolean
  eersteUitgelicht: boolean
  /** Hand-picked locations keep the editor's order unless the visitor sorts. */
  behoudVolgorde: boolean
  maxAantal: number | null
  knopLabel: string
  alleStedenLabel: string
  aantalTekst: string
  legeTekst: string
}

const ALLE = ''

export function LocatieGrid({
  kaarten,
  toonStadFilter,
  toonSortering,
  toonAantal,
  eersteUitgelicht,
  behoudVolgorde,
  maxAantal,
  knopLabel,
  alleStedenLabel,
  aantalTekst,
  legeTekst,
}: Props) {
  const steden = useMemo(
    () => Array.from(new Set(kaarten.map((k) => k.stad).filter(Boolean))),
    [kaarten],
  )
  const [stad, setStad] = useState(ALLE)
  const [zoek, setZoek] = useState('')
  const [sortering, setSortering] = useState<'aanbevolen' | 'prijs'>('aanbevolen')

  // A search panel (hero) sends ?stad=… or a live event: a known city selects
  // that city's filter; anything else searches names and addresses.
  useEffect(() => {
    const pas = (waarde: string) => {
      const gevonden = steden.find((s) => s.toLowerCase() === waarde.trim().toLowerCase())
      setStad(gevonden ?? ALLE)
      setZoek(gevonden ? '' : waarde.trim())
    }
    const uitUrl = new URLSearchParams(window.location.search).get('stad')
    if (uitUrl) pas(uitUrl)
    const handler = (event: Event) =>
      pas((event as CustomEvent<{ stad: string }>).detail?.stad ?? '')
    window.addEventListener(ZOEK_EVENT, handler)
    return () => window.removeEventListener(ZOEK_EVENT, handler)
  }, [steden])

  const zichtbaar = useMemo(() => {
    const term = zoek.toLowerCase()
    let lijst = kaarten.filter(
      (k) =>
        (stad === ALLE || k.stad === stad) &&
        (!term || [k.naam, k.adres, k.stad].some((v) => v.toLowerCase().includes(term))),
    )
    if (toonSortering || !behoudVolgorde) {
      lijst = [...lijst].sort((a, b) =>
        sortering === 'prijs'
          ? (a.prijsWaarde ?? Infinity) - (b.prijsWaarde ?? Infinity)
          : (b.rating ?? 0) - (a.rating ?? 0),
      )
    }
    return maxAantal && maxAantal > 0 ? lijst.slice(0, maxAantal) : lijst
  }, [kaarten, stad, zoek, sortering, toonSortering, behoudVolgorde, maxAantal])

  const aantalRegel = `${aantalTekst.replace('{aantal}', String(zichtbaar.length))}${stad !== ALLE ? ` in ${stad}` : ''}`

  if (kaarten.length === 0) return <p className="py-empty-note">{legeTekst}</p>

  return (
    <>
      {toonStadFilter || toonSortering ? (
        <div className="py-toolbar">
          {toonStadFilter ? (
            <div className="py-segments">
              {[ALLE, ...steden].map((optie) => (
                <button
                  type="button"
                  key={optie || 'alle'}
                  className={stad === optie ? 'is-active' : ''}
                  onClick={() => {
                    setStad(optie)
                    setZoek('')
                  }}
                >
                  {optie || alleStedenLabel}
                </button>
              ))}
            </div>
          ) : null}
          {toonSortering ? (
            <label className="py-select">
              Sorteer
              <select
                value={sortering}
                onChange={(e) => setSortering(e.target.value as 'aanbevolen' | 'prijs')}
              >
                <option value="aanbevolen">Aanbevolen</option>
                <option value="prijs">Laagste prijs</option>
              </select>
            </label>
          ) : null}
        </div>
      ) : null}
      {toonAantal ? <div className="py-results-line">{aantalRegel}</div> : null}
      {zichtbaar.length ? (
        <div className="py-garage-grid">
          {zichtbaar.map((kaart, index) => (
            <LocatieKaart
              key={kaart.id}
              kaart={kaart}
              uitgelicht={eersteUitgelicht && index === 0}
              knopLabel={knopLabel}
            />
          ))}
        </div>
      ) : (
        <p className="py-empty-note">{legeTekst}</p>
      )}
    </>
  )
}
