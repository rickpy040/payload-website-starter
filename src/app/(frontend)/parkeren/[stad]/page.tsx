import React from 'react'
import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { RenderBlocksStad } from '@/blocks/RenderBlocksStad'
import { locationHref } from '@/utilities/locationHref'

type Args = {
  params: Promise<{ stad: string }>
}

async function getStad(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'steden',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { stad: slug } = await params
  const stad = await getStad(slug)
  if (!stad) return {}
  return { title: `Parkeren in ${stad.naam} — parkingyou` }
}

/**
 * The city page: "parkeren {stad}", per docs/IA.md. A location's own booking
 * flow lives one level deeper at /parkeren/{stad}/{locatie}; this page is the
 * SEO/content hub, built entirely from the city's `secties` blocks.
 */
export default async function StadPage({ params }: Args) {
  const { stad: slug } = await params
  const stad = await getStad(slug)
  if (!stad) {
    // Location pages used to live at /parkeren/{locatie}; keep those links working.
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'locations',
      draft: false,
      limit: 1,
      depth: 1,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    })
    if (docs[0]) permanentRedirect(locationHref(docs[0]))
    notFound()
  }

  return (
    <div className="py-scope">
      <RenderBlocksStad blocks={stad.secties} stad={stad} />
    </div>
  )
}
