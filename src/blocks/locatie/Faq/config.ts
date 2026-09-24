import type { Block } from 'payload'

/** FAQ items tagged to this location, queried by relationship (see `faq.locations`). */
export const LocatieFaq: Block = {
  slug: 'locatieFaq',
  interfaceName: 'LocatieFaqBlock',
  labels: { singular: 'Veelgestelde vragen over deze locatie', plural: 'FAQ-secties' },
  fields: [{ name: 'titel', type: 'text', label: 'Titel', defaultValue: 'Veelgestelde vragen' }],
}
