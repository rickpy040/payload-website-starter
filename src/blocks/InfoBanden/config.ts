import type { Block } from 'payload'

import { sectieVelden } from '@/blocks/py/fields'

/**
 * A row of short text cards (title + body). "Banden" is the bordered row the
 * prototype uses on Abonnementen, ParkingPass and Evenementen; "Partner" is
 * the filled cards on Zakelijk.
 */
export const InfoBanden: Block = {
  slug: 'infoBanden',
  interfaceName: 'InfoBandenBlock',
  labels: { singular: 'Infokaarten', plural: 'Infokaarten' },
  imageURL: '/blocks/info-banden.png',
  imageAltText: 'Drie tekstkaarten naast elkaar',
  fields: [
    sectieVelden('wit'),
    {
      name: 'stijl',
      type: 'select',
      label: 'Stijl',
      defaultValue: 'banden',
      options: [
        { label: 'Omlijnde kaarten (Abonnementen, ParkingPass)', value: 'banden' },
        { label: 'Gevulde kaarten (Zakelijk)', value: 'partner' },
      ],
    },
    {
      name: 'kaarten',
      type: 'array',
      label: 'Kaarten',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'titel', type: 'text', required: true, label: 'Titel' },
        { name: 'tekst', type: 'textarea', label: 'Tekst' },
      ],
    },
  ],
}
