import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { FaqBlokBlock, Faq, FaqCategorieen } from '@/payload-types'
import RichText from '@/components/RichText'

export const FaqBlokComponent: React.FC<FaqBlokBlock> = async ({ titel, bron, categorie, vragen }) => {
  const payload = await getPayload({ config: configPromise })

  let items: Faq[] = []
  let groepen: { categorie: FaqCategorieen | null; items: Faq[] }[] = []

  if (bron === 'handmatig') {
    items = (vragen ?? []).filter((v): v is Faq => typeof v === 'object')
  } else if (bron === 'categorie' && categorie) {
    const categorieId = typeof categorie === 'object' ? categorie.id : categorie
    const result = await payload.find({
      collection: 'faq',
      draft: false,
      overrideAccess: false,
      limit: 100,
      sort: 'volgorde',
      where: { categorie: { equals: categorieId } },
    })
    items = result.docs
  } else {
    const result = await payload.find({
      collection: 'faq',
      draft: false,
      overrideAccess: false,
      limit: 200,
      sort: 'volgorde',
    })
    items = result.docs

    const catResult = await payload.find({
      collection: 'faq-categorieen',
      draft: false,
      overrideAccess: false,
      limit: 50,
      sort: 'volgorde',
    })

    groepen = [
      ...catResult.docs.map((cat) => ({
        categorie: cat,
        items: items.filter((f) => {
          const c = f.categorie
          const cid = typeof c === 'object' ? c?.id : c
          return cid === cat.id
        }),
      })),
      {
        categorie: null,
        items: items.filter((f) => {
          const c = f.categorie
          return c === undefined || c === null
        }),
      },
    ].filter((g) => g.items.length > 0)
  }

  if (bron !== 'alles' && items.length === 0) return null
  if (bron === 'alles' && groepen.length === 0) return null

  return (
    <section className="py-container">
      {titel ? <h2>{titel}</h2> : null}

      {bron === 'alles' ? (
        groepen.map((groep, i) => (
          <div key={i}>
            {groep.categorie ? <p className="py-faq-category">{groep.categorie.naam}</p> : null}
            <FaqList items={groep.items} />
          </div>
        ))
      ) : (
        <FaqList items={items} />
      )}
    </section>
  )
}

function FaqList({ items }: { items: Faq[] }) {
  return (
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
  )
}
