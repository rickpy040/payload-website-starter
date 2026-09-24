import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Locations: CollectionConfig = {
  slug: 'locations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'aeroparkerProductId', '_status'],
  },
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar', description: 'Gebruikt in de URL, bv. parkeren/eindhoven-strijp-s' },
    },
    {
      name: 'city',
      type: 'select',
      required: true,
      options: [
        { label: 'Eindhoven', value: 'eindhoven' },
        { label: 'Rotterdam', value: 'rotterdam' },
        { label: 'Amsterdam', value: 'amsterdam' },
        { label: 'Den Haag', value: 'den-haag' },
        { label: 'Utrecht', value: 'utrecht' },
        { label: 'Tilburg', value: 'tilburg' },
        { label: 'Heerhugowaard', value: 'heerhugowaard' },
        { label: 'Zoetermeer', value: 'zoetermeer' },
        { label: 'Almere', value: 'almere' },
      ],
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'cityName', type: 'text' },
      ],
    },
    { name: 'coordinates', type: 'point', admin: { description: '[lng, lat]' } },
    {
      name: 'aeroparkerProductId',
      type: 'text',
      required: true,
      admin: { description: 'Het product/locatie-ID zoals gebruikt in de Aeroparker API (koppeling voor beschikbaarheid + prijs)' },
    },
    {
      name: 'pricePerHour',
      type: 'number',
      required: true,
      admin: { description: 'Vanafprijs per uur in euro, getoond als fallback zolang er geen live Aeroparker-tarief is opgehaald' },
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      admin: { description: 'Gemiddelde beoordeling, bv. 4.6' },
    },
    {
      name: 'openingHours',
      type: 'text',
      admin: { description: 'Bv. "24/7 geopend" of "06:00 – 01:00"' },
    },
    {
      name: 'maxHeight',
      type: 'text',
      admin: { description: 'Maximale inrijhoogte, bv. "2,10 m"' },
    },
    {
      name: 'spotsTotal',
      type: 'number',
      min: 0,
      admin: { description: 'Totaal aantal plekken op deze locatie' },
    },
    {
      name: 'spotsFree',
      type: 'number',
      min: 0,
      admin: { description: 'Handmatig bij te werken vrije plekken, zolang er geen live feed is. Bepaalt de beschikbaarheidsstatus (ruim/beperkt/vol).' },
    },
    { name: 'description', type: 'richText' },
    {
      name: 'images',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'amenities',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Overdekt', value: 'covered' },
        { label: 'Laadpaal', value: 'ev-charging' },
        { label: 'Mindervalide plek', value: 'disabled-access' },
        { label: '24/7 open', value: '24-7' },
        { label: 'Bewaakt', value: 'guarded' },
      ],
    },
    {
      name: 'terminals',
      type: 'array',
      admin: { description: 'Terminalregister per locatie, bv. BSG-I1' },
      fields: [
        { name: 'code', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Inrit', value: 'inrit' },
            { label: 'Uitrit', value: 'uitrit' },
            { label: 'Betaalautomaat', value: 'betaal' },
          ],
        },
      ],
    },
    { name: 'pois', type: 'relationship', relationTo: 'pois', hasMany: true },
    { name: 'faqs', type: 'relationship', relationTo: 'faq', hasMany: true },
  ],
}
