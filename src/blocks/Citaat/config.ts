import type { Block } from 'payload'

/** `citaat`, one of the eight generic content blocks from docs/CONTENT-MODEL.md. */
export const Citaat: Block = {
  slug: 'citaat',
  interfaceName: 'CitaatBlock',
  labels: { singular: 'Citaat', plural: "Citaten" },
  fields: [
    { name: 'tekst', type: 'textarea', required: true, label: 'Citaat' },
    { name: 'naam', type: 'text', label: 'Naam' },
    { name: 'functie', type: 'text', label: 'Functie of bedrijf' },
    { name: 'foto', type: 'upload', relationTo: 'media', label: 'Foto' },
  ],
}
