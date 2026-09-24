import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { LocationBookingWidget } from '@/components/parkeren/LocationBookingWidget'
import { RenderBlocksLocatie } from '@/blocks/RenderBlocksLocatie'
import type { Location, Steden } from '@/payload-types'

type Args = {
  params: Promise<{ stad: string; locatie: string }>
}

async function getLocatie(locatieSlug: string): Promise<Location | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'locations',
    draft: false,
    limit: 1,
    depth: 2,
    overrideAccess: false,
    where: { slug: { equals: locatieSlug } },
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locatie: locatieSlug } = await params
  const locatie = await getLocatie(locatieSlug)
  if (!locatie) return {}

  return {
    title: locatie.seo?.titel || locatie.name,
    description: locatie.seo?.omschrijving || locatie.intro || undefined,
    robots: locatie.seo?.geenIndex ? { index: false, follow: false } : undefined,
  }
}

/**
 * The location page: the block-based marketing content (secties, editable and
 * reorderable in the admin) plus the existing real-time booking widget, kept
 * as a sticky sidebar the way PR #2 built it. The URL gained a `{stad}`
 * segment so it lines up with docs/IA.md's `/parkeren/{stad}/{locatie}` and
 * so 37 locations across 9 cities cannot collide on slug alone.
 */
export default async function LocatiePage({ params }: Args) {
  const { locatie: locatieSlug } = await params
  const locatie = await getLocatie(locatieSlug)
  if (!locatie) notFound()

  const stad = (typeof locatie.stad === 'object' ? locatie.stad : null) as Steden | null

  // The hero renders full-width, matching both the prototype design and the
  // booking flow's existing full-width header; every other section shares a
  // two-column grid with the sticky booking widget.
  const alleSecties = locatie.secties ?? []
  const heroSecties = alleSecties.filter((b) => b.blockType === 'locatieHero')
  const overigeSecties = alleSecties.filter((b) => b.blockType !== 'locatieHero')

  return (
    <div className="py-scope">
      <RenderBlocksLocatie blocks={heroSecties} locatie={locatie} stad={stad} />

      <div className="mx-auto w-full" style={{ maxWidth: 1180 }}>
        <div className="grid items-start gap-10 px-4 py-10 md:grid-cols-[1.6fr_1fr] md:gap-12 md:px-0">
          <div className="order-2 md:order-1">
            <RenderBlocksLocatie blocks={overigeSecties} locatie={locatie} stad={stad} />
          </div>
          <aside className="order-1 md:sticky md:top-6 md:order-2">
            <LocationBookingWidget location={locatie} />
          </aside>
        </div>
      </div>
    </div>
  )
}
