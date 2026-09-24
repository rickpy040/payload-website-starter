import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

/** `faqCategorieen`, per docs/CONTENT-MODEL.md — small, but keeps a large FAQ navigable. */
export const FaqCategorieen: CollectionConfig = {
  slug: 'faq-categorieen',
  labels: { singular: 'FAQ-categorie', plural: 'FAQ-categorieën' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: { useAsTitle: 'naam', defaultColumns: ['naam', 'slug', 'volgorde'] },
  fields: [
    { name: 'naam', type: 'text', required: true, label: 'Naam' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL' },
    { name: 'volgorde', type: 'number', defaultValue: 0, label: 'Volgorde' },
  ],
}
