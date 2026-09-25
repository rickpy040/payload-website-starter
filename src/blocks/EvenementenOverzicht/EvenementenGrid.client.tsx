'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'

import type { EvenementKaart } from '@/blocks/py/data'
import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'
import { PyImage } from '@/blocks/py/ui'

function Kaart({ ev, knopLabel }: { ev: EvenementKaart; knopLabel: string }) {
  return (
    <article className="py-event-card">
      <Link href={ev.href} className="py-event-card__image">
        {ev.afbeelding ? (
          <PyImage media={ev.afbeelding} alt={ev.naam} />
        ) : (
          <div className="py-image-placeholder" />
        )}
        {ev.soort ? (
          <span className={`py-event-type py-event-type--${ev.kleur}`}>{ev.soort}</span>
        ) : null}
        {ev.stad ? (
          <span className="py-event-card__city">
            <Icon name="pin" size={14} /> {ev.stad}
          </span>
        ) : null}
      </Link>
      <div className="py-event-card__body">
        <h3>{ev.naam}</h3>
        {ev.tagline ? <p>{ev.tagline}</p> : null}
        <div className="py-event-card__meta">
          {ev.datums ? (
            <span>
              <Icon name="calendar" size={15} /> {ev.datums}
            </span>
          ) : null}
          <span>
            <Icon name="car" size={15} /> {ev.aantalLocaties} locatie
            {ev.aantalLocaties !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="py-event-card__footer">
          {ev.prijs ? (
            <span className="py-event-price">
              Vanaf <strong>€ {ev.prijs}</strong>
            </span>
          ) : (
            <span />
          )}
          <PyButton href={ev.href} variant="outline">
            {knopLabel}
          </PyButton>
        </div>
      </div>
    </article>
  )
}

export function EvenementenGrid({
  kaarten,
  toonFilters,
  toonAantal,
  knopLabel,
  alleStedenLabel,
  alleTypesLabel,
  aantalTekst,
  legeTekst,
}: {
  kaarten: EvenementKaart[]
  toonFilters: boolean
  toonAantal: boolean
  knopLabel: string
  alleStedenLabel: string
  alleTypesLabel: string
  aantalTekst: string
  legeTekst: string
}) {
  const [stad, setStad] = useState('')
  const [soort, setSoort] = useState('')
  const steden = useMemo(
    () => Array.from(new Set(kaarten.map((k) => k.stad).filter(Boolean))),
    [kaarten],
  )
  const soorten = useMemo(
    () => Array.from(new Set(kaarten.map((k) => k.soort).filter(Boolean))),
    [kaarten],
  )
  const zichtbaar = kaarten.filter(
    (k) => (!stad || k.stad === stad) && (!soort || k.soort === soort),
  )

  return (
    <>
      {toonFilters && kaarten.length ? (
        <div className="py-toolbar">
          <div className="py-toolbar__left">
            <div className="py-segments">
              {['', ...steden].map((optie) => (
                <button
                  type="button"
                  key={optie || 'alle'}
                  className={stad === optie ? 'is-active' : ''}
                  onClick={() => setStad(optie)}
                >
                  {optie || alleStedenLabel}
                </button>
              ))}
            </div>
            <div className="py-segments">
              {['', ...soorten].map((optie) => (
                <button
                  type="button"
                  key={optie || 'alle'}
                  className={soort === optie ? 'is-active' : ''}
                  onClick={() => setSoort(optie)}
                >
                  {optie || alleTypesLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {toonAantal && kaarten.length ? (
        <div className="py-results-line">
          {aantalTekst.replace('{aantal}', String(zichtbaar.length))}
        </div>
      ) : null}
      {zichtbaar.length ? (
        <div className="py-event-grid">
          {zichtbaar.map((ev) => (
            <Kaart key={ev.id} ev={ev} knopLabel={knopLabel} />
          ))}
        </div>
      ) : (
        <p className="py-empty-note">{legeTekst}</p>
      )}
    </>
  )
}
