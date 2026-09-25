'use client'

import React, { useCallback, useState } from 'react'

import type { PassHeroBlock } from '@/payload-types'
import { Nadruk } from '@/blocks/py/ui'
import { meldKeuze, useKeuze } from '@/blocks/py/keuze'

export const PassHeroComponent: React.FC<PassHeroBlock> = ({
  titel,
  tekst,
  opties,
  kaartLabel,
  kaartOndertitel,
  kaartTekst,
  koppelVeld,
}) => {
  const lijst = opties ?? []
  const [gekozen, setGekozen] = useState(lijst[0]?.waarde ?? '')
  useKeuze(
    koppelVeld,
    useCallback((waarde: string) => setGekozen(waarde), []),
  )

  const kies = (waarde: string) => {
    setGekozen(waarde)
    if (koppelVeld) meldKeuze(koppelVeld, waarde)
  }

  return (
    <section className="py-pass-hero">
      <div className="py-container py-pass-hero__grid">
        <div>
          <h1>
            <Nadruk tekst={titel} />
          </h1>
          {tekst ? <p>{tekst}</p> : null}
          {lijst.length ? (
            <div className="py-pass-toggle" role="group" aria-label="Aantal parkeeracties">
              {lijst.map((optie, i) => (
                <button
                  type="button"
                  key={optie.id ?? i}
                  className={gekozen === optie.waarde ? 'is-active' : ''}
                  onClick={() => kies(optie.waarde)}
                >
                  {optie.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="py-pass-card">
          {kaartLabel ? <span>{kaartLabel}</span> : null}
          <strong>{gekozen}x</strong>
          {kaartOndertitel ? <small>{kaartOndertitel}</small> : null}
          {kaartTekst ? <p>{kaartTekst}</p> : null}
        </div>
      </div>
    </section>
  )
}
