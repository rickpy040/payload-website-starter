import React from 'react'
import Link from 'next/link'

import type { LocatieKaart as LocatieKaartData } from '@/blocks/py/data'
import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'
import { PyPriceBlob } from '@/components/py/Chrome'
import { PyImage } from '@/blocks/py/ui'

/** One location card, markup identical to the prototype's `PYGarageCard`. */
export function LocatieKaart({
  kaart,
  uitgelicht = false,
  knopLabel,
}: {
  kaart: LocatieKaartData
  uitgelicht?: boolean
  knopLabel: string
}) {
  return (
    <article className={`py-garage-card ${uitgelicht ? 'py-garage-card--featured' : ''}`.trim()}>
      <Link href={kaart.href} className="py-garage-card__image">
        {kaart.afbeelding ? (
          <PyImage media={kaart.afbeelding} alt={kaart.naam} />
        ) : (
          <div className="py-image-placeholder" />
        )}
        {kaart.stad ? (
          <span className="py-garage-card__city">
            <Icon name="pin" size={15} /> {kaart.stad}
          </span>
        ) : null}
        {kaart.prijs ? (
          <PyPriceBlob
            price={kaart.prijs}
            unit={kaart.prijsEenheid}
            tone={uitgelicht ? 'orange' : 'aqua'}
          />
        ) : null}
      </Link>
      <div className="py-garage-card__body">
        <div className="py-garage-card__title">
          <div>
            <h3>{kaart.naam}</h3>
            {kaart.adres ? <p>{kaart.adres}</p> : null}
          </div>
          {kaart.rating !== null ? <span>{kaart.rating.toFixed(1)}</span> : null}
        </div>
        {kaart.labels.length ? (
          <div className="py-card-tags">
            {kaart.labels.map((label) => (
              <span key={label} className="py-tag py-tag--light">
                {label}
              </span>
            ))}
          </div>
        ) : null}
        <div className="py-garage-card__meta">
          {kaart.loopafstand ? (
            <span>
              <Icon name="clock" size={16} /> {kaart.loopafstand}
            </span>
          ) : null}
          {kaart.plekken !== null ? (
            <span>
              <Icon name="car" size={16} /> {kaart.plekken} plekken
            </span>
          ) : null}
        </div>
        <PyButton href={kaart.href} variant="outline">
          {knopLabel}
        </PyButton>
      </div>
    </article>
  )
}
