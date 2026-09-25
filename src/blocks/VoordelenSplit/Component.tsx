import React from 'react'

import type { VoordelenSplitBlock } from '@/payload-types'
import { Icon, type IconName } from '@/components/py/Icon'
import { Nadruk } from '@/blocks/py/ui'

export const VoordelenSplitComponent: React.FC<VoordelenSplitBlock> = ({
  anker,
  titel,
  tekst,
  voordelen,
}) => {
  return (
    <section className="py-section py-section--split" id={anker || undefined}>
      <div className="py-container py-split-grid">
        <div>
          <h2>
            <Nadruk tekst={titel} />
          </h2>
          {tekst ? <p>{tekst}</p> : null}
        </div>
        <div className="py-benefit-grid">
          {(voordelen ?? []).map((voordeel, i) => (
            <article key={voordeel.id ?? i}>
              <span>
                <Icon name={(voordeel.icoon as IconName) || 'car'} size={22} />
              </span>
              <h3>{voordeel.titel}</h3>
              {voordeel.tekst ? <p>{voordeel.tekst}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
