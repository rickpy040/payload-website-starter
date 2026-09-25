'use client'

import { getClientSideURL } from '@/utilities/getURL'

/** Stores a submission for a Form Builder form (`form-submissions`), the same endpoint the stock FormBlock uses. */
export async function verstuurFormulier(
  formId: number | string,
  velden: Record<string, string>,
): Promise<void> {
  const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      form: formId,
      submissionData: Object.entries(velden).map(([field, value]) => ({ field, value })),
    }),
  })
  if (res.status >= 400) {
    const body = await res.json().catch(() => null)
    throw new Error(
      body?.errors?.[0]?.message || 'Versturen is niet gelukt. Probeer het later opnieuw.',
    )
  }
}
