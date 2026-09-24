import type { Block } from 'payload'

/** Grote kaarten naast elkaar per doelgroep, bv. "Voor wie is ParkingYou zakelijk?". */
export const DoelgroepenBlok: Block = {
  slug: 'doelgroepenBlok',
  interfaceName: 'DoelgroepenBlokBlock',
  labels: { singular: 'Doelgroepen-sectie', plural: 'Doelgroepen-secties' },
  fields: [
    { name: 'titel', type: 'text', label: 'Titel' },
    {
      name: 'groepen',
      type: 'array',
      label: 'Doelgroepen',
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'titel', type: 'text', required: true, label: 'Titel' },
        { name: 'tekst', type: 'textarea', label: 'Tekst' },
        {
          name: 'punten',
          type: 'array',
          label: 'Puntenlijst',
          maxRows: 8,
          fields: [{ name: 'tekst', type: 'text', required: true, label: 'Punt' }],
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            { name: 'label', type: 'text', label: 'Linktekst' },
            { name: 'url', type: 'text', label: 'URL' },
          ],
        },
      ],
    },
  ],
}
