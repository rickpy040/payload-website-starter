import type { Block } from 'payload'

import { iconVeld } from '@/blocks/py/fields'

/** The four product tiles under the homepage hero (`PYProductChooser`). */
export const ProductKeuze: Block = {
  slug: 'productKeuze',
  interfaceName: 'ProductKeuzeBlock',
  labels: { singular: 'Productkeuze', plural: 'Productkeuzes' },
  imageURL: '/blocks/product-keuze.png',
  imageAltText: 'Vier producttegels met icoon, titel en link',
  fields: [
    {
      name: 'linkLabel',
      type: 'text',
      label: 'Linktekst onder elke tegel',
      defaultValue: 'Bekijk optie',
    },
    {
      name: 'producten',
      type: 'array',
      label: 'Producten',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            iconVeld('car'),
            { name: 'titel', type: 'text', required: true, label: 'Titel' },
          ],
        },
        { name: 'tekst', type: 'textarea', label: 'Tekst' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
      ],
    },
  ],
}
