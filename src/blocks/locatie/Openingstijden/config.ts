import type { Block } from 'payload'

/**
 * Betaalmogelijkheden plus service & bereikbaarheid, read from the location
 * document. The opening hours themselves sit beside the tarieven; `titel` is
 * still their heading. The slug keeps its old name so stored pages stay valid.
 */
export const LocatieOpeningstijden: Block = {
  slug: 'locatieOpeningstijden',
  interfaceName: 'LocatieOpeningstijdenBlock',
  labels: { singular: 'Betaalmogelijkheden en service', plural: 'Betaal- en servicesecties' },
  fields: [
    {
      name: 'titel',
      type: 'text',
      label: 'Titel openingstijden',
      defaultValue: 'Openingstijden',
      admin: { description: 'Kop boven de openingstijden, die naast de tarieven staan.' },
    },
    {
      name: 'telefoon',
      type: 'text',
      label: 'Telefoonnummer klantenservice',
      defaultValue: '085 4011647',
    },
  ],
}
