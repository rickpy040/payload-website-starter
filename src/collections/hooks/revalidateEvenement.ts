import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { safeRevalidatePath as revalidatePath } from '../../utilities/safeRevalidatePath'

import type { Evenementen as EvenementDoc, Location } from '../../payload-types'

function locatiePaths(doc: EvenementDoc): string[] {
  return (doc.locaties ?? [])
    .filter((l): l is Location => typeof l === 'object')
    .map((l) => `/parkeren/${typeof l.stad === 'object' && l.stad ? l.stad.slug : l.city}/${l.slug}`)
}

export const revalidateEvenement: CollectionAfterChangeHook<EvenementDoc> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc._status === 'published') {
    for (const path of locatiePaths(doc)) revalidatePath(path)
  }
  return doc
}

export const revalidateEvenementDelete: CollectionAfterDeleteHook<EvenementDoc> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    for (const path of locatiePaths(doc)) revalidatePath(path)
  }
  return doc
}
