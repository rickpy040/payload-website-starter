import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'
import type { Payload } from 'payload'

import type { Location, Page } from '@/payload-types'

/**
 * Adds the first real ParkingYou photos (in ./fotos) to Media and puts them on
 * the site:
 *
 * - TD Gebouw gets the photo of its own entrance sign as location photo, when
 *   it has no photo yet. It shows in the location hero and on its card.
 * - The other two replace the Unsplash stand-ins (prototype-garage and
 *   prototype-parkeerterrein) as Standaardfoto's in Locatie-overzicht blocks,
 *   i.e. on the cards of locations without a photo of their own. Only blocks
 *   that still have exactly those seeded photos are changed. The TD Gebouw
 *   photo is not used there: its sign names that location.
 *
 * Pages and locations with unpublished draft edits are left alone, as in the
 * location import. Each update runs in its own transaction (no `req`), so one
 * that fails validation does not roll back the rest.
 *
 * Storage: Media goes to Vercel Blob when BLOB_READ_WRITE_TOKEN is set. A
 * Vercel build without it (a preview on the shared database) would put the
 * files on a build machine's disk that is thrown away, the problem
 * 20260925_003300 had to repair, so there this migration fails on purpose and
 * runs again in the next build with a token (production). Locally, without a
 * token, the files go to public/media as usual.
 */

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

const common = { overrideAccess: true, depth: 0, context: { disableRevalidate: true } } as const

const log = (payload: Payload, msg: string) => payload.logger.info(`parkingyou foto's: ${msg}`)

const idVan = (value: unknown) =>
  value && typeof value === 'object' && 'id' in value ? (value as { id: number }).id : value

async function mediaId(payload: Payload, bestand: string): Promise<number | undefined> {
  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { equals: bestand } },
    limit: 1,
    ...common,
  })
  return docs[0]?.id
}

/**
 * The latest version of a document (draft or published), or null when it is
 * published with unpublished draft edits on top, which an editor is working on.
 */
async function bewerkbaar<T extends { id: number; _status?: 'draft' | 'published' | null }>(
  payload: Payload,
  collection: 'locations' | 'pages',
  laatste: T,
): Promise<{ doc: T; gepubliceerd: boolean } | null> {
  const gepubliceerd = laatste._status === 'published'
  if (gepubliceerd) return { doc: laatste, gepubliceerd }
  const hoofd = await payload.findByID({ collection, id: laatste.id, draft: false, ...common })
  if (hoofd?._status === 'published') return null
  return { doc: laatste, gepubliceerd }
}

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "parkingyou foto's: deze Vercel-build heeft geen BLOB_READ_WRITE_TOKEN, dus de foto's zouden verloren gaan. " +
        'De migratie wordt niet als klaar gemarkeerd en draait opnieuw in een build met token (productie).',
    )
  }

  // 1. Media
  const ids = {} as Record<FotoKey, number>
  for (const [key, foto] of Object.entries(FOTOS) as [FotoKey, (typeof FOTOS)[FotoKey]][]) {
    const bestaand = await mediaId(payload, foto.bestand)
    if (bestaand) {
      ids[key] = bestaand
      continue
    }
    const data = fs.readFileSync(path.join(dirname, 'fotos', foto.bestand))
    const doc = await payload.create({
      collection: 'media',
      data: { alt: foto.alt },
      file: { data, mimetype: 'image/jpeg', name: foto.bestand, size: data.length },
      ...common,
    })
    ids[key] = doc.id
    log(payload, `${foto.bestand} geüpload`)
  }

  // 2. TD Gebouw's own photo
  const td = (
    await payload.find({
      collection: 'locations',
      where: { slug: { equals: 'td-gebouw' } },
      draft: true,
      limit: 1,
      ...common,
    })
  ).docs[0] as Location | undefined
  const tdBewerkbaar = td ? await bewerkbaar(payload, 'locations', td) : null
  if (!td) {
    log(payload, 'locatie td-gebouw niet gevonden, foto alleen in Media gezet')
  } else if (!tdBewerkbaar) {
    log(payload, 'td-gebouw heeft niet-gepubliceerde wijzigingen, foto niet gekoppeld')
  } else if ((td.images ?? []).length > 0) {
    log(payload, 'td-gebouw heeft al een foto, niets gewijzigd')
  } else {
    try {
      await payload.update({
        collection: 'locations',
        id: td.id,
        data: { images: [{ image: ids.tdGebouw, alt: FOTOS.tdGebouw.alt }] },
        draft: !tdBewerkbaar.gepubliceerd,
        ...common,
      })
      log(payload, 'foto gekoppeld aan td-gebouw')
    } catch (err) {
      payload.logger.warn(`parkingyou foto's: td-gebouw niet bijgewerkt (${(err as Error).message})`)
    }
  }

  // 3. Standaardfoto's in Locatie-overzicht blocks
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
    ...common,
  })
  for (const pagina of paginas as Page[]) {
    let gewijzigd = 0
    const layout = (pagina.layout ?? []).map((block) => {
      if (block.blockType !== 'locatieOverzicht') return block
      const huidige = (block.standaardAfbeeldingen ?? []).map(idVan)
      if (huidige.length === 0 || !huidige.every((id) => oud.has(id as number))) return block
      gewijzigd++
      return { ...block, standaardAfbeeldingen: [ids.bezoekers, ids.kerk] }
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
        ...common,
      })
      log(payload, `pagina ${pagina.slug}: standaardfoto's vervangen in ${gewijzigd} blok(ken)`)
    } catch (err) {
      payload.logger.warn(
        `parkingyou foto's: pagina ${pagina.slug} niet bijgewerkt (${(err as Error).message})`,
      )
    }
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Nothing to undo: the photos are ordinary Media documents an editor can change.
}
