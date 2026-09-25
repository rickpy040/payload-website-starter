import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import React from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { CmsPagina, queryPageBySlug } from '@/components/CmsPagina'
import { generateMeta } from '@/utilities/generateMeta'

/**
 * A catch-all rather than a single `[slug]`, so a `pages` document can live at
 * a nested path such as `zakelijk/klein-zakelijk-parkeren` or `over-ons/team`
 * (docs/IA.md) just by putting the full path, slashes included, in its own
 * `slug` field. No nested-docs plugin, no second routing system: the stored
 * slug *is* the URL below `/`.
 */
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  // `home` and `locaties` have their own routes (app/(frontend)/page.tsx and
  // app/(frontend)/locaties/page.tsx), which render the same CMS page.
  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home' && doc.slug !== 'locaties'
    })
    .map(({ slug }) => {
      return { slug: slug.split('/').filter(Boolean) }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug: slugParts } = await paramsPromise
  const decodedSlug = (slugParts ?? []).map((part) => decodeURIComponent(part)).join('/') || 'home'
  const url = decodedSlug === 'home' ? '/' : '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && decodedSlug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  return <CmsPagina page={page} url={url} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug: slugParts } = await paramsPromise
  const decodedSlug = (slugParts ?? []).map((part) => decodeURIComponent(part)).join('/') || 'home'
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}
