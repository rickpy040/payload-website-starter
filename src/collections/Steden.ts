import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { StadHero } from '@/blocks/stad/Hero/config'
import { StadLocatiesLijst } from '@/blocks/stad/LocatiesLijst/config'
import { Content } from '@/blocks/Content/config'
import { Citaat } from '@/blocks/Citaat/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { revalidateStad, revalidateStadDelete } from './hooks/revalidateStad'

/**
 * `steden`, per docs/CONTENT-MODEL.md — the parent of the location cluster and
 * the page for "parkeren {stad}". Also covers the two region pages
 * (regio-zuid-holland, regio-gelderland), per docs/IA.md open question 2.
 *
 * The page body is a `secties` blocks field rather than fixed fields, so an
 * editor can reorder or remove sections (the location list, a text block, a
 * quote, a call to action) without a developer. `StadLocatiesLijst` queries
 * `locations` by `stad` rather than listing them by hand, which is what keeps
 * a newly published location from becoming an orphan (docs/IA.md).
 */
export const Steden: CollectionConfig = {
  slug: 'steden',
  labels: {
    singular: 'Stad',
    plural: 'Steden',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'naam',
    defaultColumns: ['naam', 'slug', 'isRegio', '_status'],
    livePreview: {
      url: ({ data }) => `/parkeren/${data?.slug ?? ''}`,
    },
    preview: (data) => `/parkeren/${data?.slug ?? ''}`,
  },
  versions: { drafts: true },
  fields: [
    { name: 'naam', type: 'text', required: true, label: 'Naam' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL',
      admin: {
        position: 'sidebar',
        description: 'Gebruikt in de URL: /parkeren/{url}',
      },
    },
    {
      name: 'isRegio',
      type: 'checkbox',
      label: 'Dit is een regio, geen stad',
      admin: {
        position: 'sidebar',
        description: 'Verandert de H1 van "Parkeren in {naam}" naar "Parkeren in de {naam}"',
      },
    },
    {
      name: 'provincie',
      type: 'text',
      label: 'Provincie',
      admin: { position: 'sidebar' },
    },
    {
      name: 'coordinaten',
      type: 'point',
      label: 'Middelpunt op de kaart',
      admin: { description: 'Alleen voor het centreren van de kaart, dit is geen locatie.' },
    },
    {
      name: 'secties',
      type: 'blocks',
      label: 'Secties op de pagina',
      labels: { singular: 'Sectie', plural: 'Secties' },
      blocks: [StadHero, StadLocatiesLijst, Content, Citaat, CallToAction],
      admin: {
        initCollapsed: true,
        description:
          'Sleep om te herordenen. Elke sectie kan uit staan door hem te verwijderen; niets hier is verplicht in een vaste volgorde.',
      },
      defaultValue: [{ blockType: 'stadHero' }, { blockType: 'stadLocatiesLijst' }],
    },
    {
      name: 'oudeCid',
      type: 'number',
      label: 'Oud CMS-nummer',
      admin: { position: 'sidebar', description: 'Voor het oplossen van cid= redirects.' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateStad],
    afterDelete: [revalidateStadDelete],
  },
}
