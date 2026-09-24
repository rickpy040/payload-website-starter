import type { Block } from 'payload'

/**
 * `faqBlok`, one of the eight generic content blocks from docs/CONTENT-MODEL.md.
 *
 * An FAQ item is a row in the `faq` collection, not text written into the
 * block, "so the same answer appears on /veelgestelde-vragen, on its locations
 * and in FAQPage structured data without being written three times." This
 * block is therefore a query, filtered by category and/or location, with a
 * manual-picks escape hatch for a page that wants specific items in a
 * specific order.
 */
export const FaqBlok: Block = {
  slug: 'faqBlok',
  interfaceName: 'FaqBlokBlock',
  labels: { singular: 'Veelgestelde vragen', plural: 'FAQ-blokken' },
  fields: [
    { name: 'titel', type: 'text', label: 'Titel', defaultValue: 'Veelgestelde vragen' },
    {
      name: 'bron',
      type: 'radio',
      label: 'Bron',
      defaultValue: 'alles',
      options: [
        { label: 'Alle vragen, gegroepeerd per categorie', value: 'alles' },
        { label: 'Alleen deze categorie', value: 'categorie' },
        { label: 'Handmatig gekozen vragen', value: 'handmatig' },
      ],
    },
    {
      name: 'categorie',
      type: 'relationship',
      relationTo: 'faq-categorieen',
      label: 'Categorie',
      admin: { condition: (_data, siblingData) => siblingData?.bron === 'categorie' },
    },
    {
      name: 'vragen',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
      label: 'Vragen',
      admin: { condition: (_data, siblingData) => siblingData?.bron === 'handmatig' },
    },
  ],
}
