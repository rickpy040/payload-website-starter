/**
 * Puts the ParkingYou photos in ./fotos on the site. Runs in every build
 * (`pnpm ci`, after `payload migrate`) and never fails it.
 *
 * This is a build step rather than a migration because the upload can fail
 * for reasons outside the code, such as the Vercel Blob store being private
 * (the Blob adapter only uploads with public access). A failing migration
 * blocks every deploy, while a migration that swallows the error is marked
 * as done and never tries again; 20260925_003300 did the latter. This step
 * retries in every build until the upload works, and after that it only
 * looks up three filenames.
 *
 * What happens, in the build where a photo is first uploaded:
 * - The photo goes into Media (Vercel Blob when BLOB_READ_WRITE_TOKEN is set,
 *   public/media locally).
 * - parkingyou-td-gebouw.jpg becomes TD Gebouw's location photo, if it has
 *   none yet. Its sign names that location, so it is not used anywhere else.
 * - The other two replace the Unsplash stand-ins as Standaardfoto's in
 *   Locatie-overzicht blocks that still have exactly the seeded ones.
 * - The prototype photos (prototype-*.jpg) are downloaded and uploaded again:
 *   if these photos could not be stored until now, neither could those.
 *
 * Once a photo is in Media nothing is linked again, so an editor who removes
 * or replaces it is not overruled by the next build. Pages and locations
 * with unpublished draft edits are left alone.
 *
 * Run by hand with: pnpm fotos
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type Payload } from 'payload'
import config from '@payload-config'

import type { Location, Page } from '@/payload-types'
import { FOTOS as PROTOTYPE_FOTOS } from '@/migrations/20260924_234500_seed_prototype_paginas'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const FOTOS = {
  tdGebouw: {
    bestand: 'parkingyou-td-gebouw.jpg',
    alt: 'Parkeerterrein bij het TD-Gebouw in Eindhoven, met het ParkingYou-bord met openingstijden en tarieven',
  },
  bezoekers: {
    bestand: 'parkingyou-kantoren-bezoekers.jpg',
    alt: 'Kantoorgebouwen met een parkeerplaats voor bezoekers, een fietser op de voorgrond',
  },
  kerk: {
    bestand: 'parkingyou-kantoren-kerk.jpg',
    alt: 'Parkeerterrein tussen kantoorgebouwen, naast een kerk',
  },
} as const

type FotoKey = keyof typeof FOTOS

const SEED_STANDAARD = ['prototype-garage.jpg', 'prototype-parkeerterrein.jpg']

// No `req`: each operation gets its own transaction, so a failed upload rolls
// back only its own Media document and the next build tries it again.
// A new object per call: Payload hands `context` to the hooks as is, and the
// cloud storage plugin leaves `skipCloudStorage` set on it after an upload,
// which would keep the next upload out of Blob while still saving the document.
const common = () =>
  ({ overrideAccess: true, depth: 0, context: { disableRevalidate: true } }) as const

const log = (payload: Payload, msg: string) => payload.logger.info(`foto's: ${msg}`)
const waarschuw = (payload: Payload, msg: string) => payload.logger.warn(`foto's: ${msg}`)
const fout = (err: unknown) => (err instanceof Error ? err.message : String(err))

const idVan = (value: unknown) =>
  value && typeof value === 'object' && 'id' in value ? (value as { id: number }).id : value

async function mediaId(payload: Payload, bestand: string): Promise<number | undefined> {
  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { equals: bestand } },
    limit: 1,
    ...common(),
  })
  return docs[0]?.id
}

/**
 * Whether a document may be changed, and as draft or published: null when it
 * is published with unpublished draft edits on top, which an editor is
 * working on.
 */
async function bewerkbaar(
  payload: Payload,
  collection: 'locations' | 'pages',
  laatste: { id: number; _status?: 'draft' | 'published' | null },
): Promise<{ gepubliceerd: boolean } | null> {
  if (laatste._status === 'published') return { gepubliceerd: true }
  const hoofd = await payload.findByID({ collection, id: laatste.id, draft: false, ...common() })
  return hoofd?._status === 'published' ? null : { gepubliceerd: false }
}

/** Uploads the photos that are not in Media yet; returns every id and which are new. */
async function uploadFotos(payload: Payload) {
  const ids: Partial<Record<FotoKey, number>> = {}
  const nieuw = new Set<FotoKey>()
  for (const [key, foto] of Object.entries(FOTOS) as [FotoKey, (typeof FOTOS)[FotoKey]][]) {
    const bestaand = await mediaId(payload, foto.bestand)
    if (bestaand) {
      ids[key] = bestaand
      continue
    }
    try {
      const data = fs.readFileSync(path.join(dirname, 'fotos', foto.bestand))
      const doc = await payload.create({
        collection: 'media',
        data: { alt: foto.alt },
        file: { data, mimetype: 'image/jpeg', name: foto.bestand, size: data.length },
        ...common(),
      })
      ids[key] = doc.id
      nieuw.add(key)
      log(payload, `${foto.bestand} geüpload`)
    } catch (err) {
      waarschuw(payload, `${foto.bestand} niet geüpload, volgende build opnieuw (${fout(err)})`)
    }
  }
  return { ids, nieuw }
}

