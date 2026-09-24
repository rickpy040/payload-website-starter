import type { Block } from 'payload'

/** `locatieUitgelicht`, one of the eight generic content blocks from docs/CONTENT-MODEL.md. */
export const LocatieUitgelicht: Block = {
  slug: 'locatieUitgelicht',
  interfaceName: 'LocatieUitgelichtBlock',
  labels: { singular: 'Locatie uitgelicht', plural: 'Uitgelichte locaties' },
  fields: [
    { name: 'titel', type: 'text', label: 'Titel (optioneel)' },
    {
      name: 'locatie',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      label: 'Locatie',
    },
    { name: 'tekst', type: 'textarea', label: 'Korte tekst (optioneel, anders de intro van de locatie)' },
  ],
}
