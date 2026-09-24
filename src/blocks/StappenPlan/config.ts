import type { Block } from 'payload'

/** Genummerde "zo werkt het"-sectie, bv. de stappen om te reserveren. */
export const StappenPlan: Block = {
  slug: 'stappenPlan',
  interfaceName: 'StappenPlanBlock',
  labels: { singular: 'Stappenplan', plural: 'Stappenplannen' },
  fields: [
    { name: 'titel', type: 'text', label: 'Titel' },
    {
      name: 'stappen',
      type: 'array',
      label: 'Stappen',
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'titel', type: 'text', required: true, label: 'Titel' },
        { name: 'tekst', type: 'textarea', label: 'Tekst' },
      ],
    },
  ],
}
