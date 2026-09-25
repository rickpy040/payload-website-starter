import React from 'react'

import type { AppCalloutBlock } from '@/payload-types'
import { Icon, type IconName } from '@/components/py/Icon'
import { KnoppenRij, Nadruk } from '@/blocks/py/ui'
import { MiniKaart } from '@/blocks/py/MiniKaart'

type Telefoon = NonNullable<AppCalloutBlock['telefoon']>

export function TelefoonMockup({ telefoon }: { telefoon?: Telefoon | null }) {
  return (
    <div className="py-phone">
      <div className="py-phone__screen">
        <div className="py-phone__map">
          <MiniKaart compact pins={[{ label: '' }, { label: '' }, { label: '' }, { label: '' }]} />
        </div>
        <div className="py-phone__search">
          <Icon name="search" size={16} /> {telefoon?.zoekTekst}
        </div>
        <div className="py-phone__sheet">
          <span>{telefoon?.label}</span>
          <strong>{telefoon?.titel}</strong>
          <small>{telefoon?.tekst}</small>
          {telefoon?.knop ? (
            <button type="button" tabIndex={-1}>
              {telefoon.knop}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export const AppCalloutComponent: React.FC<AppCalloutBlock> = ({
  anker,
  titel,
  tekst,
  features,
  knoppen,
  telefoon,
}) => {
  return (
    <section className="py-app-callout" id={anker || undefined}>
      <div className="py-container py-app-callout__grid">
        <div>
          <h2>
            <Nadruk tekst={titel} />
          </h2>
          {tekst ? <p>{tekst}</p> : null}
          {features?.length ? (
            <div className="py-feature-list">
              {features.map((feature, i) => (
                <div key={feature.id ?? i}>
                  <span>
                    <Icon name={(feature.icoon as IconName) || 'check'} size={21} />
                  </span>
                  {feature.tekst}
                </div>
              ))}
            </div>
          ) : null}
          <KnoppenRij knoppen={knoppen} />
        </div>
        <TelefoonMockup telefoon={telefoon} />
      </div>
    </section>
  )
}
