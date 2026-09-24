import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { safeRevalidatePath as revalidatePath } from '../../utilities/safeRevalidatePath'

import type { Pois } from '../../payload-types'

export const revalidatePoi: CollectionAfterChangeHook<Pois> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate && doc._status === 'published') {
    revalidatePath(`/parkeren-bij/${doc.slug}`)
  }
  return doc
}

export const revalidatePoiDelete: CollectionAfterDeleteHook<Pois> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/parkeren-bij/${doc?.slug}`)
  }
  return doc
}
