import React from 'react'

import type { VerhaalKolommenBlock } from '@/payload-types'
import { Nadruk, PyKnop, sectieClass } from '@/blocks/py/ui'

export const VerhaalKolommenComponent: React.FC<VerhaalKolommenBlock> = ({
  achtergrond,
  anker,
  kolommen,
}) => {
  if (!kolommen?.length) return null

  return (
    <section className={sectieClass(achtergrond)} id={anker || undefined}>
      <div className="py-container py-story-grid">
        {kolommen.map((kolom, i) => (
          <article key={kolom.id ?? i}>
            <h2>
              <Nadruk tekst={kolom.titel} />
            </h2>
            {kolom.tekst ? <p>{kolom.tekst}</p> : null}
            <PyKnop knop={{ label: kolom.knopLabel, url: kolom.knopUrl, stijl: kolom.stijl }} />
          </article>
        ))}
      </div>
    </section>
  )
}
