import type { Block } from 'payload'

import { sectieVelden, tekstVeld, titelVeld } from '@/blocks/py/fields'

/**
 * The prototype's FAQ section (`PYFAQ`): intro on the left, an accordion on
 * the right. Questions are typed into the block, or taken from the FAQ
 * collection so the same answer is not written twice.
 */
export const FaqAccordeon: Block = {
  slug: 'faqAccordeon',
  interfaceName: 'FaqAccordeonBlock',
  labels: { singular: 'FAQ-accordeon', plural: 'FAQ-accordeons' },
  imageURL: '/blocks/faq-accordeon.png',
  imageAltText: 'Intro links, uitklapbare vragen rechts',
  fields: [
    sectieVelden('papier'),
    titelVeld({ defaultValue: 'Veelgestelde vragen.' }),
    tekstVeld,
    {
      name: 'bron',
      type: 'radio',
      label: 'Vragen',
      defaultValue: 'handmatig',
      options: [
        { label: 'Hieronder invullen', value: 'handmatig' },
        { label: 'Uit de FAQ-collectie', value: 'collectie' },
      ],
    },
    {
      name: 'vragen',
      type: 'array',
      label: 'Vragen',
      admin: { condition: (_, siblingData) => siblingData?.bron !== 'collectie' },
      fields: [
        { name: 'vraag', type: 'text', required: true, label: 'Vraag' },
        { name: 'antwoord', type: 'textarea', required: true, label: 'Antwoord' },
      ],
    },
    {
      type: 'row',
      admin: { condition: (_, siblingData) => siblingData?.bron === 'collectie' },
      fields: [
        {
          name: 'categorie',
          type: 'relationship',
          relationTo: 'faq-categorieen',
          label: 'Categorie (leeg = alle)',
        },
        { name: 'maxAantal', type: 'number', label: 'Maximaal aantal', defaultValue: 7 },
      ],
    },
  ],
}
