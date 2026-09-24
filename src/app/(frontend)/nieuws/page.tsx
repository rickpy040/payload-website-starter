import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = { title: 'Nieuws — parkingyou' }

export default async function NieuwsIndexPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'nieuws',
    draft: false,
    overrideAccess: false,
    limit: 50,
    sort: '-publicatiedatum',
  })

  return (
    <div className="py-scope">
      <div className="py-container" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <h1>Nieuws</h1>
        {result.docs.length === 0 ? (
          <p className="py-empty-note">Er is nog geen nieuws gepubliceerd.</p>
        ) : (
          <ul className="py-location-list">
            {result.docs.map((artikel) => (
              <li key={artikel.id}>
                <Link href={`/nieuws/${artikel.slug}`} className="py-location-list__item">
                  <div>
                    <strong>{artikel.titel}</strong>
                    <span className="py-location-list__address">{artikel.samenvatting}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
