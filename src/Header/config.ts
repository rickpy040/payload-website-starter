import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Menu',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'telefoon',
          type: 'text',
          label: 'Telefoonnummer',
          admin: { description: 'Rechts in de header, bv. "085 4011647". Leeg = verbergen.' },
        },
        {
          name: 'accountUrl',
          type: 'text',
          label: 'Link van het accounticoon',
          admin: { description: 'Leeg = icoon verbergen.' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'knopLabel', type: 'text', label: 'Knoptekst', defaultValue: 'Direct reserveren' },
        { name: 'knopUrl', type: 'text', label: 'Knop-URL', defaultValue: '/parkeren' },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
