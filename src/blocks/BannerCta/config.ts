import type { Block } from 'payload'

import { knopIconVeld, knopStijlVeld, tekstVeld, titelVeld } from '@/blocks/py/fields'

/** The full-width blue call-to-action band (`py-banner`), with a button or an e-mail sign-up. */
export const BannerCta: Block = {
  slug: 'bannerCta',
  interfaceName: 'BannerCtaBlock',
  labels: { singular: 'Blauwe actieband', plural: 'Blauwe actiebanden' },
  imageURL: '/blocks/banner-cta.png',
  imageAltText: 'Blauwe band met titel en knop of e-mailveld',
  fields: [
    titelVeld({ required: true }),
    tekstVeld,
    {
      name: 'actie',
      type: 'radio',
      label: 'Rechts in de band',
      defaultValue: 'knop',
      options: [
        { label: 'Knop', value: 'knop' },
        { label: 'E-mail inschrijven', value: 'inschrijven' },
      ],
    },
    {
      type: 'row',
      admin: { condition: (_, siblingData) => siblingData?.actie !== 'inschrijven' },
      fields: [
        { name: 'knopLabel', type: 'text', label: 'Knoptekst' },
        { name: 'knopUrl', type: 'text', label: 'Knop-URL' },
        knopStijlVeld('aqua'),
        knopIconVeld,
      ],
    },
    {
      name: 'inschrijven',
      type: 'group',
      label: 'Inschrijven',
      admin: { condition: (_, siblingData) => siblingData?.actie === 'inschrijven' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'placeholder',
              type: 'text',
              label: 'Placeholder',
              defaultValue: 'jij@voorbeeld.nl',
            },
            { name: 'knopLabel', type: 'text', label: 'Knoptekst', defaultValue: 'Inschrijven' },
          ],
        },
        {
          name: 'formulier',
          type: 'relationship',
          relationTo: 'forms',
          label: 'Opslaan in formulier',
          admin: {
            description:
              'Inzendingen komen in dit formulier terecht (Formulieren → Inzendingen). Het formulier heeft een e-mailveld met de naam "email" nodig.',
          },
        },
        {
          name: 'bedankt',
          type: 'text',
          label: 'Bedankt-melding',
          defaultValue: 'Bedankt! Je staat op de lijst.',
        },
      ],
    },
  ],
}
