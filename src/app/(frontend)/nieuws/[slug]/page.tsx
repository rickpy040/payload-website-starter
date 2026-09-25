import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

type Args = { params: Promise<{ slug: string }> }

async function getArtikel(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'nieuws',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const artikel = await getArtikel(slug)
  if (!artikel) return {}
  return {
    title: artikel.seo?.titel || artikel.titel,
    description: artikel.seo?.omschrijving || artikel.samenvatting,
  }
}

export default async function NieuwsArtikelPage({ params }: Args) {
  const { slug } = await params
  const artikel = await getArtikel(slug)
  if (!artikel) notFound()

  return (
    <div className="py-scope">
      <div className="py-container" style={{ paddingTop: 24, paddingBottom: 48, maxWidth: 760 }}>
        <p className="py-back-link">
          <Link href="/nieuws">← Nieuws</Link>
        </p>
        <h1>{artikel.titel}</h1>
        <p className="py-lead">{artikel.samenvatting}</p>
        {artikel.hero && typeof artikel.hero === 'object' ? (
          <div style={{ margin: '20px 0', borderRadius: 'var(--py-radius)', overflow: 'hidden' }}>
            <Media resource={artikel.hero} imgClassName="w-full" />
          </div>
        ) : null}
        <RichText data={artikel.inhoud} />
      </div>
    </div>
  )
}
