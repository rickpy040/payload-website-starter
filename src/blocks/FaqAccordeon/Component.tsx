import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { FaqAccordeonBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import { SectieIntro, sectieClass } from '@/blocks/py/ui'
import { Accordeon } from './Accordeon.client'

export const FaqAccordeonComponent: React.FC<FaqAccordeonBlock> = async ({
  achtergrond,
  anker,
  titel,
  tekst,
  bron,
  vragen,
  categorie,
  maxAantal,
}) => {
  let items: { vraag: string; antwoord: React.ReactNode }[] = []

  if (bron === 'collectie') {
    const payload = await getPayload({ config: configPromise })
    const categorieId = categorie && typeof categorie === 'object' ? categorie.id : categorie
    const result = await payload.find({
      collection: 'faq',
      depth: 0,
      limit: maxAantal && maxAantal > 0 ? maxAantal : 50,
      overrideAccess: false,
      sort: 'volgorde',
      where: categorieId ? { categorie: { equals: categorieId } } : undefined,
    })
    items = result.docs.map((faq) => ({
      vraag: faq.question,
      antwoord: <RichText data={faq.answer} enableGutter={false} enableProse={false} />,
    }))
  } else {
    items = (vragen ?? []).map((v) => ({ vraag: v.vraag, antwoord: <p>{v.antwoord}</p> }))
  }

  if (items.length === 0) return null

  return (
    <section className={sectieClass(achtergrond)} id={anker || undefined}>
      <div className="py-container py-faq">
        <SectieIntro titel={titel} tekst={tekst} />
        <Accordeon items={items} />
      </div>
    </section>
  )
}
