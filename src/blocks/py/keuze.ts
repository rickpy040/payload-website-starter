'use client'

import { useEffect } from 'react'

/**
 * Lets two separate blocks share one choice, the way the prototype's
 * ParkingPass page keeps the "10x / 25x" toggle in the hero and the "Aantal"
 * select in the order form in sync: whichever changes announces it, the
 * other follows.
 */
export const KEUZE_EVENT = 'py:keuze'

export type KeuzeDetail = { veld: string; waarde: string }

export function meldKeuze(veld: string, waarde: string) {
  window.dispatchEvent(new CustomEvent<KeuzeDetail>(KEUZE_EVENT, { detail: { veld, waarde } }))
}

export function useKeuze(veld: string | null | undefined, onKeuze: (waarde: string) => void) {
  useEffect(() => {
    if (!veld) return
    const handler = (event: Event) => {
      const { detail } = event as CustomEvent<KeuzeDetail>
      if (detail?.veld === veld) onKeuze(detail.waarde)
    }
    window.addEventListener(KEUZE_EVENT, handler)
    return () => window.removeEventListener(KEUZE_EVENT, handler)
  }, [veld, onKeuze])
}
