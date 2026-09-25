import type { Block } from 'payload'

import { knopStijlVeld, sectieVelden } from '@/blocks/py/fields'

/** Two (or more) side-by-side story cards with a heading, text and a button (Over ons). */
export const VerhaalKolommen: Block = {
  slug: 'verhaalKolommen',
  interfaceName: 'VerhaalKolommenBlock',
  labels: { singular: 'Verhaalkolommen', plural: 'Verhaalkolommen' },
  imageURL: '/blocks/verhaal-kolommen.png',
  imageAltText: 'Twee kaarten met kop, tekst en knop naast elkaar',
  fields: [
    sectieVelden('wit'),
    {
      name: 'kolommen',
      type: 'array',
      label: 'Kolommen',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'titel', type: 'text', required: true, label: 'Titel' },
        { name: 'tekst', type: 'textarea', label: 'Tekst' },
        {
          type: 'row',
          fields: [
            { name: 'knopLabel', type: 'text', label: 'Knoptekst' },
            { name: 'knopUrl', type: 'text', label: 'Knop-URL' },
            knopStijlVeld('outline'),
          ],
        },
      ],
    },
  ],
}
