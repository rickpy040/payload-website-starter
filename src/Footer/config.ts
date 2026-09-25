import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tekst',
      type: 'textarea',
      label: 'Tekst onder het logo',
    },
    {
      name: 'kolommen',
      type: 'array',
      label: 'Linkkolommen',
      maxRows: 4,
      labels: { singular: 'Kolom', plural: 'Kolommen' },
      fields: [
        { name: 'titel', type: 'text', required: true, label: 'Titel' },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          maxRows: 8,
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Tekst' },
                { name: 'url', type: 'text', required: true, label: 'URL' },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'onderregelLinks',
          type: 'text',
          label: 'Onderregel links',
          defaultValue: 'ParkingYou {jaar} - The other way of parking.',
          admin: { description: '{jaar} wordt het huidige jaar.' },
        },
        { name: 'onderregelRechts', type: 'text', label: 'Onderregel rechts' },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Losse links (oud)',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Alleen gebruikt zolang er geen linkkolommen zijn.',
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
