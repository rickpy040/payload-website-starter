import type { Block } from 'payload'

/** `uspRij`, one of the eight generic content blocks from docs/CONTENT-MODEL.md. */
export const UspRij: Block = {
  slug: 'uspRij',
  interfaceName: 'UspRijBlock',
  labels: { singular: 'USP-rij', plural: "USP-rijen" },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: "USP's",
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'titel', type: 'text', required: true, label: 'Titel' },
        { name: 'tekst', type: 'text', label: 'Tekst' },
        {
          name: 'icoon',
          type: 'select',
          label: 'Icoon',
          defaultValue: 'check',
          options: [
            { label: 'Vinkje', value: 'check' },
            { label: 'Klok', value: 'clock' },
            { label: 'Schild', value: 'shield' },
            { label: 'Auto', value: 'car' },
            { label: 'Pas', value: 'card' },
            { label: 'Bliksem', value: 'bolt' },
          ],
        },
      ],
    },
  ],
}
