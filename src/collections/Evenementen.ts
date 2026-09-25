import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { revalidateEvenement, revalidateEvenementDelete } from './hooks/revalidateEvenement'

/**
 * `evenementen`, added per docs/CONTENT-MODEL.md's addendum: the location
 * page's "Evenementen nabij deze locatie" block had no collection behind it.
 * `locaties` is required for the same reason `poiPaginas.primaireLocatie` is:
 * it is what makes the block on the location page a query rather than a
 * hand-kept list.
 */
export const Evenementen: CollectionConfig = {
  slug: 'evenementen',
  labels: { singular: 'Evenement', plural: 'Evenementen' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: { useAsTitle: 'naam', defaultColumns: ['naam', 'soort', 'datums', '_status'] },
  versions: { drafts: true },
  fields: [
    { name: 'naam', type: 'text', required: true, label: 'Naam' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL' },
    {
      name: 'tagline',
      type: 'text',
      label: 'Ondertitel',
      admin: { description: 'Korte regel onder de naam op de evenementkaart, bv. "Officieel parkeerpartner van PSV".' },
    },
    { name: 'soort', type: 'text', label: 'Soort', admin: { description: 'Bv. Festival of Sport' } },
    {
      name: 'plaats',
      type: 'text',
      label: 'Plaats',
      admin: { description: 'Stad op de kaart en in het stadsfilter. Leeg = de stad van de eerste parkeerlocatie.' },
    },
    {
      name: 'kleur',
      type: 'select',
      label: 'Kleur van het label',
      defaultValue: 'orange',
      options: [
        { label: 'Oranje', value: 'orange' },
        { label: 'Blauw', value: 'blue' },
        { label: 'Aqua', value: 'aqua' },
      ],
    },
    { name: 'datums', type: 'text', label: 'Datums' },
    { name: 'afbeelding', type: 'upload', relationTo: 'media', label: 'Afbeelding' },
    { name: 'vanafPrijs', type: 'text', label: 'Vanafprijs' },
    {
      name: 'locaties',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      required: true,
      label: 'Geschikte parkeerlocaties',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link van de knop "Parkeerticket"',
      admin: {
        description: 'Bv. een campagnepagina (/evenementen/glow) of een externe ticketlink. Leeg = de pagina van de eerste parkeerlocatie.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateEvenement],
    afterDelete: [revalidateEvenementDelete],
  },
}
