'use client'

import React, { useState } from 'react'

import type { WaardekaartBestellenBlock } from '@/payload-types'
import { Icon } from '@/components/py/Icon'
import { PyButton } from '@/components/py/Button'
import { verstuurFormulier } from '@/blocks/py/verstuur'

type WizardTeksten = NonNullable<WaardekaartBestellenBlock['wizard']>

const euro = (value: number) => value.toFixed(2).replace('.', ',')

export function WaardekaartWizard({
  teksten,
  formId,
}: {
  teksten: WizardTeksten
  formId?: number | string | null
}) {
  const bedragen = (teksten.bedragen ?? '')
    .split(',')
    .map((b) => b.trim())
    .filter(Boolean)
  const [stap, setStap] = useState(1)
  const [bedrag, setBedrag] = useState(teksten.standaardBedrag || bedragen[0] || '')
  const [aantal, setAantal] = useState(1)
  const [bedrijf, setBedrijf] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [kvk, setKvk] = useState('')
  const [fout, setFout] = useState<string | null>(null)
  const [bezig, setBezig] = useState(false)

  const totaal = euro(Number(bedrag.replace(',', '.')) * aantal)
  const stappen = [teksten.stap1, teksten.stap2, teksten.stap3]

  const bevestig = async (event: React.FormEvent) => {
    event.preventDefault()
    setFout(null)
    setBezig(true)
    try {
      if (formId) {
        await verstuurFormulier(formId, {
          bedrag,
          aantal: String(aantal),
          totaal,
          bedrijfsnaam: bedrijf,
          contactpersoon: contact,
          email,
          kvk,
        })
      }
      setStap(3)
    } catch (err) {
      setFout((err as Error).message)
    } finally {
      setBezig(false)
    }
  }

  const succes = (teksten.succesTekst ?? '')
    .replace('{aantal}', String(aantal))
    .replace('{bedrag}', bedrag)
    .replace('{totaal}', totaal)
    .replace('{email}', email)

  return (
    <div className="py-waarde-wizard">
      <div className="py-waarde-wizard__steps">
        {stappen.map((label, i) => (
          <span key={i} className={stap === i + 1 ? 'is-active' : stap > i + 1 ? 'is-done' : ''}>
            <i>{stap > i + 1 ? <Icon name="check" size={13} /> : i + 1}</i>
            {label}
          </span>
        ))}
      </div>

      {stap === 1 ? (
        <div>
          <h3>{teksten.keuzeTitel}</h3>
          <div className="py-waarde-amounts">
            {bedragen.map((waarde) => (
              <button
                key={waarde}
                type="button"
                className={bedrag === waarde ? 'is-active' : ''}
                onClick={() => setBedrag(waarde)}
              >
                € {waarde}
              </button>
            ))}
          </div>
          <label className="py-wizard-field" style={{ marginTop: 20 }}>
            {teksten.aantalLabel}
            <div className="py-qty-picker">
              <button
                type="button"
                onClick={() => setAantal((q) => Math.max(1, q - 1))}
                aria-label="Minder"
              >
                –
              </button>
              <span>{aantal}</span>
              <button type="button" onClick={() => setAantal((q) => q + 1)} aria-label="Meer">
                +
              </button>
            </div>
          </label>
          <div className="py-waarde-total-row">
            <span>{teksten.totaalLabel}</span>
            <strong>€ {totaal}</strong>
          </div>
          <PyButton onClick={() => setStap(2)} variant="primary">
            {teksten.volgendeLabel}
          </PyButton>
        </div>
      ) : null}

      {stap === 2 ? (
        <form onSubmit={bevestig}>
          <h3>{teksten.gegevensTitel}</h3>
          <label className="py-wizard-field">
            Bedrijfsnaam
            <input
              required
              value={bedrijf}
              onChange={(e) => setBedrijf(e.target.value)}
              placeholder="Bedrijfsnaam B.V."
            />
          </label>
          <label className="py-wizard-field">
            Contactpersoon
            <input
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Voor- en achternaam"
            />
          </label>
          <label className="py-wizard-field">
            E-mailadres
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jij@bedrijf.nl"
            />
          </label>
          <label className="py-wizard-field">
            KvK-nummer
            <input value={kvk} onChange={(e) => setKvk(e.target.value)} placeholder="12345678" />
          </label>
          {fout ? <p className="py-form-error">{fout}</p> : null}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <PyButton type="button" variant="outline" icon="x" onClick={() => setStap(1)}>
              {teksten.terugLabel}
            </PyButton>
            <PyButton type="submit" variant="primary" disabled={bezig}>
              {teksten.bevestigLabel}
            </PyButton>
          </div>
        </form>
      ) : null}

      {stap === 3 ? (
        <div className="py-inline-success py-inline-success--large">
          <Icon name="check" size={28} />
          <div>
            <strong>{teksten.succesTitel}</strong>
            <p>
              {succes.split('\n').map((regel, i) => (
                <React.Fragment key={i}>
                  {i > 0 ? <br /> : null}
                  {regel}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
