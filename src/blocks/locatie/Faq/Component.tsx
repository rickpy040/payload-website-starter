import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { LocatieFaqBlock, Location } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = LocatieFaqBlock & { locatie: Location }

export const LocatieFaqComponent: React.FC<Props> = async ({ titel, locatie }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'faq',
    draft: false,
    overrideAccess: false,
    limit: 50,
    sort: 'volgorde',
    where: { locations: { equals: locatie.id } },
  })

  const extra = (locatie.faqs ?? []).filter((f) => typeof f === 'object')
  const items = [...result.docs, ...extra.filter((f) => !result.docs.some((d) => d.id === f.id))]

  if (items.length === 0) return null

  return (
    <section className="py-info-section" id="faq">
      <div className="py-container">
        <h3>{titel}</h3>
        <div className="py-faq-list">
          {items.map((item) => (
            <details className="py-faq-item" key={item.id}>
              <summary>{item.question}</summary>
              <div className="py-faq-answer">
                <RichText data={item.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
