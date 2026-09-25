import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateAllePaginas, safeRevalidatePath as revalidatePath } from '../../utilities/safeRevalidatePath'

import type { Steden as StedenDoc } from '../../payload-types'

/**
 * Publishing a city revalidates its own page and `/locaties`, per the
 * revalidation table in docs/CONTENT-MODEL.md. Revalidating every location in
 * the city is intentionally left out here: those pages already revalidate
 * themselves on their own publish, and a full fan-out on every city save is
 * how a fast publish target turns slow at 37 locations.
 */
export const revalidateStad: CollectionAfterChangeHook<StedenDoc> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating stad at path: /parkeren/${doc.slug}`)
      revalidatePath(`/parkeren/${doc.slug}`)
      revalidatePath('/locaties')
      revalidatePath('/parkeren')
      // City names show in the Stedenbalk and the city filters on any page.
      revalidateAllePaginas()
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(`/parkeren/${previousDoc.slug}`)
      revalidatePath('/locaties')
    }
  }
  return doc
}

export const revalidateStadDelete: CollectionAfterDeleteHook<StedenDoc> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/parkeren/${doc?.slug}`)
    revalidatePath('/locaties')
  }
  return doc
}
