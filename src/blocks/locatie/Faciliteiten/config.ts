import type { Block } from 'payload'

/** Faciliteiten grid plus "Toegang & type", read from the location document. */
export const LocatieFaciliteiten: Block = {
  slug: 'locatieFaciliteiten',
  interfaceName: 'LocatieFaciliteitenBlock',
  labels: { singular: 'Faciliteiten en toegang', plural: 'Faciliteitensecties' },
  fields: [
    { name: 'titel', type: 'text', label: 'Titel', defaultValue: 'Aanwezige faciliteiten' },
  ],
}
