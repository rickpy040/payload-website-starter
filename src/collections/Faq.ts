import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Faq: CollectionConfig = {
  slug: 'faq',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: { useAsTitle: 'question' },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'richText', required: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Algemeen', value: 'algemeen' },
        { label: 'Betalen', value: 'betalen' },
        { label: 'Abonnementen', value: 'abonnementen' },
        { label: 'Reserveren', value: 'reserveren' },
        { label: 'Zakelijk', value: 'zakelijk' },
      ],
    },
    {
      name: 'locations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      admin: { description: 'Leeg laten = geldt voor alle locaties' },
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
