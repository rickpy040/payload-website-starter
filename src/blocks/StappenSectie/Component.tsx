import React from 'react'

import type { StappenSectieBlock } from '@/payload-types'
import { SectieIntro, sectieClass } from '@/blocks/py/ui'

export const StappenSectieComponent: React.FC<StappenSectieBlock> = ({
  achtergrond,
  anker,
  stijl,
  titel,
  tekst,
  stapLabel,
  stappen,
}) => {
  const lijst = stappen ?? []

  if (stijl === 'flow') {
    return (
      <section className={sectieClass(achtergrond)} id={anker || undefined}>
        <div className="py-container py-pass-flow">
          <SectieIntro titel={titel} tekst={tekst} />
          {lijst.map((stap, i) => (
            <article key={stap.id ?? i}>
              {stap.nummer ? <span>{stap.nummer}</span> : null}
              <h3>{stap.titel}</h3>
              {stap.tekst ? <p>{stap.tekst}</p> : null}
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={sectieClass(achtergrond)} id={anker || undefined}>
      <div className="py-container">
        <SectieIntro titel={titel} tekst={tekst} />
        <div className="py-step-grid">
          {lijst.map((stap, i) => (
            <article key={stap.id ?? i} className={stap.uitgelicht ? 'is-featured' : undefined}>
              {stap.nummer ? (
                <span>{[stapLabel, stap.nummer].filter(Boolean).join(' ')}</span>
              ) : null}
              <h3>{stap.titel}</h3>
              {stap.tekst ? <p>{stap.tekst}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
