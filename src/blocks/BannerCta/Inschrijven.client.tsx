'use client'

import React, { useState } from 'react'

import { PyButton } from '@/components/py/Button'
import { verstuurFormulier } from '@/blocks/py/verstuur'

export function Inschrijven({
  formId,
  placeholder,
  knopLabel,
  bedankt,
}: {
  formId?: number | string | null
  placeholder?: string | null
  knopLabel?: string | null
  bedankt?: string | null
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'open' | 'bezig' | 'klaar'>('open')
  const [fout, setFout] = useState<string | null>(null)

  if (status === 'klaar') return <p className="py-banner__thanks">{bedankt}</p>

  const verstuur = async (event: React.FormEvent) => {
    event.preventDefault()
    setFout(null)
    setStatus('bezig')
    try {
      if (formId) await verstuurFormulier(formId, { email })
      setStatus('klaar')
    } catch (err) {
      setFout((err as Error).message)
      setStatus('open')
    }
  }

  return (
    <form onSubmit={verstuur} className="py-banner__form">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder ?? ''}
        aria-label={placeholder ?? 'E-mailadres'}
      />
      <PyButton type="submit" variant="aqua" disabled={status === 'bezig'}>
        {knopLabel}
      </PyButton>
      {fout ? <p className="py-form-error">{fout}</p> : null}
    </form>
  )
}
