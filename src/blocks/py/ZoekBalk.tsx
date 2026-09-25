import React from 'react'

import { haalZoekSuggesties } from './data'
import { ZoekPaneel, type ZoekbalkData } from './ZoekPaneel.client'

/** The search panel with its "Waar" suggestions (every city and its locations) loaded on the server. */
export async function ZoekBalk({
  zoekbalk,
  compact,
}: {
  zoekbalk?: ZoekbalkData | null
  compact?: boolean
}) {
  const steden = await haalZoekSuggesties()
  return <ZoekPaneel zoekbalk={zoekbalk} compact={compact} steden={steden} />
}
