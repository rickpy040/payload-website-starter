import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { StadLocatiesLijstBlock, Steden, Location } from '@/payload-types'
import { Icon } from '@/components/py/Icon'

type Props = StadLocatiesLijstBlock & {
  stad: Steden
}

export const StadLocatiesLijstComponent: React.FC<Props> = async ({ legeMelding, stad }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'locations',
    draft: false,
    overrideAccess: false,
    limit: 100,
    pagination: false,
    where: {
      or: [{ stad: { equals: stad.id } }, { city: { equals: stad.slug } }],
    },
  })

  const locaties = result.docs as Location[]

  if (locaties.length === 0) {
    return (
      <section className="py-container">
        <p className="py-empty-note">{legeMelding}</p>
      </section>
    )
  }

  return (
    <section className="py-container">
      <ul className="py-location-list">
        {locaties.map((locatie) => (
          <li key={locatie.id}>
            <Link href={`/parkeren/${stad.slug}/${locatie.slug}`} className="py-location-list__item">
              <div>
                <strong>{locatie.name}</strong>
                {locatie.address?.street ? (
                  <span className="py-location-list__address">
                    {locatie.address.street}
                    {locatie.address?.cityName ? `, ${locatie.address.cityName}` : ''}
                  </span>
                ) : null}
              </div>
              <div className="py-location-list__meta">
                {locatie.rating != null ? (
                  <span>
                    <Icon name="star" size={14} color="var(--py-orange)" /> {locatie.rating}
                  </span>
                ) : null}
                {locatie.pricePerHour != null ? (
                  <span>vanaf € {locatie.pricePerHour} p/u</span>
                ) : null}
                <Icon name="arrow" size={16} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
