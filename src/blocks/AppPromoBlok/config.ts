import type { Block } from 'payload'

/** App-promotieband: titel/subtitel, features, store-knoppen en een schermafbeelding. */
export const AppPromoBlok: Block = {
  slug: 'appPromo',
  interfaceName: 'AppPromoBlokBlock',
  labels: { singular: 'App-promotie', plural: 'App-promoties' },
  fields: [
    { name: 'titel', type: 'text', required: true, label: 'Titel' },
    { name: 'subtitel', type: 'textarea', label: 'Subtitel' },
    {
      name: 'afbeelding',
      type: 'upload',
      relationTo: 'media',
      label: 'Schermafbeelding',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      maxRows: 6,
      fields: [
        { name: 'titel', type: 'text', required: true, label: 'Titel' },
        { name: 'tekst', type: 'textarea', label: 'Tekst' },
      ],
    },
    {
      name: 'knoppen',
      type: 'array',
      label: 'Store-knoppen',
      maxRows: 2,
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Tekst' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
      ],
    },
  ],
}
