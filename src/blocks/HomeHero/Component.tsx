import React from 'react'
import Link from 'next/link'

import type { HomeHeroBlock } from '@/payload-types'
import { Icon } from '@/components/py/Icon'
import { PyPriceBlob } from '@/components/py/Chrome'
import { Nadruk, PyImage, isMedia } from '@/blocks/py/ui'
import { ZoekBalk } from '@/blocks/py/ZoekBalk'

export const HomeHeroComponent: React.FC<HomeHeroBlock> = ({
  titel,
  tekst,
  zoekbalk,
  snelleSteden,
  afbeelding,
  prijs,
  prijsEenheid,
  ticketLabel,
  ticketTitel,
  ticketTijd,
  statWaarde,
  statLabel,
  cijfers,
}) => {
  const doel = zoekbalk?.doel || '/locaties'

  return (
    <section className="py-hero">
      <div className="py-container py-hero__grid">
        <div className="py-hero__copy">
          <h1>
            <Nadruk tekst={titel} />
          </h1>
          {tekst ? <p>{tekst}</p> : null}
          <ZoekBalk zoekbalk={zoekbalk} />
          {snelleSteden?.length ? (
            <div className="py-quick-cities" aria-label="Populaire steden">
              {snelleSteden.map((stad, i) => (
                <Link key={stad.id ?? i} href={`${doel}?stad=${encodeURIComponent(stad.naam)}`}>
                  {stad.naam}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <div className="py-hero__visual">
          <div className="py-pin-photo">
            {isMedia(afbeelding) ? (
              <PyImage media={afbeelding} sizes="(max-width: 980px) 100vw, 50vw" priority />
            ) : (
              <div className="py-image-placeholder" />
            )}
          </div>
          {prijs ? (
            <PyPriceBlob price={prijs} unit={prijsEenheid ?? 'per dag'} tone="aqua" />
          ) : null}
          {ticketTitel ? (
            <div className="py-hero-ticket">
              <span>
                <Icon name="check" size={18} /> {ticketLabel}
              </span>
              <strong>{ticketTitel}</strong>
              <small>{ticketTijd}</small>
            </div>
          ) : null}
          {statWaarde ? (
            <div className="py-hero-stat">
              <strong>{statWaarde}</strong>
              <span>{statLabel}</span>
            </div>
          ) : null}
        </div>
      </div>
      {cijfers?.length ? (
        <div className="py-container py-proofbar">
          {cijfers.map((cijfer, i) => (
            <div key={cijfer.id ?? i}>
              <strong>{cijfer.waarde}</strong>
              <span>{cijfer.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}
