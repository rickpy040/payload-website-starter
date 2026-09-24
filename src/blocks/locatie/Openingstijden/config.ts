import type { Block } from 'payload'

/** Openingstijden plus service & bereikbaarheid, read from the location document. */
export const LocatieOpeningstijden: Block = {
  slug: 'locatieOpeningstijden',
  interfaceName: 'LocatieOpeningstijdenBlock',
  labels: { singular: 'Openingstijden en service', plural: 'Openingstijdensecties' },
  fields: [
    { name: 'titel', type: 'text', label: 'Titel', defaultValue: 'Openingstijden' },
    {
      name: 'telefoon',
      type: 'text',
      label: 'Telefoonnummer klantenservice',
      defaultValue: '085 4011647',
    },
  ],
}
