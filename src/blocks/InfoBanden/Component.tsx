import React from 'react'

import type { InfoBandenBlock } from '@/payload-types'
import { sectieClass } from '@/blocks/py/ui'

export const InfoBandenComponent: React.FC<InfoBandenBlock> = ({
  achtergrond,
  anker,
  stijl,
  kaarten,
}) => {
  if (!kaarten?.length) return null

  return (
    <section className={sectieClass(achtergrond)} id={anker || undefined}>
      <div className={`py-container ${stijl === 'partner' ? 'py-partner-grid' : 'py-info-bands'}`}>
        {kaarten.map((kaart, i) => (
          <article key={kaart.id ?? i}>
            <h3>{kaart.titel}</h3>
            {kaart.tekst ? <p>{kaart.tekst}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
