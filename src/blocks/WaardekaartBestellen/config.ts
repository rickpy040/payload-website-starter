import type { Block } from 'payload'

import { sectieVelden, tekstVeld, titelVeld } from '@/blocks/py/fields'

/** "Waardekaarten voor zakelijk gebruik": intro + info cards on the left, a three-step order wizard on the right. */
export const WaardekaartBestellen: Block = {
  slug: 'waardekaartBestellen',
  interfaceName: 'WaardekaartBestellenBlock',
  // Keeps the generated Postgres identifiers under the 63-character limit.
  dbName: 'waardekaart',
  labels: { singular: 'Waardekaart bestellen', plural: 'Waardekaart bestellen' },
  imageURL: '/blocks/waardekaart-bestellen.png',
  imageAltText: 'Intro met infokaarten en een bestelwizard in drie stappen',
  fields: [
    sectieVelden('wit'),
    titelVeld({ required: true }),
    tekstVeld,
    {
      name: 'infoKaarten',
      type: 'array',
      label: 'Infokaarten onder de tekst',
      maxRows: 4,
      fields: [
        { name: 'titel', type: 'text', required: true, label: 'Titel' },
        { name: 'tekst', type: 'textarea', label: 'Tekst' },
      ],
    },
    {
      name: 'wizard',
      type: 'group',
      label: 'Bestelwizard',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'stap1', type: 'text', label: 'Stap 1', defaultValue: 'Keuze' },
            { name: 'stap2', type: 'text', label: 'Stap 2', defaultValue: 'Gegevens' },
            { name: 'stap3', type: 'text', label: 'Stap 3', defaultValue: 'Bevestiging' },
          ],
        },
        {
          name: 'keuzeTitel',
          type: 'text',
          label: 'Titel stap 1',
          defaultValue: 'Kies het tegoed per kaart.',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'bedragen',
              type: 'text',
              label: 'Bedragen (euro)',
              defaultValue: '25, 50, 100, 200, 500',
              admin: { description: 'Gescheiden door komma’s.' },
            },
            {
              name: 'standaardBedrag',
              type: 'text',
              label: 'Standaard gekozen',
              defaultValue: '100',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'aantalLabel',
              type: 'text',
              label: 'Label aantal',
              defaultValue: 'Aantal kaarten',
            },
            { name: 'totaalLabel', type: 'text', label: 'Label totaal', defaultValue: 'Totaal' },
            {
              name: 'volgendeLabel',
              type: 'text',
              label: 'Knop naar stap 2',
              defaultValue: 'Ga naar gegevens',
            },
          ],
        },
        {
          name: 'gegevensTitel',
          type: 'text',
          label: 'Titel stap 2',
          defaultValue: 'Bedrijfsgegevens.',
        },
        {
          type: 'row',
          fields: [
            { name: 'terugLabel', type: 'text', label: 'Knop terug', defaultValue: 'Terug' },
            {
              name: 'bevestigLabel',
              type: 'text',
              label: 'Knop versturen',
              defaultValue: 'Naar bevestiging',
            },
          ],
        },
        {
          name: 'succesTitel',
          type: 'text',
          label: 'Bevestiging: titel',
          defaultValue: 'Bestelling ontvangen!',
        },
        {
          name: 'succesTekst',
          type: 'textarea',
          label: 'Bevestiging: tekst',
          defaultValue:
            '{aantal}x Waardekaart van € {bedrag} – totaal € {totaal}.\nFactuur en kaartgegevens worden gestuurd naar {email}.',
          admin: { description: 'Gebruik {aantal}, {bedrag}, {totaal} en {email}.' },
        },
      ],
    },
    {
      name: 'formulier',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Opslaan in formulier',
      admin: {
        description:
          'Bestellingen komen als inzending in dit formulier (velden: bedrag, aantal, totaal, bedrijfsnaam, contactpersoon, email, kvk). Leeg = alleen de bevestiging tonen.',
      },
    },
  ],
}
