import React from 'react'

import type { EvenementenOverzichtBlock } from '@/payload-types'
import { SectieIntro, sectieClass } from '@/blocks/py/ui'
import { haalEvenementen, naarEvenementKaart } from '@/blocks/py/data'
import { EvenementenGrid } from './EvenementenGrid.client'

export const EvenementenOverzichtComponent: React.FC<EvenementenOverzichtBlock> = async ({
  achtergrond,
  anker,
  titel,
  tekst,
  toonFilters,
  toonAantal,
  maxAantal,
  knopLabel,
  alleStedenLabel,
  alleTypesLabel,
  aantalTekst,
  legeTekst,
}) => {
  const kaarten = (await haalEvenementen(maxAantal)).map(naarEvenementKaart)

  return (
    <section className={sectieClass(achtergrond)} id={anker || undefined}>
      <div className="py-container">
        <SectieIntro titel={titel} tekst={tekst} />
        <EvenementenGrid
          kaarten={kaarten}
          toonFilters={Boolean(toonFilters)}
          toonAantal={Boolean(toonAantal)}
          knopLabel={knopLabel ?? 'Parkeerticket'}
          alleStedenLabel={alleStedenLabel ?? 'Alle steden'}
          alleTypesLabel={alleTypesLabel ?? 'Alle types'}
          aantalTekst={aantalTekst ?? '{aantal} evenementen gevonden'}
          legeTekst={legeTekst ?? ''}
        />
      </div>
    </section>
  )
}
