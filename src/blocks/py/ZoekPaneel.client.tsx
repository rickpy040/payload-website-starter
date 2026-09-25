'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'

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

export function ZoekPaneel({
  zoekbalk,
  compact = false,
}: {
  zoekbalk?: ZoekbalkData | null
  compact?: boolean
}) {
  const router = useRouter()
  const doel = zoekbalk?.doel || '/locaties'
  const [stad, setStad] = useState('')
  const [wanneer, setWanneer] = useState(zoekbalk?.wanneerWaarde ?? 'Vandaag 09:00 - 17:00')
  const [gezocht, setGezocht] = useState<string | null>(null)

  // On the target page itself, start from the city in the URL (?stad=…).
  useEffect(() => {
    if (window.location.pathname !== doel) return
    const uitUrl = new URLSearchParams(window.location.search).get('stad')
    if (uitUrl) setStad(uitUrl)
  }, [doel])

  const zoek = (event: React.FormEvent) => {
    event.preventDefault()
    const waarde = stad.trim()
    setGezocht(waarde)
    const query = waarde ? `?stad=${encodeURIComponent(waarde)}` : ''
    if (window.location.pathname === doel) {
      window.history.replaceState(null, '', `${doel}${query}`)
      window.dispatchEvent(new CustomEvent(ZOEK_EVENT, { detail: { stad: waarde } }))
    } else {
      router.push(`${doel}${query}`)
    }
  }

  const hint = (zoekbalk?.hint ?? 'We tonen nu de beste matches voor {stad}.').replace(
    '{stad}',
    gezocht || 'alle steden',
  )

  return (
    <form className={`py-search ${compact ? 'py-search--compact' : ''}`.trim()} onSubmit={zoek}>
      <label>
        <span>
          <Icon name="pin" size={18} /> {zoekbalk?.waarLabel ?? 'Waar'}
        </span>
        <input
          value={stad}
          onChange={(e) => setStad(e.target.value)}
          placeholder={zoekbalk?.waarPlaceholder ?? 'Stad, garage of adres'}
        />
      </label>
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
