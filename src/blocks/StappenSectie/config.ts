import type { Block } from 'payload'

import { sectieVelden, tekstVeld, titelVeld } from '@/blocks/py/fields'

/**
 * Numbered steps with an intro. "Kaarten" is the homepage's "Zo werkt het"
 * (one card can be highlighted in blue); "Naast de intro" is the ParkingPass
 * page's "Hoe het werkt", where the intro and the steps share one row.
 */
export const StappenSectie: Block = {
  slug: 'stappenSectie',
  interfaceName: 'StappenSectieBlock',
  labels: { singular: 'Stappen', plural: 'Stappen' },
  imageURL: '/blocks/stappen-sectie.png',
  imageAltText: 'Intro met drie genummerde stappen',
  fields: [
    sectieVelden('wit'),
    {
      name: 'stijl',
      type: 'select',
      label: 'Stijl',
      defaultValue: 'kaarten',
      options: [
        { label: 'Kaarten onder de intro (Home)', value: 'kaarten' },
        { label: 'Naast de intro (ParkingPass)', value: 'flow' },
      ],
    },
    titelVeld(),
    tekstVeld,
    {
      name: 'stapLabel',
      type: 'text',
      label: 'Woord voor het nummer',
      defaultValue: 'Stap',
      admin: {
        description: 'Alleen bij "Kaarten": toont "Stap 01". Leeg = alleen het nummer.',
        condition: (_, siblingData) => siblingData?.stijl !== 'flow',
      },
    },
    {
      name: 'stappen',
      type: 'array',
      label: 'Stappen',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'nummer', type: 'text', label: 'Nummer', admin: { description: 'Bv. "01"' } },
            { name: 'titel', type: 'text', required: true, label: 'Titel' },
          ],
        },
        { name: 'tekst', type: 'textarea', label: 'Tekst' },
        { name: 'uitgelicht', type: 'checkbox', label: 'Uitgelicht (blauwe kaart)' },
      ],
    },
  ],
}
