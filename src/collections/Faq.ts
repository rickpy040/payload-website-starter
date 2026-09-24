import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Faq: CollectionConfig = {
  slug: 'faq',
  labels: { singular: 'FAQ-item', plural: 'FAQ-items' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: { useAsTitle: 'question', defaultColumns: ['question', 'categorie', 'volgorde'] },
  fields: [
    { name: 'question', type: 'text', required: true, label: 'Vraag' },
    { name: 'answer', type: 'richText', required: true, label: 'Antwoord' },
    {
      name: 'category',
      type: 'select',
      label: 'Categorie (legacy filter)',
      options: [
        { label: 'Algemeen', value: 'algemeen' },
        { label: 'Betalen', value: 'betalen' },
        { label: 'Abonnementen', value: 'abonnementen' },
        { label: 'Reserveren', value: 'reserveren' },
        { label: 'Zakelijk', value: 'zakelijk' },
      ],
    },
    {
      name: 'categorie',
      type: 'relationship',
      relationTo: 'faq-categorieen',
      label: 'Categorie',
      admin: { description: 'Gebruikt door het FaqBlok op /veelgestelde-vragen en generieke paginas.' },
    },
    {
      name: 'locations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      label: 'Geldt voor deze locaties',
      admin: { description: 'Leeg laten = geldt voor alle locaties' },
    },
    { name: 'volgorde', type: 'number', defaultValue: 0, label: 'Volgorde' },
  ],
}
