import type { Block } from 'payload'

import { ankerVeld, knoppenVeld, tekstVeld, titelVeld, zoekbalkVeld } from '@/blocks/py/fields'

const heeftPaneel = (_: unknown, siblingData: { visual?: string }) =>
  ['paneel', 'cijfers', 'dashboard'].includes(siblingData?.visual ?? '')

/**
 * The top section of every prototype subpage (`py-page-hero`): title, text,
 * buttons or a search panel on the left, and one visual on the right. The
 * visuals are the ones the prototype pages use: the map (Locaties), the
 * blue "in het kort" panel (Abonnementen), key figures (Over ons), the
 * occupancy dashboard (Zakelijk) and the event collage (Evenementen).
 */
export const PaginaHero: Block = {
  slug: 'paginaHero',
  interfaceName: 'PaginaHeroBlock',
  labels: { singular: 'Pagina-hero', plural: "Pagina-hero's" },
  imageURL: '/blocks/pagina-hero.png',
  imageAltText: 'Pagina-hero met titel links en een visual rechts',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'stijl',
          type: 'select',
          label: 'Achtergrond',
          defaultValue: 'licht',
          options: [
            { label: 'Licht (Locaties)', value: 'licht' },
            { label: 'Wit naar aqua (Abonnementen, Zakelijk)', value: 'aqua' },
            { label: 'Zacht blauw (Over ons)', value: 'zacht' },
            { label: 'Warm (Support)', value: 'warm' },
            { label: 'Evenementen (oranje/aqua gloed)', value: 'evenementen' },
          ],
        },
        {
          name: 'visual',
          type: 'select',
          label: 'Rechterkant',
          defaultValue: 'kaart',
          options: [
            { label: 'Kaart met locatiepins', value: 'kaart' },
            { label: 'Blauw paneel "in het kort"', value: 'paneel' },
            { label: 'Kerncijfers', value: 'cijfers' },
            { label: 'Bezettingsdashboard', value: 'dashboard' },
            { label: 'Collage van evenementen', value: 'evenementen' },
            { label: 'Afbeelding', value: 'afbeelding' },
            { label: 'Niets', value: 'geen' },
          ],
        },
        ankerVeld,
      ],
    },
    titelVeld({ required: true }),
    tekstVeld,
    knoppenVeld(),
    { name: 'toonZoekbalk', type: 'checkbox', label: 'Zoekbalk tonen (zoals op Locaties)' },
    {
      ...zoekbalkVeld,
      admin: {
        ...zoekbalkVeld.admin,
        condition: (_, siblingData) => Boolean(siblingData?.toonZoekbalk),
      },
    },
    {
      name: 'afbeelding',
      type: 'upload',
      relationTo: 'media',
      label: 'Afbeelding',
      admin: { condition: (_, siblingData) => siblingData?.visual === 'afbeelding' },
    },
    {
      name: 'paneel',
      type: 'group',
      label: 'Paneel',
      admin: {
        condition: heeftPaneel,
        description:
          'Blauw paneel: label + regels (waarde en uitleg). Kerncijfers: alleen de regels. Dashboard: label, grote waarde, staafjes en regels (alleen de uitleg wordt getoond, met een vinkje).',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              admin: { description: 'Bv. "Abonnement in het kort" of "Live bezetting"' },
            },
            {
              name: 'waarde',
              type: 'text',
              label: 'Grote waarde (dashboard)',
              admin: { description: 'Bv. "83%"' },
            },
          ],
        },
        {
          name: 'balken',
          type: 'text',
          label: 'Staafjes (dashboard)',
          defaultValue: '44, 62, 78, 84, 71, 56, 38',
          admin: { description: 'Hoogtes in procenten, gescheiden door komma’s.' },
        },
        {
          name: 'regels',
          type: 'array',
          label: 'Regels',
          maxRows: 6,
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'waarde',
                  type: 'text',
                  label: 'Waarde',
                  admin: { description: 'Bv. "3 maanden" of "500k+"' },
                },
                { name: 'label', type: 'text', required: true, label: 'Uitleg' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
