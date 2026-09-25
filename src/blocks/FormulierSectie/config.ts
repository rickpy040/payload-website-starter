import type { Block } from 'payload'

import { sectieVelden, tekstVeld, titelVeld } from '@/blocks/py/fields'

/**
 * Text on the left, a Form Builder form on the right (`py-form-split`), as in
 * "Vraag beschikbaarheid aan", "Bestel je ParkingPass" and "Plan een
 * kennismaking". The fields, button text and thank-you message all come from
 * the chosen form (Formulieren in the admin), and submissions are stored there.
 */
export const FormulierSectie: Block = {
  slug: 'formulierSectie',
  interfaceName: 'FormulierSectieBlock',
  labels: { singular: 'Formulier met intro', plural: 'Formulieren met intro' },
  imageURL: '/blocks/formulier-sectie.png',
  imageAltText: 'Titel en tekst links, formulier rechts',
  fields: [
    sectieVelden('wit'),
    titelVeld({ required: true }),
    tekstVeld,
    {
      type: 'row',
      fields: [
        {
          name: 'locatieLabels',
          type: 'select',
          label: 'Locatielabels onder de tekst',
          defaultValue: 'geen',
          options: [
            { label: 'Geen', value: 'geen' },
            { label: 'Locaties met abonnementen', value: 'abonnementen' },
            { label: 'Locaties waar de ParkingPass geldt', value: 'parkingpass' },
          ],
        },
      ],
    },
    {
      name: 'formulier',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Formulier',
      admin: { description: 'Velden, knoptekst en bevestiging bewerk je in Formulieren.' },
    },
  ],
}
