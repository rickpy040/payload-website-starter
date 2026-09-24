import React from 'react'
import Link from 'next/link'

import type { LocatieUitgelichtBlock, Location } from '@/payload-types'
import { Media } from '@/components/Media'
import { PyButton } from '@/components/py/Button'
import RichText from '@/components/RichText'
import { locationHref } from '@/utilities/locationHref'

export const LocatieUitgelichtComponent: React.FC<LocatieUitgelichtBlock> = ({
  titel,
  locatie,
  tekst,
}) => {
  if (!locatie || typeof locatie !== 'object') return null

  const loc = locatie as Location
  const href = locationHref(loc)
  const image = loc.images?.[0]?.image

  return (
    <section className="py-container">
      {titel ? <h2>{titel}</h2> : null}
      <div className="py-uitgelicht-card">
        {image && typeof image === 'object' ? (
          <Media resource={image} imgClassName="py-uitgelicht-card__image" />
        ) : null}
        <div>
          <strong>{loc.name}</strong>
          {tekst ? <p>{tekst}</p> : loc.description ? <RichText data={loc.description} /> : null}
          <PyButton href={href}>Bekijk locatie</PyButton>
        </div>
      </div>
    </section>
  )
}
