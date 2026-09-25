import React from 'react'

import type { WaardekaartBestellenBlock } from '@/payload-types'
import { Nadruk, sectieClass } from '@/blocks/py/ui'
import { WaardekaartWizard } from './Wizard.client'

export const WaardekaartBestellenComponent: React.FC<WaardekaartBestellenBlock> = ({
  achtergrond,
  anker,
  titel,
  tekst,
  infoKaarten,
  wizard,
  formulier,
}) => {
  const formId = formulier && typeof formulier === 'object' ? formulier.id : formulier

  return (
    <section className={sectieClass(achtergrond)} id={anker || undefined}>
      <div className="py-container py-form-split">
        <div>
          <h2>
            <Nadruk tekst={titel} />
          </h2>
          {tekst ? <p>{tekst}</p> : null}
          {infoKaarten?.length ? (
            <div className="py-info-bands py-info-bands--compact">
              {infoKaarten.map((kaart, i) => (
                <article key={kaart.id ?? i}>
                  <h3>{kaart.titel}</h3>
                  {kaart.tekst ? <p>{kaart.tekst}</p> : null}
                </article>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <WaardekaartWizard teksten={wizard ?? {}} formId={formId} />
        </div>
      </div>
    </section>
  )
}
