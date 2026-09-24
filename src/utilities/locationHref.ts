import type { Location } from '@/payload-types'

/**
 * Canonical URL of a location page: /parkeren/{stad}/{locatie}. Uses the linked
 * Stad page's slug when it's populated, otherwise the required legacy `city`
 * value, so locations without a Stad page still get a working link.
 */
export function locationHref(location: Pick<Location, 'slug' | 'city' | 'stad'>): string {
  const stadSlug =
    location.stad && typeof location.stad === 'object' ? location.stad.slug : location.city
  return `/parkeren/${stadSlug}/${location.slug}`
}
