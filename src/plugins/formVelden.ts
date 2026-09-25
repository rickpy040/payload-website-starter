import type { Block, Field } from 'payload'
import { fields as formBuilderFields } from '@payloadcms/plugin-form-builder'

/**
 * Additions to the Form Builder's field types for the prototype forms:
 * a placeholder on text, e-mail and textarea fields (the prototype shows
 * "jij@voorbeeld.nl" and the like), and a "Locatiekeuze" field whose options
 * are the published locations, so the subscription and ParkingPass forms
 * never list a location by hand.
 */

const placeholder: Field = {
  name: 'placeholder',
  type: 'text',
  label: 'Placeholder',
  admin: { description: 'Lichte voorbeeldtekst in het lege veld, bv. "jij@voorbeeld.nl".' },
}

const metPlaceholder = (slug: 'text' | 'email' | 'textarea'): Block => {
  const block = formBuilderFields[slug] as Block
  return { ...block, fields: [...block.fields, placeholder] }
}

export const LocatieKeuzeVeld: Block = {
  slug: 'locatieKeuze',
  labels: { singular: 'Locatiekeuze', plural: 'Locatiekeuzes' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Naam (veldnaam)',
          defaultValue: 'locatie',
          admin: { width: '50%' },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Locatie',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'width', type: 'number', label: 'Breedte (%)', admin: { width: '50%' } },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Eerste regel',
          defaultValue: 'Kies locatie',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'bron',
      type: 'select',
      label: 'Welke locaties',
      defaultValue: 'alle',
      options: [
        { label: 'Alle gepubliceerde locaties', value: 'alle' },
        { label: 'Locaties met abonnementen', value: 'abonnementen' },
        { label: 'Locaties waar de ParkingPass geldt', value: 'parkingpass' },
      ],
    },
    { name: 'required', type: 'checkbox', label: 'Verplicht' },
  ],
}

export const formVelden = {
  payment: false,
  text: metPlaceholder('text'),
  email: metPlaceholder('email'),
  textarea: metPlaceholder('textarea'),
  locatieKeuze: LocatieKeuzeVeld,
}
