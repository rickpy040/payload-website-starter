import type { Block } from 'payload'

/**
 * Tariff table and payment methods. `tarieven` is read from the location's
 * `aeroparkerSync` group (Gesynchroniseerd, read-only) — this block has no
 * fields of its own beyond the section intro, because the numbers are never
 * editorial. See docs/CONTENT-MODEL.md, "The rule that governs everything".
 */
export const LocatieTarieven: Block = {
  slug: 'locatieTarieven',
  interfaceName: 'LocatieTarievenBlock',
  labels: { singular: 'Tarieven en betaalmogelijkheden', plural: 'Tariefsecties' },
  fields: [
    { name: 'titel', type: 'text', label: 'Titel', defaultValue: 'Tarieven overzicht' },
  ],
}
