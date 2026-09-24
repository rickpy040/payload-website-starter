import React from 'react'
import Link from 'next/link'

import type { LocatieHeroBlock, Location, Steden } from '@/payload-types'
import { Media } from '@/components/Media'
import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'
import { PyLocationTypeBadge, PyPriceBlob } from '@/components/py/Chrome'
import { locationHref } from '@/utilities/locationHref'

type Props = LocatieHeroBlock & {
  locatie: Location
  stad: Steden | null
}

export const LocatieHeroComponent: React.FC<Props> = ({
  reserveerLabel,
  reserveerUrl,
  locatie,
  stad,
}) => {
  const overzichtHref = stad ? `/parkeren/${stad.slug}` : '/locaties'
  const dagprijs = locatie.aeroparkerSync?.dagprijs
  const image = locatie.images?.[0]?.image

  return (
    <section className="py-detail-hero">
      <div className="py-container py-detail-hero__grid">
        <div>
          <Link href={overzichtHref} className="py-back-link">
            ← Alle locaties
          </Link>
          <div className="py-detail-hero__meta">
            {locatie.soort ? <PyLocationTypeBadge type={locatie.soort} /> : null}
            {locatie.rating != null ? (
              <span className="py-detail-hero__rating">
                <Icon name="star" size={15} color="var(--py-orange)" /> {locatie.rating}
              </span>
            ) : null}
          </div>
          <h1>{locatie.name}</h1>
          {locatie.intro ? <p>{locatie.intro}</p> : null}
          <div className="py-detail-quick-facts">
            {locatie.spotsTotal != null ? (
              <span>
                <Icon name="car" size={16} /> {locatie.spotsTotal} plekken
              </span>
            ) : null}
            <span>
              <Icon name="clock" size={16} />{' '}
              {locatie.uren?.open247 ? '24/7 open' : locatie.openingHours || 'Beperkte openingstijden'}
            </span>
            {locatie.loopafstand ? (
              <span>
                <Icon name="pin" size={16} /> {locatie.loopafstand}
              </span>
            ) : null}
            {locatie.maxHeight ? (
              <span>
                <Icon name="trending" size={16} /> Max. {locatie.maxHeight}
              </span>
            ) : null}
          </div>
          <div className="py-detail-actions">
            <PyButton href={reserveerUrl || '/locaties'} variant="primary">
              {reserveerLabel || 'Reserveer nu'}
            </PyButton>
            <PyButton href={locationHref(locatie)} variant="aqua" icon="car">
              Snel boeken
            </PyButton>
            <PyButton href="/klantenservice" variant="outline" icon="phone">
              Vraag hulp
            </PyButton>
          </div>
        </div>
        <div className="py-detail-media">
          {image && typeof image === 'object' ? (
            <Media resource={image} imgClassName="w-full" priority />
          ) : null}
          {dagprijs ? <PyPriceBlob price={dagprijs} unit="per dag" tone="orange" /> : null}
        </div>
      </div>
    </section>
  )
}
