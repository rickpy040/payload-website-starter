import React from 'react'

import type { LocatieOverzichtBlock, Media } from '@/payload-types'
import { PyButton } from '@/components/py/Button'
import { SectieIntro, isMedia, sectieClass } from '@/blocks/py/ui'
import { haalLocaties, naarLocatieKaart, type LocatieBron } from '@/blocks/py/data'
import { LocatieGrid } from './LocatieGrid.client'

export const LocatieOverzichtComponent: React.FC<LocatieOverzichtBlock> = async ({
  achtergrond,
  anker,
  titel,
  tekst,
  actieLabel,
  actieUrl,
  bron,
  stad,
  locaties,
  maxAantal,
  toonStadFilter,
  toonSortering,
  toonAantal,
  eersteUitgelicht,
  knopLabel,
  alleStedenLabel,
  aantalTekst,
  legeTekst,
  standaardAfbeeldingen,
}) => {
  const docs = await haalLocaties({
    bron: (bron as LocatieBron) ?? 'alle',
    handmatig: locaties as never,
    stad: stad as never,
  })
  const reserve = (standaardAfbeeldingen ?? []).filter(isMedia) as Media[]
  let zonderFoto = 0
  const kaarten = docs.map(naarLocatieKaart).map((kaart) => {
    if (kaart.afbeelding || reserve.length === 0) return kaart
    return { ...kaart, afbeelding: reserve[zonderFoto++ % reserve.length] }
  })

  return (
    <section className={sectieClass(achtergrond)} id={anker || undefined}>
      <div className="py-container">
        <SectieIntro
          titel={titel}
          tekst={tekst}
          actie={
            actieLabel && actieUrl ? (
              <PyButton href={actieUrl} variant="ghost">
                {actieLabel}
              </PyButton>
            ) : undefined
          }
        />
        <LocatieGrid
          kaarten={kaarten}
          toonStadFilter={Boolean(toonStadFilter)}
          toonSortering={Boolean(toonSortering)}
          toonAantal={Boolean(toonAantal)}
          eersteUitgelicht={Boolean(eersteUitgelicht)}
          behoudVolgorde={bron === 'handmatig'}
          maxAantal={maxAantal ?? null}
          knopLabel={knopLabel ?? 'Bekijk en reserveer'}
          alleStedenLabel={alleStedenLabel ?? 'Alle steden'}
          aantalTekst={aantalTekst ?? '{aantal} garages gevonden'}
          legeTekst={legeTekst ?? ''}
        />
      </div>
    </section>
  )
}
