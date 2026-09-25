import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

import { CmsPagina, queryPageBySlug } from '@/components/CmsPagina'
import { generateMeta } from '@/utilities/generateMeta'

/**
 * `/locaties` is the prototype's "Vind je parking" overview, built as the CMS
 * page with slug `locaties` (search hero + Locatie-overzicht block). Until
 * that page exists, it keeps its old behaviour and redirects to the /parkeren
 * search-and-map page.
 */
export default async function LocatiesPage() {
  const page = await queryPageBySlug({ slug: 'locaties' })
  if (!page) redirect('/parkeren')
  return <CmsPagina page={page} url="/locaties" />
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({ slug: 'locaties' })
  return generateMeta({ doc: page })
}
