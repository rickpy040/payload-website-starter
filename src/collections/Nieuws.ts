import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { revalidateNieuws, revalidateNieuwsDelete } from './hooks/revalidateNieuws'

/**
 * `nieuws`, per docs/CONTENT-MODEL.md. The two relationship fields
 * (`gerelateerdeLocaties`, `gerelateerdeSteden`) are what turn a news article
 * into internal links per the IA's linking table, rather than a dead end.
 */
export const Nieuws: CollectionConfig = {
  slug: 'nieuws',
  labels: { singular: 'Nieuwsartikel', plural: 'Nieuws' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'titel',
    defaultColumns: ['titel', 'publicatiedatum', '_status'],
  },
  versions: { drafts: true },
  fields: [
    { name: 'titel', type: 'text', required: true, label: 'Titel' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL',
      admin: { position: 'sidebar', description: 'Gebruikt onder /nieuws/{url}' },
    },
    { name: 'publicatiedatum', type: 'date', required: true, label: 'Publicatiedatum', admin: { position: 'sidebar' } },
    { name: 'auteur', type: 'text', label: 'Auteur', admin: { position: 'sidebar' } },
    { name: 'samenvatting', type: 'textarea', required: true, label: 'Samenvatting' },
    { name: 'inhoud', type: 'richText', editor: lexicalEditor(), required: true, label: 'Inhoud' },
    { name: 'hero', type: 'upload', relationTo: 'media', label: 'Hoofdafbeelding' },
    {
      name: 'gerelateerdeLocaties',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      label: 'Gerelateerde locaties',
    },
    {
      name: 'gerelateerdeSteden',
      type: 'relationship',
      relationTo: 'steden',
      hasMany: true,
      label: 'Gerelateerde steden',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'titel', type: 'text', label: 'SEO-titel' },
        { name: 'omschrijving', type: 'textarea', label: 'SEO-omschrijving' },
        { name: 'afbeelding', type: 'upload', relationTo: 'media', label: 'Deelafbeelding' },
      ],
    },
    { name: 'oudeId', type: 'number', label: 'Oud CMS-ID', admin: { position: 'sidebar' } },
  ],
  hooks: {
    afterChange: [revalidateNieuws],
    afterDelete: [revalidateNieuwsDelete],
  },
}
