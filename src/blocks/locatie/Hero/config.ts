import type { Block } from 'payload'

/**
 * The location page header, matching legacy-prototype/Garages.jsx: back link,
 * type badge, rating, title, intro, quick facts, call-to-action buttons, hero
 * image and the price blob. Most of the content is read straight off the
 * `locations` document (name, soort, beoordeling, intro, ...); this block only
 * holds the handful of things that are about *placement*, not content, so the
 * hero can be turned off or moved for a location page that wants something
 * different.
 */
export const LocatieHero: Block = {
  slug: 'locatieHero',
  interfaceName: 'LocatieHeroBlock',
  labels: { singular: 'Kop met foto en prijs', plural: 'Koppen' },
  fields: [
    {
      name: 'reserveerLabel',
      type: 'text',
      label: 'Tekst hoofdknop',
      defaultValue: 'Reserveer nu',
    },
    {
      name: 'reserveerUrl',
      type: 'text',
      label: 'URL hoofdknop',
      defaultValue: '/locaties',
      admin: { description: 'Bijvoorbeeld de deep link naar Aeroparker voor deze locatie.' },
    },
  ],
}
