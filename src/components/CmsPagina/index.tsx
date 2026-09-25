import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import PageClient from '@/app/(frontend)/[...slug]/page.client'

export const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

/**
 * Renders a `pages` document. Shared by the catch-all route, the homepage and
 * /locaties, which all show a CMS page when one exists.
 *
 * The page sits inside `.py-scope`, so the prototype stylesheet applies to
 * every block. A page built only from prototype sections (hero set to "None")
 * gets no extra padding: its first section is the hero, directly under the
 * header, as in the prototype.
 */
export async function CmsPagina({
  page,
  url,
}: {
  page: RequiredDataFromCollectionSlug<'pages'>
  url: string
}) {
  const { isEnabled: draft } = await draftMode()
  const { hero, layout } = page
  const heeftHero = Boolean(hero?.type && hero.type !== 'none')

  return (
    <article className={`py-scope py-pagina ${heeftHero ? 'pt-16 pb-24' : ''}`.trim()}>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}
