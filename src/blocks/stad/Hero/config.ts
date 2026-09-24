import type { Block } from 'payload'

/**
 * The city page header: "Parkeren in {stad}" plus the SEO intro paragraph.
 * `titel` and `intro` are optional overrides; when empty the component falls
 * back to the city's `naam`, which is what lets an editor publish a new city
 * with nothing but a name and still get a correct page.
 */
export const StadHero: Block = {
  slug: 'stadHero',
  interfaceName: 'StadHeroBlock',
  labels: { singular: 'Kop: parkeren in {stad}', plural: 'Koppen' },
  fields: [
    {
      name: 'titel',
      type: 'text',
      label: 'Titel (optioneel)',
      admin: { description: 'Standaard: "Parkeren in {naam van de stad}"' },
    },
    { name: 'intro', type: 'textarea', label: 'Introductietekst' },
    { name: 'afbeelding', type: 'upload', relationTo: 'media', label: 'Hoofdafbeelding' },
  ],
}
