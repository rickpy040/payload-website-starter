import type { Block } from 'payload'

/**
 * Strippenkaart / waardekaart ordering. Renders only the cards the location
 * has switched on (`locations.strippenkaart` / `locations.waardekaart`); the
 * block itself only carries the copy around them.
 */
export const LocatieKaartProducten: Block = {
  slug: 'locatieKaartProducten',
  interfaceName: 'LocatieKaartProductenBlock',
  labels: { singular: 'Strippenkaart / waardekaart', plural: 'Kaartproduct-secties' },
  fields: [
    { name: 'titelVoor', type: 'text', label: 'Titel: gewoon', defaultValue: 'Voordelig ' },
    { name: 'titelNadruk', type: 'text', label: 'Titel: cursief', defaultValue: 'vaker parkeren' },
    { name: 'titelNa', type: 'text', label: 'Titel: gewoon (vervolg)', defaultValue: ' hier.' },
  ],
}
