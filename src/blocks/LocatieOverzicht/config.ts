import type { Block } from 'payload'

import { sectieVelden, tekstVeld, titelVeld } from '@/blocks/py/fields'

/**
 * A grid of location cards from the Locaties collection (`PYGarageCard`),
 * with the prototype's city filter, sort control and result count. The same
 * block is "Onze favoriete garages" on the homepage (3 cards, no filters),
 * the full Locaties overview, and "Abonnementslocaties per stad".
 */
export const LocatieOverzicht: Block = {
  slug: 'locatieOverzicht',
  interfaceName: 'LocatieOverzichtBlock',
  labels: { singular: 'Locatie-overzicht', plural: 'Locatie-overzichten' },
  imageURL: '/blocks/locatie-overzicht.png',
  imageAltText: 'Stadsfilter, sortering en een raster van locatiekaarten met prijsbol',
  fields: [
    sectieVelden('wit'),
    titelVeld(),
    tekstVeld,
    {
      type: 'row',
      fields: [
        {
          name: 'actieLabel',
          type: 'text',
          label: 'Link naast de titel',
          admin: { description: 'Bv. "Bekijk alle locaties"' },
        },
        { name: 'actieUrl', type: 'text', label: 'URL van die link' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'bron',
          type: 'select',
          label: 'Welke locaties',
          defaultValue: 'alle',
          options: [
            { label: 'Alle gepubliceerde locaties', value: 'alle' },
            { label: 'Locaties met abonnementen', value: 'abonnementen' },
            { label: 'Locaties waar de ParkingPass geldt', value: 'parkingpass' },
            { label: 'Zelf kiezen', value: 'handmatig' },
          ],
        },
        {
          name: 'stad',
          type: 'relationship',
          relationTo: 'steden',
          label: 'Alleen deze stad',
          admin: { condition: (_, siblingData) => siblingData?.bron !== 'handmatig' },
        },
        {
          name: 'maxAantal',
          type: 'number',
          label: 'Maximaal aantal',
          admin: { description: 'Leeg = alles' },
        },
      ],
    },
    {
      name: 'locaties',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      label: 'Locaties',
      admin: { condition: (_, siblingData) => siblingData?.bron === 'handmatig' },
    },
    {
      type: 'row',
      fields: [
        { name: 'toonStadFilter', type: 'checkbox', label: 'Stadsfilter', defaultValue: true },
        { name: 'toonSortering', type: 'checkbox', label: 'Sorteren', defaultValue: true },
        { name: 'toonAantal', type: 'checkbox', label: 'Aantal gevonden', defaultValue: true },
        {
          name: 'eersteUitgelicht',
          type: 'checkbox',
          label: 'Eerste kaart oranje',
          defaultValue: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Teksten en afbeeldingen',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'knopLabel',
              type: 'text',
              label: 'Knop op de kaart',
              defaultValue: 'Bekijk en reserveer',
            },
            {
              name: 'alleStedenLabel',
              type: 'text',
              label: 'Eerste filterknop',
              defaultValue: 'Alle steden',
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
              defaultValue: '{aantal} garages gevonden',
              admin: {
                description: '{aantal} wordt het aantal; bij een gekozen stad volgt "in {stad}".',
              },
            },
            {
              name: 'legeTekst',
              type: 'text',
              label: 'Als er niets is',
              defaultValue: 'Er zijn hier nog geen locaties gepubliceerd.',
            },
          ],
        },
        {
          name: 'standaardAfbeeldingen',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          label: 'Standaardfoto’s',
          admin: { description: 'Voor locaties zonder eigen foto. Worden om de beurt gebruikt.' },
        },
      ],
    },
  ],
}
