import type { Page, Post } from '@/payload-types'

type LinkVeld = {
  type?: 'reference' | 'custom' | null
  url?: string | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
}

/** The href of a `link()` field, resolved the same way CMSLink does. */
export function cmsLinkHref(link?: LinkVeld | null): string | null {
  if (!link) return null
  if (link.type === 'reference' && link.reference && typeof link.reference.value === 'object') {
    const slug = link.reference.value.slug
    if (!slug) return null
    const prefix = link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    return slug === 'home' && !prefix ? '/' : `${prefix}/${slug}`
  }
  return link.url || null
}
