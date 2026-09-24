import React from 'react'
import Link from 'next/link'

import type { Pois, Location } from '@/payload-types'
import { PyButton } from '@/components/py/Button'
import { Media } from '@/components/Media'

type Props = { poi: Pois }

export const PoiHeroComponent: React.FC<Props> = ({ poi }) => {
  const titel = poi.titel || `Parkeren bij ${poi.name}`
  const primaire = typeof poi.primaireLocatie === 'object' ? (poi.primaireLocatie as Location) : null
  const stadSlug = primaire && typeof primaire.stad === 'object' && primaire.stad ? primaire.stad.slug : primaire?.city

  return (
    <section className="py-container" style={{ paddingTop: 24 }}>
      <h1>{titel}</h1>
      <p className="py-lead">{poi.intro}</p>
      {poi.image && typeof poi.image === 'object' ? (
        <div style={{ marginTop: 20, borderRadius: 'var(--py-radius)', overflow: 'hidden' }}>
          <Media resource={poi.image} imgClassName="w-full" />
        </div>
      ) : null}
      {primaire ? (
        <div className="py-uitgelicht-card" style={{ marginTop: 24 }}>
          <div>
            <strong>Dichtstbijzijnde parkeergarage</strong>
            <p>
              {primaire.name}
              {poi.loopafstand ? ` — ${poi.loopafstand} min lopen` : ''}
            </p>
            <PyButton href={stadSlug ? `/parkeren/${stadSlug}/${primaire.slug}` : '/locaties'}>
              Bekijk deze garage
            </PyButton>
          </div>
        </div>
      ) : (
        <Link href="/locaties">Bekijk alle locaties</Link>
      )}
    </section>
  )
}
