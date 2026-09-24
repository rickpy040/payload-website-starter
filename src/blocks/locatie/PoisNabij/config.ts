import type { Block } from 'payload'

/**
 * "Bezienswaardigheden & POI's in de buurt", read from the location's `pois`
 * array (free-text distance list, distinct from the `pois` landing-page
 * collection per docs/CONTENT-MODEL.md's addendum).
 */
export const LocatiePoisNabij: Block = {
  slug: 'locatiePoisNabij',
  interfaceName: 'LocatiePoisNabijBlock',
  labels: { singular: "POI's en omgeving", plural: "POI-secties" },
  fields: [
    { name: 'titel', type: 'text', label: 'Titel', defaultValue: "Bezienswaardigheden & POI's in de buurt" },
    {
      name: 'kaartbijschrift',
      type: 'text',
      label: 'Bijschrift bij de kaart',
      defaultValue: 'De kaart toont deze locatie en de looproute naar de bezienswaardigheden hierboven.',
    },
  ],
}
