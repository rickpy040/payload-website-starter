import React from 'react'
import Link from 'next/link'

import type { StadHeroBlock, Steden } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = StadHeroBlock & {
  stad: Steden
}

export const StadHeroComponent: React.FC<Props> = ({ titel, intro, afbeelding, stad }) => {
  const kopTitel = titel || `Parkeren in ${stad.isRegio ? 'de ' : ''}${stad.naam}`

  return (
    <section className="py-container" style={{ paddingTop: 24 }}>
      <nav aria-label="Kruimelpad" className="py-back-link" style={{ marginBottom: 12 }}>
        <Link href="/">Home</Link> / <span>{kopTitel}</span>
      </nav>
      <h1>{kopTitel}</h1>
      {intro ? <p className="py-lead">{intro}</p> : null}
      {afbeelding && typeof afbeelding === 'object' ? (
        <div style={{ marginTop: 20, borderRadius: 'var(--py-radius)', overflow: 'hidden' }}>
          <Media resource={afbeelding} imgClassName="w-full" />
        </div>
      ) : null}
    </section>
  )
}
