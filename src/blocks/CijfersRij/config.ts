import type { Block } from 'payload'

/** Rij met grote kengetallen, bv. "500.000+ reserveringen" / "25+ steden". */
export const CijfersRij: Block = {
  slug: 'cijfersRij',
  interfaceName: 'CijfersRijBlock',
  labels: { singular: 'Cijfers-rij', plural: 'Cijfers-rijen' },
  fields: [
    {
      name: 'cijfers',
      type: 'array',
      label: 'Cijfers',
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'waarde', type: 'text', required: true, label: 'Waarde (bv. "500.000+")' },
        { name: 'label', type: 'text', required: true, label: 'Bijschrift' },
      ],
    },
  ],
}
