import type { Block } from 'payload'

import { ankerVeld, iconVeld, knoppenVeld, tekstVeld, titelVeld } from '@/blocks/py/fields'

/** The dark blue app band with a phone mockup (`PYAppCallout`). */
export const AppCallout: Block = {
  slug: 'appCallout',
  interfaceName: 'AppCalloutBlock',
  labels: { singular: 'App-band met telefoon', plural: 'App-banden met telefoon' },
  imageURL: '/blocks/app-callout.png',
  imageAltText: 'Donkerblauwe band met features, knoppen en een telefoon',
  fields: [
    ankerVeld,
    titelVeld({ required: true }),
    tekstVeld,
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            iconVeld('check'),
            { name: 'tekst', type: 'text', required: true, label: 'Tekst' },
          ],
        },
      ],
    },
    knoppenVeld(),
    {
      name: 'telefoon',
      type: 'group',
      label: 'Telefoonscherm',
      fields: [
        { name: 'zoekTekst', type: 'text', label: 'Zoekbalk', defaultValue: 'Waar parkeer je?' },
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', label: 'Label', defaultValue: 'Beste keuze' },
            { name: 'titel', type: 'text', label: 'Locatie', defaultValue: 'Parking Stadskantoor' },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'tekst',
              type: 'text',
              label: 'Regel eronder',
              defaultValue: '1 min lopen - vanaf EUR 2,55',
            },
            { name: 'knop', type: 'text', label: 'Knop', defaultValue: 'Reserveer' },
          ],
        },
      ],
    },
  ],
}
