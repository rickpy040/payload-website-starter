import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateAllePaginas, safeRevalidatePath as revalidatePath } from '../../utilities/safeRevalidatePath'

import type { Location } from '../../payload-types'

function pathFor(doc: Pick<Location, 'slug' | 'city' | 'stad'>): string {
  const stadSlug = typeof doc.stad === 'object' && doc.stad ? doc.stad.slug : doc.city
  return `/parkeren/${stadSlug}/${doc.slug}`
}

/**
 * Publishing a location revalidates its own path, its city page, `/locaties`
 * and the general `/parkeren` search, per docs/CONTENT-MODEL.md's revalidation
 * table. POI pages that reference it are left for a later pass rather than
 * queried on every save. CMS pages with a Locatie-overzicht (Abonnementen,
 * ParkingPass, …) are marked stale as a whole, see revalidateAllePaginas.
 */
export const revalidateLocatie: CollectionAfterChangeHook<Location> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = pathFor(doc)
      payload.logger.info(`Revalidating locatie at path: ${path}`)
      revalidatePath(path)
      revalidatePath('/locaties')
      revalidatePath('/parkeren')
      revalidatePath('/')
      revalidateAllePaginas()
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(pathFor(previousDoc))
      revalidatePath('/locaties')
      revalidateAllePaginas()
    }
  }
  return doc
}

export const revalidateLocatieDelete: CollectionAfterDeleteHook<Location> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(pathFor(doc))
    revalidatePath('/locaties')
    revalidateAllePaginas()
  }
  return doc
}
