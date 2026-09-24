import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Pois: CollectionConfig = {
  slug: 'pois',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Winkel', value: 'shop' },
        { label: 'Hotel', value: 'hotel' },
        { label: 'Attractie', value: 'attraction' },
        { label: 'OV / Station', value: 'transit' },
        { label: 'Evenementenlocatie', value: 'venue' },
      ],
    },
    { name: 'locations', type: 'relationship', relationTo: 'locations', hasMany: true },
    { name: 'coordinates', type: 'point' },
    { name: 'address', type: 'text' },
    { name: 'distanceToParkingMeters', type: 'number' },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'externalUrl', type: 'text' },
  ],
}
