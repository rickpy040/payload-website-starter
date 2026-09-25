'use client'

import React, { useId, useMemo, useState } from 'react'

import { Icon } from '@/components/py/Icon'
import {
  filterSuggesties,
  markeerDelen,
  type ZoekLocatie,
  type ZoekStad,
} from './zoekSuggesties'

type Optie = { soort: 'stad'; stad: ZoekStad } | { soort: 'locatie'; locatie: ZoekLocatie }

const meervoud = (aantal: number, een: string, meer: string) =>
  `${aantal} ${aantal === 1 ? een : meer}`

function Markeer({ tekst, invoer }: { tekst: string; invoer: string }) {
  return (
    <>
      {markeerDelen(tekst, invoer).map((deel, i) =>
        deel.treffer ? <mark key={i}>{deel.tekst}</mark> : <React.Fragment key={i}>{deel.tekst}</React.Fragment>,
      )}
    </>
  )
}

/**
 * The search panel's "Waar" field as a combobox: focusing it lists every city
 * with its locations underneath, and typing narrows that list as you go.
 * Picking a city searches for it; picking a location opens its page. With no
 * suggestions (none published, or the lookup failed) it is a plain input.
 */
export function WaarVeld({
  label,
  placeholder,
  waarde,
  onWaarde,
  steden,
  onKiesStad,
  onKiesLocatie,
}: {
  label: string
  placeholder: string
  waarde: string
  onWaarde: (waarde: string) => void
  steden: ZoekStad[]
  onKiesStad: (stad: ZoekStad) => void
  onKiesLocatie: (locatie: ZoekLocatie) => void
}) {
  const id = useId()
  const lijstId = `${id}-lijst`
  const optieId = (index: number) => `${id}-optie-${index}`
  const [open, setOpen] = useState(false)
  const [actief, setActief] = useState(-1)

  const treffers = useMemo(() => filterSuggesties(steden, waarde), [steden, waarde])
  // One flat list for the arrow keys: each city, then its locations. `start`
  // is the index of a city's own option in that list.
  const { groepen, opties } = useMemo(() => {
    const groepen: { stad: ZoekStad; start: number }[] = []
    const opties: Optie[] = []
    for (const stad of treffers) {
      groepen.push({ stad, start: opties.length })
      opties.push({ soort: 'stad', stad })
      for (const locatie of stad.locaties) opties.push({ soort: 'locatie', locatie })
    }
    return { groepen, opties }
  }, [treffers])
  const aantalLocaties = opties.length - treffers.length
  const zichtbaar = open && steden.length > 0

  const kies = (optie: Optie) => {
    setOpen(false)
    setActief(-1)
    if (optie.soort === 'stad') onKiesStad(optie.stad)
    else onKiesLocatie(optie.locatie)
  }

  const onToets = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (steden.length === 0) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      if (opties.length === 0) return
      const volgende =
        event.key === 'ArrowDown'
          ? (actief + 1) % opties.length
          : (actief <= 0 ? opties.length : actief) - 1
      setActief(volgende)
      document.getElementById(optieId(volgende))?.scrollIntoView({ block: 'nearest' })
    } else if (event.key === 'Enter') {
      if (zichtbaar && actief >= 0 && opties[actief]) {
        event.preventDefault()
        kies(opties[actief])
      } else {
        setOpen(false)
      }
    } else if (event.key === 'Escape' && open) {
      event.preventDefault()
      setOpen(false)
      setActief(-1)
    }
  }

  const status = !waarde.trim()
    ? `${meervoud(steden.length, 'stad', 'steden')} · ${meervoud(
        steden.reduce((som, s) => som + s.locaties.length, 0),
        'locatie',
        'locaties',
      )}`
    : aantalLocaties > 0
      ? `${meervoud(aantalLocaties, 'locatie', 'locaties')} in ${meervoud(treffers.length, 'stad', 'steden')}`
      : `Geen resultaten voor “${waarde.trim()}”`

  return (
    <div className={`py-search__waar ${zichtbaar ? 'is-open' : ''}`.trim()}>
      <label htmlFor={`${id}-invoer`}>
        <span>
          <Icon name="pin" size={18} /> {label}
        </span>
        <input
          id={`${id}-invoer`}
          value={waarde}
          onChange={(e) => {
            onWaarde(e.target.value)
            setOpen(true)
            setActief(-1)
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onBlur={() => {
            setOpen(false)
            setActief(-1)
          }}
          onKeyDown={onToets}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={zichtbaar}
          aria-controls={lijstId}
          aria-activedescendant={zichtbaar && actief >= 0 ? optieId(actief) : undefined}
        />
      </label>
      {zichtbaar ? (
        // Keeps focus in the input while clicking an option, so blur does not close the list first.
        <div className="py-suggest" onMouseDown={(e) => e.preventDefault()}>
          <div className="py-suggest__status" role="status" aria-live="polite">
            {waarde.trim() ? status : <>Onze steden <span>{status}</span></>}
          </div>
          <div className="py-suggest__lijst" id={lijstId} role="listbox" aria-label={label}>
            {groepen.map(({ stad, start: stadIndex }) => {
              return (
                <div key={stad.naam} role="group" aria-label={stad.naam} className="py-suggest__groep">
                  <div
                    id={optieId(stadIndex)}
                    role="option"
                    aria-selected={actief === stadIndex}
                    className={`py-suggest__stad ${actief === stadIndex ? 'is-actief' : ''}`.trim()}
                    onMouseEnter={() => setActief(stadIndex)}
                    onClick={() => kies({ soort: 'stad', stad })}
                  >
                    <Icon name="pin" size={16} />
                    <strong>
                      <Markeer tekst={stad.naam} invoer={waarde} />
                    </strong>
                    <small>{meervoud(stad.locaties.length, 'locatie', 'locaties')}</small>
                  </div>
                  {stad.locaties.map((locatie, i) => {
                    const locatieIndex = stadIndex + 1 + i
                    return (
                      <div
                        key={locatie.id}
                        id={optieId(locatieIndex)}
                        role="option"
                        aria-selected={actief === locatieIndex}
                        className={`py-suggest__locatie ${actief === locatieIndex ? 'is-actief' : ''}`.trim()}
                        onMouseEnter={() => setActief(locatieIndex)}
                        onClick={() => kies({ soort: 'locatie', locatie })}
                      >
                        <Icon name="car" size={16} />
                        <span>
                          <strong>
                            <Markeer tekst={locatie.naam} invoer={waarde} />
                          </strong>
                          {locatie.adres && locatie.adres !== stad.naam ? (
                            <small>
                              <Markeer tekst={locatie.adres} invoer={waarde} />
                            </small>
                          ) : null}
                        </span>
                        {locatie.prijs ? (
                          <em>
                            € {locatie.prijs} <small>{locatie.prijsEenheid}</small>
                          </em>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          {treffers.length === 0 ? (
            // A div, not a <p>: the hero's paragraph style would override the size.
            <div className="py-suggest__leeg">
              Probeer een andere stad, garage of straatnaam. Met <strong>Zoek plek</strong> zoek je
              in alle locaties.
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
