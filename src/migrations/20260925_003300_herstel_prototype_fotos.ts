import fs from 'fs'
import path from 'path'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

import { FOTOS } from './20260924_234500_seed_prototype_paginas'

/**
 * Re-uploads the prototype photos to Vercel Blob.
 *
 * The seed migration (20260924_234500) ran in a build without
 * BLOB_READ_WRITE_TOKEN (a preview deployment on the shared database). Without
 * a token the Blob plugin is off, so the photos were written to that build
 * machine's disk and are gone; in production their URLs point at blobs that
 * were never uploaded.
 *
 * - With a token: every prototype photo that is not in Blob yet (no
 *   `_objectKey`) is downloaded again and uploaded.
 * - Without a token, locally: photos whose file is on disk are fine.
 * - Without a token, with files missing: fails on purpose, so the migration
 *   is not recorded as done and runs again in the next build that has a
 *   token (production). A preview build without a token fails on this until
 *   production has run it once.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const heeftToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  const mediaDir = path.resolve(process.cwd(), 'public/media')

  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { like: 'prototype-' } },
    limit: 50,
    depth: 0,
    overrideAccess: true,
    req,
  })

  const ontbreekt: string[] = []
  for (const doc of docs) {
    const filename = doc.filename ?? ''
    const key = filename.replace(/^prototype-/, '').replace(/\.jpg$/, '') as keyof typeof FOTOS
    const foto = FOTOS[key]
    if (!foto || doc._objectKey) continue

    if (!heeftToken) {
      if (!fs.existsSync(path.join(mediaDir, filename))) ontbreekt.push(filename)
      continue
    }

    try {
      const res = await fetch(foto.url, { signal: AbortSignal.timeout(20000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = Buffer.from(await res.arrayBuffer())
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {},
        file: { data, mimetype: 'image/jpeg', name: filename, size: data.length },
        overwriteExistingFiles: true,
        overrideAccess: true,
        req,
      })
      payload.logger.info(`herstel foto's: ${filename} opnieuw geüpload naar Blob`)
    } catch (err) {
      // An unreachable Unsplash must not block the production build; the
      // editor can upload a replacement in Media.
      payload.logger.warn(`herstel foto's: ${filename} niet hersteld (${(err as Error).message})`)
    }
  }

  if (ontbreekt.length) {
    throw new Error(
      `herstel foto's: ${ontbreekt.join(', ')} staan niet in Blob en niet op schijf, en deze build heeft geen BLOB_READ_WRITE_TOKEN. ` +
        'De migratie wordt niet als klaar gemarkeerd en draait opnieuw in een build met token (productie).',
    )
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Nothing to undo: the photos are ordinary Media documents.
}
