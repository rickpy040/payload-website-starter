import type { Block } from 'payload'

import { sectieVelden, tekstVeld, titelVeld } from '@/blocks/py/fields'

/** Event cards from the Evenementen collection, with city and type filters (`PYEventsPage`). */
export const EvenementenOverzicht: Block = {
  slug: 'evenementenOverzicht',
  interfaceName: 'EvenementenOverzichtBlock',
  labels: { singular: 'Evenementen-overzicht', plural: 'Evenementen-overzichten' },
  imageURL: '/blocks/evenementen-overzicht.png',
  imageAltText: 'Filters op stad en type met een raster van evenementkaarten',
  fields: [
    sectieVelden('wit'),
    titelVeld(),
    tekstVeld,
    {
      type: 'row',
      fields: [
        {
          name: 'toonFilters',
          type: 'checkbox',
          label: 'Filters op stad en type',
          defaultValue: true,
        },
        { name: 'toonAantal', type: 'checkbox', label: 'Aantal gevonden', defaultValue: true },
        {
          name: 'maxAantal',
          type: 'number',
          label: 'Maximaal aantal',
          admin: { description: 'Leeg = alles' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Teksten',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'knopLabel',
              type: 'text',
              label: 'Knop op de kaart',
              defaultValue: 'Parkeerticket',
            },
            {
              name: 'alleStedenLabel',
              type: 'text',
              label: 'Filter: alle steden',
              defaultValue: 'Alle steden',
            },
            {
              name: 'alleTypesLabel',
              type: 'text',
              label: 'Filter: alle types',
              defaultValue: 'Alle types',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'aantalTekst',
              type: 'text',
              label: 'Aantal gevonden',
              defaultValue: '{aantal} evenementen gevonden',
            },
            {
              name: 'legeTekst',
              type: 'text',
              label: 'Als er niets is',
              defaultValue: 'Er staan op dit moment geen evenementen gepland.',
            },
          ],
        },
      ],
    },
  ],
}
