import type { Block } from 'payload'

import { ankerVeld, iconVeld, tekstVeld, titelVeld } from '@/blocks/py/fields'

/** Title and text on the left, a 2x2 grid of icon cards on the right (`PYBenefits`). */
export const VoordelenSplit: Block = {
  slug: 'voordelenSplit',
  interfaceName: 'VoordelenSplitBlock',
  labels: { singular: 'Voordelen met intro', plural: 'Voordelen met intro' },
  imageURL: '/blocks/voordelen-split.png',
  imageAltText: 'Titel links en vier voordeelkaarten met icoon rechts',
  fields: [
    ankerVeld,
    titelVeld({ required: true }),
    tekstVeld,
    {
      name: 'voordelen',
      type: 'array',
      label: 'Voordelen',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            iconVeld('car'),
            { name: 'titel', type: 'text', required: true, label: 'Titel' },
          ],
        },
        { name: 'tekst', type: 'textarea', label: 'Tekst' },
      ],
    },
  ],
}
