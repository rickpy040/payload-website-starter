import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { safeRevalidatePath as revalidatePath } from '../../utilities/safeRevalidatePath'

import type { Nieuw } from '../../payload-types'

export const revalidateNieuws: CollectionAfterChangeHook<Nieuw> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc._status === 'published') {
    revalidatePath(`/nieuws/${doc.slug}`)
    revalidatePath('/nieuws')
  }
  return doc
}

export const revalidateNieuwsDelete: CollectionAfterDeleteHook<Nieuw> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/nieuws/${doc?.slug}`)
    revalidatePath('/nieuws')
  }
  return doc
}
