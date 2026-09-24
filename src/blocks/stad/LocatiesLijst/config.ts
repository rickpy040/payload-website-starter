import type { Block } from 'payload'

/**
 * The location list for this city. Deliberately has no field to hand-pick
 * locations: it queries `locations` by `stad` at render time, which is the
 * mechanical no-orphans guarantee from docs/IA.md — a new location appears
 * here the moment it is published, without an editor remembering to add it.
 */
export const StadLocatiesLijst: Block = {
  slug: 'stadLocatiesLijst',
  interfaceName: 'StadLocatiesLijstBlock',
  labels: { singular: 'Locaties in deze stad (kaart + lijst)', plural: 'Locatielijsten' },
  fields: [
    {
      name: 'legeMelding',
      type: 'text',
      label: 'Tekst als er nog geen locaties zijn',
      defaultValue: 'Er staan nog geen locaties in deze stad op de site.',
    },
  ],
}
