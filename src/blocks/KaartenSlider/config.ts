import type { Block } from 'payload'

/** Horizontaal scrollende kaartenslider, bv. voor "Producten & Diensten". */
export const KaartenSlider: Block = {
  slug: 'kaartenSlider',
  interfaceName: 'KaartenSliderBlock',
  labels: { singular: 'Kaartenslider', plural: 'Kaartensliders' },
  fields: [
    { name: 'titel', type: 'text', label: 'Titel' },
    {
      name: 'kaarten',
      type: 'array',
      label: 'Kaarten',
      minRows: 2,
      maxRows: 12,
      fields: [
        {
          name: 'afbeelding',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Afbeelding',
        },
        { name: 'titel', type: 'text', required: true, label: 'Titel' },
        { name: 'tekst', type: 'textarea', label: 'Tekst' },
      ],
    },
  ],
}
