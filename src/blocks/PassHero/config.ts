import type { Block } from 'payload'

import { tekstVeld, titelVeld } from '@/blocks/py/fields'

/** The ParkingPass page hero (`py-pass-hero`): a 10x/25x toggle next to a live pass card. */
export const PassHero: Block = {
  slug: 'passHero',
  interfaceName: 'PassHeroBlock',
  labels: { singular: 'ParkingPass-hero', plural: "ParkingPass-hero's" },
  imageURL: '/blocks/pass-hero.png',
  imageAltText: 'Donkerblauwe hero met keuzeknoppen en een ParkingPass-kaart',
  fields: [
    titelVeld({ required: true }),
    tekstVeld,
    {
      name: 'opties',
      type: 'array',
      label: 'Keuzes',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'waarde',
              type: 'text',
              required: true,
              label: 'Aantal',
              admin: { description: 'Bv. "10"; verschijnt groot op de kaart als "10x"' },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Knoptekst',
              admin: { description: 'Bv. "10x parkeren"' },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'kaartLabel', type: 'text', label: 'Kaart: label', defaultValue: 'ParkingPass' },
        {
          name: 'kaartOndertitel',
          type: 'text',
          label: 'Kaart: onder het aantal',
          defaultValue: 'flexibel parkeren',
        },
      ],
    },
    { name: 'kaartTekst', type: 'text', label: 'Kaart: kleine tekst' },
    {
      name: 'koppelVeld',
      type: 'text',
      label: 'Gekoppeld formulierveld',
      defaultValue: 'aantal',
      admin: {
        description:
          'Naam van een keuzelijst in een formulier op dezelfde pagina (bv. het ParkingPass-bestelformulier). De keuze hier en daar blijft gelijk. Leeg = niet koppelen.',
      },
    },
  ],
}
