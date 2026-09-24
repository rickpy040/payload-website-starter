import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { RenderBlocksPoi } from '@/blocks/RenderBlocksPoi'

type Args = {
  params: Promise<{ slug: string }>
}

async function getPoi(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pois',
    draft: false,
    limit: 1,
    depth: 2,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const poi = await getPoi(slug)
  if (!poi) return {}
  return {
    title: poi.seo?.titel || poi.titel || `Parkeren bij ${poi.name}`,
    description: poi.seo?.omschrijving || poi.intro,
    robots: poi.seo?.geenIndex ? { index: false, follow: false } : undefined,
  }
}

/** The POI landing page, "parkeren bij {bestemming}", per docs/IA.md. */
export default async function PoiPage({ params }: Args) {
  const { slug } = await params
  const poi = await getPoi(slug)
  if (!poi) notFound()

  return (
    <div className="py-scope">
      <RenderBlocksPoi blocks={poi.secties} poi={poi} />
    </div>
  )
}
