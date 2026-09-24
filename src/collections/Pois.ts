import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { PoiHero } from '@/blocks/poi/Hero/config'
import { Content } from '@/blocks/Content/config'
import { FaqBlok } from '@/blocks/FaqBlok/config'
import { Citaat } from '@/blocks/Citaat/config'
import { revalidatePoi, revalidatePoiDelete } from './hooks/revalidatePoi'

/**
 * `pois`, the POI landing page collection ("parkeren bij Artis"), extended to
 * match docs/CONTENT-MODEL.md: `primaireLocatie` is required so a POI page can
 * never be published without a parent, which is the mechanical half of the
 * "no orphans" guarantee in docs/IA.md. The previous `locations` field (from
 * PR #2, used to show which locations serve this destination) is kept but
 * renamed to `extraLocaties` — the secondary, optional locations — now that
 * `primaireLocatie` carries the primary relationship.
 */
export const Pois: CollectionConfig = {
  slug: 'pois',
  labels: { singular: 'POI-pagina', plural: "POI-pagina's" },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'primaireLocatie', '_status'] },
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Naam van de bestemming' },
    {
      name: 'titel',
      type: 'text',
      label: 'Paginatitel',
      admin: { description: 'Standaard: "Parkeren bij {naam}"' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL',
      admin: { position: 'sidebar', description: 'Gebruikt onder /parkeren-bij/{url}' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categorie',
      options: [
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Winkel', value: 'shop' },
        { label: 'Hotel', value: 'hotel' },
        { label: 'Attractie', value: 'attraction' },
        { label: 'OV / Station', value: 'transit' },
        { label: 'Evenementenlocatie', value: 'venue' },
      ],
    },
    {
      name: 'primaireLocatie',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      label: 'Dichtstbijzijnde parkeergarage',
      admin: { description: 'Verplicht: dit is wat een POI-pagina onmogelijk een eiland maakt.' },
    },
    {
      name: 'extraLocaties',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      label: 'Andere geschikte garages',
    },
    { name: 'loopafstand', type: 'number', label: 'Loopafstand in minuten' },
    { name: 'intro', type: 'textarea', required: true, label: 'Korte omschrijving' },
    { name: 'coordinaten', type: 'point', label: 'Locatie van de bestemming' },
    { name: 'address', type: 'text', label: 'Adres' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Hoofdafbeelding' },
    { name: 'externalUrl', type: 'text', label: 'Externe link' },
    {
      name: 'secties',
      type: 'blocks',
      label: 'Secties op de pagina',
      labels: { singular: 'Sectie', plural: 'Secties' },
      blocks: [PoiHero, Content, FaqBlok, Citaat],
      admin: { initCollapsed: true },
      defaultValue: [{ blockType: 'poiHero' }],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'titel', type: 'text', label: 'SEO-titel' },
        { name: 'omschrijving', type: 'textarea', label: 'SEO-omschrijving' },
        { name: 'geenIndex', type: 'checkbox', label: 'Niet laten indexeren door Google' },
      ],
    },
    {
      name: 'oudeSlugs',
      type: 'array',
      label: 'Historische URLs',
      admin: { position: 'sidebar' },
      fields: [{ name: 'slug', type: 'text', required: true }],
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
  ],
  hooks: {
    afterChange: [revalidatePoi],
    afterDelete: [revalidatePoiDelete],
  },
}
