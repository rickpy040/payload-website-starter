import type { Block } from 'payload'

import { tekstVeld, titelVeld, zoekbalkVeld } from '@/blocks/py/fields'

/** The homepage hero from the prototype (`PYHero`): search, quick cities, photo with price and ticket, proof bar. */
export const HomeHero: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
  labels: { singular: 'Hero met zoekbalk en foto', plural: "Hero's met zoekbalk en foto" },
  imageURL: '/blocks/home-hero.png',
  imageAltText: 'Grote hero met zoekbalk, foto, prijsbol en cijferbalk',
  fields: [
    titelVeld({ required: true }),
    tekstVeld,
    zoekbalkVeld,
    {
      name: 'snelleSteden',
      type: 'array',
      label: 'Populaire steden onder de zoekbalk',
      maxRows: 6,
      fields: [{ name: 'naam', type: 'text', required: true, label: 'Stad' }],
    },
    {
      type: 'collapsible',
      label: 'Foto rechts',
      fields: [
        { name: 'afbeelding', type: 'upload', relationTo: 'media', label: 'Foto' },
        {
          type: 'row',
          fields: [
            {
              name: 'prijs',
              type: 'text',
              label: 'Prijs in de bol',
              defaultValue: '5',
              admin: { description: 'Zonder "EUR", bv. "5" of "2,50"' },
            },
            {
              name: 'prijsEenheid',
              type: 'text',
              label: 'Onder de prijs',
              defaultValue: 'per dag',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ticketLabel',
              type: 'text',
              label: 'Ticket: label',
              defaultValue: 'Gereserveerd',
            },
            {
              name: 'ticketTitel',
              type: 'text',
              label: 'Ticket: locatie',
              defaultValue: 'Philips Stadion',
            },
            {
              name: 'ticketTijd',
              type: 'text',
              label: 'Ticket: tijd',
              defaultValue: 'Vandaag 09:00 - 17:00',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'statWaarde', type: 'text', label: 'Cijfer: waarde', defaultValue: '40+' },
            {
              name: 'statLabel',
              type: 'text',
              label: 'Cijfer: uitleg',
              defaultValue: 'garages in Nederland',
            },
          ],
        },
      ],
    },
    {
      name: 'cijfers',
      type: 'array',
      label: 'Cijferbalk onder de hero',
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'waarde', type: 'text', required: true, label: 'Waarde' },
            { name: 'label', type: 'text', required: true, label: 'Uitleg' },
          ],
        },
      ],
    },
  ],
}
