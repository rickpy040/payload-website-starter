import type { Block } from 'payload'

/** The blue strip of city links (`PYCityStrip`), filled from the Steden collection or by hand. */
export const StedenStrip: Block = {
  slug: 'stedenStrip',
  interfaceName: 'StedenStripBlock',
  labels: { singular: 'Stedenbalk', plural: 'Stedenbalken' },
  imageURL: '/blocks/steden-strip.png',
  imageAltText: 'Blauwe balk met vijf stadslinks',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'bron',
          type: 'select',
          label: 'Steden',
          defaultValue: 'automatisch',
          options: [
            { label: 'Automatisch uit de collectie Steden', value: 'automatisch' },
            { label: 'Zelf kiezen', value: 'handmatig' },
          ],
        },
        {
          name: 'maxAantal',
          type: 'number',
          label: 'Maximaal aantal',
          defaultValue: 5,
          admin: { condition: (_, siblingData) => siblingData?.bron !== 'handmatig' },
        },
        {
          name: 'linkNaar',
          type: 'select',
          label: 'Link naar',
          defaultValue: 'locaties',
          options: [
            { label: 'Locaties-overzicht, gefilterd op de stad', value: 'locaties' },
            { label: 'De stadspagina (/parkeren/{stad})', value: 'stadspagina' },
          ],
          admin: { condition: (_, siblingData) => siblingData?.bron !== 'handmatig' },
        },
      ],
    },
    {
      name: 'steden',
      type: 'array',
      label: 'Steden',
      maxRows: 10,
      admin: { condition: (_, siblingData) => siblingData?.bron === 'handmatig' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'naam', type: 'text', required: true, label: 'Naam' },
            { name: 'url', type: 'text', required: true, label: 'URL' },
          ],
        },
      ],
    },
  ],
}
