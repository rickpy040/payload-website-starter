import type { Field, GroupField } from 'payload'

/**
 * Shared field definitions for the prototype section blocks (the blocks that
 * rebuild the ParkingYou rebranding prototype one section at a time). Every
 * block uses the same names for the same idea, so an editor who has learned
 * one block has learned them all.
 */

export const ICON_OPTIONS = [
  { label: 'Auto', value: 'car' },
  { label: 'Pijl', value: 'arrow' },
  { label: 'Locatie-pin', value: 'pin' },
  { label: 'Kalender', value: 'calendar' },
  { label: 'Klok', value: 'clock' },
  { label: 'Pas', value: 'card' },
  { label: 'Bliksem', value: 'bolt' },
  { label: 'Schild', value: 'shield' },
  { label: 'Ticket', value: 'ticket' },
  { label: 'Portemonnee', value: 'wallet' },
  { label: 'Telefoon', value: 'phone' },
  { label: 'Zoeken', value: 'search' },
  { label: 'Vinkje', value: 'check' },
  { label: 'Ster', value: 'star' },
  { label: 'Laadpaal', value: 'ev' },
  { label: 'Kaart', value: 'map' },
  { label: 'Info', value: 'info' },
  { label: 'Grafiek', value: 'trending' },
  { label: 'Label', value: 'tag' },
  { label: 'Persoon', value: 'user' },
]

export const nadrukUitleg =
  'Zet woorden tussen *sterretjes* om ze cursief te tonen, zoals in het prototype.'

export const achtergrondVeld = (defaultValue: 'wit' | 'papier' = 'wit'): Field => ({
  name: 'achtergrond',
  type: 'select',
  label: 'Achtergrond',
  defaultValue,
  options: [
    { label: 'Wit', value: 'wit' },
    { label: 'Lichtgrijs (papier)', value: 'papier' },
  ],
})

export const ankerVeld: Field = {
  name: 'anker',
  type: 'text',
  label: 'Anker (id)',
  admin: {
    description:
      'Optioneel. Maakt deze sectie bereikbaar via #anker, bv. een knop met URL "#abonnement-aanvragen".',
  },
}

/** Background + anchor, side by side at the top of every section block. */
export const sectieVelden = (achtergrond: 'wit' | 'papier' = 'wit'): Field => ({
  type: 'row',
  fields: [achtergrondVeld(achtergrond), ankerVeld],
})

export const titelVeld = (
  overrides: { required?: boolean; defaultValue?: string } = {},
): Field => ({
  name: 'titel',
  type: 'text',
  label: 'Titel',
  required: overrides.required,
  defaultValue: overrides.defaultValue,
  admin: { description: nadrukUitleg },
})

export const tekstVeld: Field = { name: 'tekst', type: 'textarea', label: 'Tekst' }

export const iconVeld = (defaultValue = 'car'): Field => ({
  name: 'icoon',
  type: 'select',
  label: 'Icoon',
  defaultValue,
  options: ICON_OPTIONS,
})

export const knopStijlVeld = (defaultValue = 'primary'): Field => ({
  name: 'stijl',
  type: 'select',
  label: 'Stijl',
  defaultValue,
  options: [
    { label: 'Blauw (primair)', value: 'primary' },
    { label: 'Aqua', value: 'aqua' },
    { label: 'Omlijnd', value: 'outline' },
    { label: 'Tekstlink', value: 'ghost' },
    { label: 'Omlijnd op donker', value: 'on-dark' },
  ],
})

/** Icon after the button label; "arrow" is the prototype's default. */
export const knopIconVeld: Field = {
  name: 'icoon',
  type: 'select',
  label: 'Icoon',
  defaultValue: 'arrow',
  options: [{ label: 'Geen', value: 'geen' }, ...ICON_OPTIONS],
}

export const knoppenVeld = (
  options: { name?: string; label?: string; maxRows?: number } = {},
): Field => ({
  name: options.name ?? 'knoppen',
  type: 'array',
  label: options.label ?? 'Knoppen',
  maxRows: options.maxRows ?? 2,
  labels: { singular: 'Knop', plural: 'Knoppen' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Tekst' },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
          admin: { description: 'Bv. /locaties, https://…, tel:… of #anker' },
        },
      ],
    },
    { type: 'row', fields: [knopStijlVeld(), knopIconVeld] },
  ],
})

/** The "Waar / Wanneer / Zoek plek" search panel, shared by both hero blocks. */
export const zoekbalkVeld: GroupField = {
  name: 'zoekbalk',
  type: 'group',
  label: 'Zoekbalk',
  admin: {
    description:
      'Zoeken stuurt de bezoeker naar de doelpagina met ?stad=… in de URL. Een Locatie-overzicht op die pagina filtert daar direct op.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'waarLabel', type: 'text', label: 'Label "waar"', defaultValue: 'Waar' },
        {
          name: 'waarPlaceholder',
          type: 'text',
          label: 'Placeholder "waar"',
          defaultValue: 'Stad, garage of adres',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'wanneerLabel', type: 'text', label: 'Label "wanneer"', defaultValue: 'Wanneer' },
        {
          name: 'wanneerWaarde',
          type: 'text',
          label: 'Standaardwaarde "wanneer"',
          defaultValue: 'Vandaag 09:00 - 17:00',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'knopLabel', type: 'text', label: 'Knoptekst', defaultValue: 'Zoek plek' },
        { name: 'doel', type: 'text', label: 'Doelpagina', defaultValue: '/locaties' },
      ],
    },
    {
      name: 'hint',
      type: 'text',
      label: 'Melding na zoeken',
      defaultValue: 'We tonen nu de beste matches voor {stad}.',
      admin: { description: '{stad} wordt vervangen door wat de bezoeker intypte.' },
    },
  ],
}
