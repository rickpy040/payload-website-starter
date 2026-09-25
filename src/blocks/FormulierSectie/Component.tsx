import React from 'react'

import type { Form, FormulierSectieBlock } from '@/payload-types'
import { Nadruk, sectieClass } from '@/blocks/py/ui'
import { haalLocaties, naarLocatieKaart, type LocatieBron } from '@/blocks/py/data'
import { PyFormulier, type KeuzeOpties } from './PyFormulier.client'

async function locatieOpties(bron: LocatieBron) {
  return (await haalLocaties({ bron })).map(naarLocatieKaart).map((l) => ({
    label: `${l.stad} - ${l.naam}`,
    value: `${l.stad} - ${l.naam}`,
  }))
}

export const FormulierSectieComponent: React.FC<FormulierSectieBlock> = async ({
  achtergrond,
  anker,
  titel,
  tekst,
  locatieLabels,
  formulier,
}) => {
  const form = formulier && typeof formulier === 'object' ? (formulier as Form) : null

  const opties: KeuzeOpties = {}
  for (const veld of form?.fields ?? []) {
    if (veld.blockType === 'locatieKeuze') {
      opties[veld.name] = await locatieOpties((veld.bron as LocatieBron) ?? 'alle')
    }
  }

  const labels =
    locatieLabels && locatieLabels !== 'geen'
      ? await locatieOpties(locatieLabels as LocatieBron)
      : []

  return (
    <section className={sectieClass(achtergrond)} id={anker || undefined}>
      <div className="py-container py-form-split">
        <div>
          <h2>
            <Nadruk tekst={titel} />
          </h2>
          {tekst ? <p>{tekst}</p> : null}
          {labels.length ? (
            <div className="py-card-tags">
              {labels.map((label) => (
                <span key={label.value} className="py-tag py-tag--light">
                  {label.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {form ? <PyFormulier form={form} opties={opties} /> : null}
      </div>
    </section>
  )
}
