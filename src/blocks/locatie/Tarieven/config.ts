import type { Block } from 'payload'

/**
 * Tariff table with the opening hours beside it. `tarieven` is read from the
 * location's `aeroparkerSync` group (Gesynchroniseerd, read-only) — this block
 * has no fields of its own beyond the section intro, because the numbers are
 * never editorial. See docs/CONTENT-MODEL.md, "The rule that governs everything".
 */
export const LocatieTarieven: Block = {
  slug: 'locatieTarieven',
  interfaceName: 'LocatieTarievenBlock',
  labels: { singular: 'Tarieven en openingstijden', plural: 'Tariefsecties' },
  fields: [
    { name: 'titel', type: 'text', label: 'Titel', defaultValue: 'Tarieven overzicht' },
  ],
}
