'use client'

import React, { useState, useSyncExternalStore } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'
import { WaarVeld } from './WaarVeld.client'
import type { ZoekStad } from './zoekSuggesties'

/** Fired when a search panel submits to the page it is on; LocatieOverzicht listens. */
export const ZOEK_EVENT = 'py:zoek'

export type ZoekbalkData = {
  waarLabel?: string | null
  waarPlaceholder?: string | null
  wanneerLabel?: string | null
  wanneerWaarde?: string | null
  knopLabel?: string | null
  doel?: string | null
  hint?: string | null
}

const volgUrl = (onChange: () => void) => {
  window.addEventListener('popstate', onChange)
  return () => window.removeEventListener('popstate', onChange)
}
const stadUitUrl = () => new URLSearchParams(window.location.search).get('stad') ?? ''
// No URL on the server (the page is static): start empty, React fills it in after hydration.
const stadOpServer = () => ''

export function ZoekPaneel({
  zoekbalk,
  compact = false,
  steden = [],
}: {
  zoekbalk?: ZoekbalkData | null
  compact?: boolean
  /** Suggestions for the "Waar" field; see `ZoekBalk`. */
  steden?: ZoekStad[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const doel = zoekbalk?.doel || '/locaties'
  // On the target page itself, start from the city in the URL (?stad=…)
  // until the visitor types something.
  const urlStad = useSyncExternalStore(volgUrl, stadUitUrl, stadOpServer)
  const [invoer, setInvoer] = useState<string | null>(null)
  const stad = invoer ?? (pathname === doel ? urlStad : '')
  const [wanneer, setWanneer] = useState(zoekbalk?.wanneerWaarde ?? 'Vandaag 09:00 - 17:00')
  const [gezocht, setGezocht] = useState<string | null>(null)

  const zoekOp = (invoer: string) => {
    const waarde = invoer.trim()
    setGezocht(waarde)
    const query = waarde ? `?stad=${encodeURIComponent(waarde)}` : ''
    if (window.location.pathname === doel) {
      window.history.replaceState(null, '', `${doel}${query}`)
      window.dispatchEvent(new CustomEvent(ZOEK_EVENT, { detail: { stad: waarde } }))
    } else {
      router.push(`${doel}${query}`)
    }
  }

  const zoek = (event: React.FormEvent) => {
    event.preventDefault()
    zoekOp(stad)
  }

  const hint = (zoekbalk?.hint ?? 'We tonen nu de beste matches voor {stad}.').replace(
    '{stad}',
    gezocht || 'alle steden',
  )

  return (
    <form className={`py-search ${compact ? 'py-search--compact' : ''}`.trim()} onSubmit={zoek}>
      <WaarVeld
        label={zoekbalk?.waarLabel ?? 'Waar'}
        placeholder={zoekbalk?.waarPlaceholder ?? 'Stad, garage of adres'}
        waarde={stad}
        onWaarde={setInvoer}
        steden={steden}
        onKiesStad={(gekozen) => {
          setInvoer(gekozen.naam)
          zoekOp(gekozen.naam)
        }}
        onKiesLocatie={(locatie) => {
          setInvoer(locatie.naam)
          router.push(locatie.href)
        }}
      />
      <label>
        <span>
          <Icon name="calendar" size={18} /> {zoekbalk?.wanneerLabel ?? 'Wanneer'}
        </span>
        <input
          value={wanneer}
          onChange={(e) => setWanneer(e.target.value)}
          placeholder="Vandaag 09:00 - 17:00"
        />
      </label>
      <PyButton type="submit" variant="primary" icon="search">
        {zoekbalk?.knopLabel ?? 'Zoek plek'}
      </PyButton>
      {gezocht !== null ? <div className="py-search__hint">{hint}</div> : null}
    </form>
  )
}
