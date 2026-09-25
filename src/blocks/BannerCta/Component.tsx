import React from 'react'

import type { BannerCtaBlock } from '@/payload-types'
import { Nadruk, PyKnop } from '@/blocks/py/ui'
import { Inschrijven } from './Inschrijven.client'

export const BannerCtaComponent: React.FC<BannerCtaBlock> = ({
  titel,
  tekst,
  actie,
  knopLabel,
  knopUrl,
  stijl,
  icoon,
  inschrijven,
}) => {
  const formulier = inschrijven?.formulier
  const formId = formulier && typeof formulier === 'object' ? formulier.id : formulier

  return (
    <section className="py-banner">
      <div className="py-container py-banner__inner">
        <div>
          <h2>
            <Nadruk tekst={titel} />
          </h2>
          {tekst ? <p>{tekst}</p> : null}
        </div>
        {actie === 'inschrijven' ? (
          <Inschrijven
            formId={formId}
            placeholder={inschrijven?.placeholder}
            knopLabel={inschrijven?.knopLabel}
            bedankt={inschrijven?.bedankt}
          />
        ) : (
          <PyKnop knop={{ label: knopLabel, url: knopUrl, stijl: stijl || 'aqua', icoon }} />
        )}
      </div>
    </section>
  )
}