async function koppelTdGebouw(payload: Payload, fotoId: number) {
  const td = (
    await payload.find({
      collection: 'locations',
      where: { slug: { equals: 'td-gebouw' } },
      draft: true,
      limit: 1,
      ...common(),
    })
  ).docs[0] as Location | undefined
  if (!td) return log(payload, 'locatie td-gebouw niet gevonden, foto alleen in Media gezet')
  if ((td.images ?? []).length > 0) return log(payload, 'td-gebouw heeft al een foto')
  const status = await bewerkbaar(payload, 'locations', td)
  if (!status) return log(payload, 'td-gebouw heeft niet-gepubliceerde wijzigingen, foto niet gekoppeld')

  await payload.update({
    collection: 'locations',
    id: td.id,
    data: { images: [{ image: fotoId, alt: FOTOS.tdGebouw.alt }] },
    draft: !status.gepubliceerd,
    ...common(),
  })
  log(payload, 'foto gekoppeld aan td-gebouw')
}

async function vervangStandaardfotos(payload: Payload, nieuweIds: number[]) {
  const oud = new Set(
    (await Promise.all(SEED_STANDAARD.map((bestand) => mediaId(payload, bestand)))).filter(
      (id): id is number => id !== undefined,
    ),
  )
  if (oud.size === 0) return

  const { docs: paginas } = await payload.find({
    collection: 'pages',
    draft: true,
    limit: 0,
    pagination: false,
    ...common(),
  })
  for (const pagina of paginas as Page[]) {
    let gewijzigd = 0
    const layout = (pagina.layout ?? []).map((block) => {
      if (block.blockType !== 'locatieOverzicht') return block
      const huidige = (block.standaardAfbeeldingen ?? []).map(idVan)
      if (huidige.length === 0 || !huidige.every((id) => oud.has(id as number))) return block
      gewijzigd++
      return { ...block, standaardAfbeeldingen: nieuweIds }
    })
    if (gewijzigd === 0) continue

    const status = await bewerkbaar(payload, 'pages', pagina)
    if (!status) {
      log(payload, `pagina ${pagina.slug} heeft niet-gepubliceerde wijzigingen, overgeslagen`)
      continue
    }
    try {
      await payload.update({
        collection: 'pages',
        id: pagina.id,
        data: { layout } as never,
        draft: !status.gepubliceerd,
        ...common(),
      })
      log(payload, `pagina ${pagina.slug}: standaardfoto's vervangen in ${gewijzigd} blok(ken)`)
    } catch (err) {
      waarschuw(payload, `pagina ${pagina.slug} niet bijgewerkt (${fout(err)})`)
    }
  }
}

async function herstelPrototypeFotos(payload: Payload) {
  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { like: 'prototype-' } },
    limit: 50,
    ...common(),
  })
  for (const doc of docs) {
    const filename = doc.filename ?? ''
    const key = filename.replace(/^prototype-/, '').replace(/\.jpg$/, '') as keyof typeof PROTOTYPE_FOTOS
    const foto = PROTOTYPE_FOTOS[key]
    if (!foto) continue
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
        ...common(),
      })
      log(payload, `${filename} opnieuw geüpload`)
    } catch (err) {
      waarschuw(payload, `${filename} niet opnieuw geüpload (${fout(err)})`)
    }
  }
}

async function bijwerken(payload: Payload) {
  if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) {
    // Without a token the files would land on this build machine's disk and be lost.
    return waarschuw(payload, 'geen BLOB_READ_WRITE_TOKEN in deze Vercel-build, overgeslagen')
  }

  const { ids, nieuw } = await uploadFotos(payload)
  if (nieuw.size === 0) return

  if (ids.tdGebouw && nieuw.has('tdGebouw')) {
    try {
      await koppelTdGebouw(payload, ids.tdGebouw)
    } catch (err) {
      waarschuw(payload, `td-gebouw niet bijgewerkt (${fout(err)})`)
    }
  }
  if (ids.bezoekers && ids.kerk && (nieuw.has('bezoekers') || nieuw.has('kerk'))) {
    await vervangStandaardfotos(payload, [ids.bezoekers, ids.kerk])
  }
  await herstelPrototypeFotos(payload)
}

// A stalled upload (the Blob client retries network errors) must not hold up
// the build either. Stopping mid-upload rolls back that upload's transaction.
const MAX_DUUR_MS = 4 * 60 * 1000
setTimeout(() => {
  console.error(`foto's: na ${MAX_DUUR_MS / 60000} minuten gestopt, de build gaat door`)
  process.exit(0)
}, MAX_DUUR_MS).unref()

let payload: Payload | undefined
try {
  payload = await getPayload({ config })
  await bijwerken(payload)
} catch (err) {
  // Photos are content: a failure here must not stop the deploy of the code.
  const melding = `foto's: bijwerken mislukt, de build gaat door (${fout(err)})`
  if (payload) payload.logger.error(melding)
  else console.error(melding)
}
process.exit(0)
