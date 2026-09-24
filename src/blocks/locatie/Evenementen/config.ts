import type { Block } from 'payload'

/**
 * "Evenementen nabij deze locatie", queried from the `evenementen` collection
 * by relationship, not hand-linked, so publishing an event makes it appear on
 * every location it names (docs/CONTENT-MODEL.md addendum).
 */
export const LocatieEvenementen: Block = {
  slug: 'locatieEvenementen',
  interfaceName: 'LocatieEvenementenBlock',
  labels: { singular: 'Evenementen nabij deze locatie', plural: 'Evenementensecties' },
  fields: [
    { name: 'titelVoor', type: 'text', label: 'Titel: gewoon', defaultValue: 'Evenementen ' },
    { name: 'titelNadruk', type: 'text', label: 'Titel: cursief', defaultValue: 'nabij' },
    { name: 'titelNa', type: 'text', label: 'Titel: gewoon (vervolg)', defaultValue: ' deze locatie.' },
    {
      name: 'tekst',
      type: 'text',
      label: 'Ondertekst',
      defaultValue: 'Reserveer al je parkeertickets voor aankomende evenementen in de buurt.',
    },
  ],
}
